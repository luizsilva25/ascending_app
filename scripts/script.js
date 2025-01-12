//GAME ELEMENTS
import { buildings } from "./gameObjects.js"
import { characters } from "./gameObjects.js"



//GOBLAL VARIABLES
const maxRounds = 11
const lvlTwoBenefits = 2
const lvlThreeBenefits = 3
const lvlFourBenefits = 3
const lvlFiveBenefits = 5
const lvlTwoCost = 5
const lvlThreeCost = 10
const lvlFourCost = 15
const lvlFiveCost = 20
let gameOn = false
let round = 1
let lifeQuality = 0
let polutionPoints = 0
let sciencePoints = 0
const buildingNames = Object.keys(buildings)
const buildingNumber = Object.keys(buildings).length
let prefeituraCurrentMetalResource = characters.prefeitura.inicialMetalResource
let prefeituraCurrentWorkerRosource = characters.prefeitura.inicialWorkerResource
let rhCurrentMetalResource = characters.rh.inicialMetalResource
let rhCurrentWorkerResource = characters.rh.inicialWorkerResource
let dfCurrentMetalResource = characters.df.inicialMetalResource
let dfCurrentWorkerResource = characters.df.inicialWorkerResource
let prefeituraIncomeMetalResource = 0
let prefeituraIncomeWorkerResource = 0
let rhIncomeMetalResource = 0
let rhIncomeWorkerResource = 0
let dfIncomeMetalResource = 0
let dfIncomeWorkerResource = 0
let constructionsOnFieldEl = []
let clones = []


//DOM ELEMENTS
const newGameBtn = document.getElementById("new-game-btn")
const pointsAreaEl = document.getElementById("points-section")
const incomesAreaEl = document.getElementById("incomes-section")
const buildSection = document.getElementById("build-section")
const endRoundSection = document.getElementById("end-round-section")
const buildingDisplayArea = document.getElementById("buildings-display-el")



//FUNCTIONS

function newGame() {
    gameOn = true
    restart()
    setValues()

    //show building input field
    const buildInputValue = document.createElement("select")
    buildInputValue.id = "build-input-el"
    buildSection.appendChild(buildInputValue)
    for (let i = 0; i < buildingNumber; i++) {
        let buildkey = buildingNames[i]
        let buildOption = buildings[buildkey].name
        let buildOptionEl = document.createElement("option")
        buildOptionEl.textContent = `${buildOption}`
        buildInputValue.appendChild(buildOptionEl)
    }

    //show build button
    const constructBtn = document.createElement("button")
    constructBtn.textContent = "CONSTRUIR"
    constructBtn.id = "construct-btn"
    constructBtn.addEventListener("click", construct)
    buildSection.appendChild(constructBtn)

    //show botão encerrar rodada
    const endRoundBtn = document.createElement("button")
    endRoundBtn.textContent = "ENCERRAR RODADA"
    endRoundBtn.id = "end-round-btn"
    endRoundBtn.addEventListener("click", endRound)
    endRoundSection.appendChild(endRoundBtn)

}

function cleanScreen() {
    pointsAreaEl.innerHTML = " "
    incomesAreaEl.innerHTML = " "
    endRoundSection.innerHTML = " "
    buildSection.innerHTML = " "
    buildingDisplayArea.innerHTML = " "
}

function restart() {
    cleanScreen()
    round = 1
    lifeQuality = 0
    polutionPoints = 0
    sciencePoints = 0
    prefeituraCurrentMetalResource = characters.prefeitura.inicialMetalResource
    prefeituraCurrentWorkerRosource = characters.prefeitura.inicialWorkerResource
    rhCurrentMetalResource = characters.rh.inicialMetalResource
    rhCurrentWorkerResource = characters.rh.inicialWorkerResource
    dfCurrentMetalResource = characters.df.inicialMetalResource
    dfCurrentWorkerResource = characters.df.inicialWorkerResource
    prefeituraIncomeMetalResource = 0
    prefeituraIncomeWorkerResource = 0
    rhIncomeMetalResource = 0
    rhIncomeWorkerResource = 0
    dfIncomeMetalResource = 0
    dfIncomeWorkerResource = 0
    for (let i = 0; i < buildingNumber; i++) {
        let key = buildingNames[i]
        buildings[key].onField.lvlOne = 0
        buildings[key].onField.lvlTwo = 0
        buildings[key].onField.lvlThree = 0
        buildings[key].onField.lvlFour = 0
        buildings[key].onField.lvlFive = 0
        buildings[key].total = 0
    }
    constructionsOnFieldEl = []
    clones = []
}

