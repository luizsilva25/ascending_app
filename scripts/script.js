//GAME ELEMENTS
import { buildings } from "./gameObjects.js"
import { characters } from "./gameObjects.js"



//GOBLAL VARIABLES
const maxRounds = 11
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


//DOM ELEMENTS
const newGameBtn = document.getElementById("new-game-btn")
const restartBtn = document.getElementById("restart-btn")
const pointsAreaEl = document.getElementById("points-section")
const incomesAreaEl = document.getElementById("incomes-section")
const buildSection = document.getElementById("build-section")
const endRoundSection = document.getElementById("end-round-section")



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
    dfIncomeMetalResource =0
    dfIncomeWorkerResource = 0
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
                buildings[key].onField += 1
                incomeCalculator(buildings[key])
            } else {
                alert("Saldo Insuficiente")
            }
        }
    }

    setValues()

    
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
        buildingFinalList.innerHTML += `<p>${buildings[key].name}: ${buildings[key].onField}</p>`
        buildSection.appendChild(buildingFinalList)
    }

    

}

//GAME PROCEDURE
if (newGameBtn){
    newGameBtn.addEventListener("click", newGame)
}