function construct() {
    let building = document.getElementById("build-input-el").value

    for (let i = 0; i < buildingNumber; i++) {
        let key = buildingNames[i]
        if (buildings[key].name === building) {
            if (checkResources(buildings[key])) {
                polutionPoints += buildings[key].polution
                lifeQuality += buildings[key].life
                sciencePoints += buildings[key].pontoCientifico
                buildings[key].onField.lvlOne += 1
                buildings[key].total += 1
                let clone = cloneConstruction(buildings[key])
                clones.push(clone)
                incomeCalculator(buildings[key])
                setValues()
                addToBuildingDisplay(clone)
            } else {
                alert("Saldo Insuficiente")
            }
        }
    }

    


    
}

function checkResources(building) {
    let player = building.deck
    if (player === "prefeitura") {
        if (prefeituraCurrentMetalResource >= building.price) {
            return true
        } else {
            return false
        }
    } else if (player === "recursos humanos") {
        if (rhCurrentMetalResource >= building.price) {
            return true
        } else {
            return false
        }
    } else if (player === "diretores financeiros") {
        if (dfCurrentMetalResource >= building.price) {
            return true
        } else {
            return false
        }
    } else {
        alert("Erro 01: Player não encontrado. Relate o problema aos desenvolvedores.")
    }
}

function enoughWorkers(deck, lvl) {
    if (deck === "prefeitura") {
        if (lvl === 1) {
           if (prefeituraCurrentWorkerRosource >= 5) {
                return true
           } else {
                return false
           }
        } else if (lvl === 2) {
            if (prefeituraCurrentWorkerRosource >= 10) {
                return true
            } else {
                return false
            }
        } else if (lvl === 3) {
            if (prefeituraCurrentWorkerRosource >= 15) {
                return true
            } else {
                return false
            }

        } else if (lvl === 4) {
            if (prefeituraCurrentMetalResource >= 20) {
                return true
            } else {
                return false
            }

        } else {
            alert("Nível máximo atingido")
            return false
        }

    } else if (deck === "recursos humanos") {
        if (lvl === 1) {
            if (rhCurrentWorkerResource >= 5) {
                 return true
            } else {
                 return false
            }
         } else if (lvl === 2) {
             if (rhCurrentWorkerResource >= 10) {
                 return true
             } else {
                 return false
             }
         } else if (lvl === 3) {
             if (rhCurrentWorkerResource >= 15) {
                 return true
             } else {
                 return false
             }
 
         } else if (lvl === 4) {
             if (rhCurrentWorkerResource >= 20) {
                 return true
             } else {
                 return false
             }
 
         } else {
             alert("Nível máximo atingido")
             return false
         }

    } else if (deck === "diretores financeiros") {
        if (lvl === 1) {
            if (dfCurrentWorkerResource >= 5) {
                 return true
            } else {
                 return false
            }
         } else if (lvl === 2) {
             if (dfCurrentWorkerResource >= 10) {
                 return true
             } else {
                 return false
             }
         } else if (lvl === 3) {
             if (dfCurrentWorkerResource >= 15) {
                 return true
             } else {
                 return false
             }
 
         } else if (lvl === 4) {
             if (dfCurrentWorkerResource >= 20) {
                 return true
             } else {
                 return false
             }
 
         } else {
             alert("Nível máximo atingido")
             return false
         }

    } else {
        alert("Error")
    }
}

function incomeCalculator(building) {
    const player = building.deck
    if (player === "prefeitura") {
        prefeituraCurrentMetalResource -= building.price 
        prefeituraIncomeMetalResource += building.metalIncome
        prefeituraIncomeWorkerResource += building.workerIncome
    } else if (player === "recursos humanos") {
        rhCurrentMetalResource -= building.price 
        rhIncomeMetalResource += building.metalIncome
        rhIncomeWorkerResource += building.workerIncome
    } else if (player === "diretores financeiros") {
        dfCurrentMetalResource -= building.price 
        dfIncomeMetalResource += building.metalIncome
        dfCurrentWorkerResource += building.workerIncome
    } else {
        alert("Erro 02: Player não encontrado. Relate o problema aos desenvolvedores.")
    }
}

function paymentTime() {
    prefeituraCurrentMetalResource += prefeituraIncomeMetalResource
    prefeituraCurrentWorkerRosource += prefeituraIncomeWorkerResource

    rhCurrentMetalResource += rhIncomeMetalResource
    rhCurrentWorkerResource += rhIncomeWorkerResource

    dfCurrentMetalResource += dfIncomeMetalResource
    dfCurrentWorkerResource += dfIncomeWorkerResource
}

function endRound() {
    round = round + 1
    if (round === maxRounds) {
        endGame()
        gameOn = false
    }
    
    if (gameOn === true) {
        paymentTime()
        setValues()
    }
    
}

function setValues() {
    pointsAreaEl.innerHTML = " "
    incomesAreaEl.innerHTML = " "
    pointsAreaEl.innerHTML += `
        <h2>Índices da Partida</h2>
        <p>Rodada Atual: ${round}</p>
        <p>Pontos de Qualidade de Vida: ${lifeQuality}</p>
        <p>Pontos de Poluição: ${polutionPoints}</p>
        <p>Pontos Científicos: ${sciencePoints}</p>
    `
    incomesAreaEl.innerHTML += `
        <h2>Saldo Total</2>
        
        <h3>Prefeitura</h3>
        <p>Metais: ${prefeituraCurrentMetalResource} créditos</p>
        <p>Mão de Obra: ${prefeituraCurrentWorkerRosource} créditos</p>

        <h3>Diretores de Recursos Humanos</h3>
        <p>Metais: ${rhCurrentMetalResource} créditos</p>
        <p>Mão de Obra: ${rhCurrentWorkerResource} créditos</p>

        <h3>Diretores de Recursos Finaceiros</h3>
        <p>Metais: ${dfCurrentMetalResource} créditos</p>
        <p>Mão de Obra: ${dfCurrentWorkerResource} créditos</p>


        <h2>Rendimentos da Próxima Rodada</h2>
        
        <h3>Prefeitura</h3>
        <p>Metais: ${prefeituraIncomeMetalResource} créditos</p>
        <p>Mão de Obra: ${prefeituraIncomeWorkerResource} créditos</p>
        
        <h3>Diretores de Recursos Humanos</h3>
        <p>Metais: ${rhIncomeMetalResource} créditos</p>
        <p>Mão de Obra: ${rhIncomeWorkerResource} créditos</p>

        <h3>Diretores de Recursos Finaceiros</h3>
        <p>Metais: ${dfIncomeMetalResource} créditos</p>
        <p>Mão de Obra: ${dfIncomeWorkerResource} créditos</p>
    `
}

function endGame() {
    // mostrar tela final, apenas com os indicadores da partida
    cleanScreen()

    //Show title
    const finalDataTitle = document.createElement("h1")
    finalDataTitle.textContent = "DADOS FINAIS"
    pointsAreaEl.appendChild(finalDataTitle)

    // Pontos gerais (poluição, qualidade de vida, científicos)
    pointsAreaEl.innerHTML += `<h2>ÍNDICES GERAIS DA CIDADE</h2>
    <p>Pontos de Qualidade de Vida: ${lifeQuality}</p>
    <p>Pontos de Poluição: ${polutionPoints}</p>
    <p>Pontos Científicos: ${sciencePoints}</p>`

    // Incomes gerais
    const finalMetalProduction = prefeituraIncomeMetalResource + rhIncomeMetalResource + dfIncomeMetalResource
    const finalWorkerProduction = prefeituraIncomeWorkerResource + rhIncomeWorkerResource + dfIncomeWorkerResource
    incomesAreaEl.innerHTML += "<h2>RENDIMENTOS GERAIS DA CIDADE</h2>"
    incomesAreaEl.innerHTML += `<p>Produção de metais: ${finalMetalProduction} créditos por rodada</p> <p>Produção de Mão de Obra: ${finalWorkerProduction} créditos por rodada</p>`


    // Lista de construções e número delas em campo
    const buildingFinalList = document.createElement("section")
    buildingFinalList.id = "building-final-list-section"
    buildingFinalList.innerHTML += "<h2>CONSTRUÇÕES EM CAMPO</h2>"

    for (let i = 0; i < buildingNumber; i++) {
        let key = buildingNames[i]
        buildingFinalList.innerHTML += `<p>${buildings[key].name}: ${buildings[key].total}</p>`
        buildSection.appendChild(buildingFinalList)
    }
}

function addToBuildingDisplay(building) {
    let id = `${building.name}${building.total}`

    building.identifier = id

    let construction = document.createElement("div")
    construction.id = id
    construction.className = "construction-icon"

    let title = document.createElement("p")
    title.textContent = building.name
    construction.appendChild(title)

    let level = document.createElement("p")
    level.textContent = `Nível: ${building.level}`
    construction.appendChild(level)

    let upgradeBtn = document.createElement("button")
    upgradeBtn.textContent = "MELHORAR"
    upgradeBtn.addEventListener("click", function() {
        if (confirm(`Deseja melhorar essa construção para o nível ${building.level + 1}?`)) {
            upgrade(building, id)
        }
    })
    construction.appendChild(upgradeBtn)
        
    constructionsOnFieldEl.push(construction)
    
    renderConstructionsOnField()
    
}

function renderConstructionsOnField() {
    for (let i = 0; i < constructionsOnFieldEl.length; i++) {
        buildingDisplayArea.appendChild(constructionsOnFieldEl[i])
    }
}

function cloneConstruction(construction) {
    let c = {name: "", metalIncome: 0, workerIncome: 0, level: 1, deck: "", total: 0, identifier: ""}
    c.name = construction.name
    c.metalIncome = construction.metalIncome
    c.workerIncome = construction.workerIncome
    c.deck = construction.deck
    c.total = construction.total
    return c
}

function deleteOldDiv(clone){
    for (let i = 0; i < constructionsOnFieldEl.length; i++) {
        if (constructionsOnFieldEl[i].id === clone.identifier) {
            constructionsOnFieldEl = constructionsOnFieldEl.filter(elemento => elemento !== constructionsOnFieldEl[i]);
        }
    }
}

function updateClone(ident) {
    for (let i = 0; i < clones.length; i++) {
        if (clones[i].identifier === ident) {
            clones[i].level += 1

            deleteOldDiv(clones[i])
            
            let construction = document.createElement("div")
            construction.id = `${clones[i].name}${clones[i].total}`
            construction.className = "construction-icon"

            let title = document.createElement("p")
            title.textContent = clones[i].name
            construction.appendChild(title)

            let level = document.createElement("p")
            level.textContent = `Nível: ${clones[i].level}`
            construction.appendChild(level)

            let upgradeBtn = document.createElement("button")
            upgradeBtn.textContent = "MELHORAR"
            upgradeBtn.addEventListener("click", function() {
                if (confirm(`Deseja melhorar essa construção para o nível ${clones[i].level + 1}?`)) {
                        upgrade(clones[i], ident)
                }   
            })
            construction.appendChild(upgradeBtn)

            constructionsOnFieldEl.push(construction)

            buildingDisplayArea.innerHTML = " "

        }
        
    }
}

function upgrade(building, identification) {
    if (building.level < 5) {
        if (enoughWorkers(building.deck, building.level)) {
            if (building.deck === "prefeitura") {
                if (building.level === 1) {
                    updateClone(identification)
                    if (building.metalIncome > 0) {
                        prefeituraIncomeMetalResource += lvlTwoBenefits
                    }
                    if (building.workerIncome > 0) {
                        prefeituraIncomeWorkerResource += lvlTwoBenefits
                    }
                    prefeituraCurrentWorkerRosource -= lvlTwoCost
                    setValues()
                    buildingDisplayArea.innerHTML += " "
                    renderConstructionsOnField()
                } else if (building.level === 2) {
                    updateClone(identification)
                    if (building.metalIncome > 0) {
                        prefeituraIncomeMetalResource += lvlThreeBenefits
                    }
                    if (building.workerIncome > 0) {
                        prefeituraIncomeWorkerResource += lvlThreeBenefits
                    }
                    prefeituraCurrentWorkerRosource -= lvlThreeCost
                    setValues()
                    buildingDisplayArea.innerHTML += " "
                    renderConstructionsOnField()
                } else if (building.level === 3) {
                    updateClone(identification)
                    if (building.metalIncome > 0) {
                        prefeituraIncomeMetalResource += lvlFourBenefits
                    }
                    if (building.workerIncome > 0) {
                        prefeituraIncomeWorkerResource += lvlFourBenefits
                    }
                    prefeituraCurrentWorkerRosource -= lvlFourCost
                    setValues()
                    buildingDisplayArea.innerHTML += " "
                    renderConstructionsOnField()
                } else if (building.level === 4) {
                    updateClone(identification)
                    if (building.metalIncome > 0) {
                        prefeituraIncomeMetalResource += lvlFiveBenefits
                    }
                    if (building.workerIncome > 0) {
                        prefeituraIncomeWorkerResource += lvlFiveBenefits
                    }
                    prefeituraCurrentWorkerRosource -= lvlFiveCost
                    setValues()
                    buildingDisplayArea.innerHTML += " "
                    renderConstructionsOnField()
                }
            } else if (building.deck === "recursos humanos") {
                if (building.level === 1) {
                    updateClone(identification)
                    if (building.metalIncome > 0) {
                        rhIncomeMetalResource += lvlTwoBenefits
                    }
                    if (building.workerIncome > 0) {
                        rhIncomeWorkerResource += lvlTwoBenefits
                    }
                    rhCurrentWorkerResource -= lvlTwoCost
                    setValues()
                    buildingDisplayArea.innerHTML += " "
                    renderConstructionsOnField()
                } else if (building.level === 2) {
                    updateClone(identification)
                    if (building.metalIncome > 0) {
                        rhIncomeMetalResource += lvlThreeBenefits
                    }
                    if (building.workerIncome > 0) {
                        rhIncomeWorkerResource += lvlThreeBenefits
                    }
                    rhCurrentWorkerResource -= lvlThreeCost
                    setValues()
                    buildingDisplayArea.innerHTML += " "
                    renderConstructionsOnField()
                } else if (building.level === 3) {
                    updateClone(identification)
                    if (building.metalIncome > 0) {
                        rhIncomeMetalResource += lvlFourBenefits
                    }
                    if (building.workerIncome > 0) {
                        rhIncomeWorkerResource += lvlFourBenefits
                    }
                    rhCurrentWorkerResource -= lvlFourCost
                    setValues()
                    buildingDisplayArea.innerHTML += " "
                    renderConstructionsOnField()
                } else if (building.level === 4) {
                    updateClone(identification)
                    if (building.metalIncome > 0) {
                        rhIncomeMetalResource += lvlFiveBenefits
                    }
                    if (building.workerIncome > 0) {
                        rhIncomeWorkerResource += lvlFiveBenefits
                    }
                    rhCurrentWorkerResource -= lvlFiveCost
                    setValues()
                    buildingDisplayArea.innerHTML += " "
                    renderConstructionsOnField()
                }                
            } else if (building.deck === "diretores financeiros") {
                if (building.level === 1) {
                    updateClone(identification)
                    if (building.metalIncome > 0) {
                        dfIncomeMetalResource += lvlTwoBenefits
                    }
                    if (building.workerIncome > 0) {
                        dfIncomeWorkerResource += lvlTwoBenefits
                    }
                    dfCurrentWorkerResource -= lvlTwoCost
                    setValues()
                    buildingDisplayArea.innerHTML += " "
                    renderConstructionsOnField()
                } else if (building.level === 2) {
                    updateClone(identification)
                    if (building.metalIncome > 0) {
                        dfIncomeMetalResource += lvlThreeBenefits
                    }
                    if (building.workerIncome > 0) {
                        dfIncomeWorkerResource += lvlThreeBenefits
                    }
                    dfCurrentWorkerResource -= lvlThreeCost
                    setValues()
                    buildingDisplayArea.innerHTML += " "
                    renderConstructionsOnField()
                } else if (building.level === 3) {
                    updateClone(identification)
                    if (building.metalIncome > 0) {
                        dfIncomeMetalResource += lvlFourBenefits
                    }
                    if (building.workerIncome > 0) {
                        dfIncomeWorkerResource += lvlFourBenefits
                    }
                    dfCurrentWorkerResource -= lvlFourCost
                    setValues()
                    buildingDisplayArea.innerHTML += " "
                    renderConstructionsOnField()
                } else if (building.level === 4) {
                    updateClone(identification)
                    if (building.metalIncome > 0) {
                        dfIncomeMetalResource += lvlFiveBenefits
                    }
                    if (building.workerIncome > 0) {
                        dfIncomeWorkerResource += lvlFiveBenefits
                    }
                    dfCurrentWorkerResource -= lvlFiveCost
                    setValues()
                    buildingDisplayArea.innerHTML += " "
                    renderConstructionsOnField()
                }
            }
        
        } else {
            alert("Créditos Insuficientes")
        }
    } else {
        alert("Nível máximo atingido")
    }
    
    
}


//GAME PROCEDURE
if (newGameBtn){
    newGameBtn.addEventListener("click", newGame)
}
