//GAME ELEMENTS
import { buildings } from "./gameObjects.js"
import { characters } from "./gameObjects.js"



//GOBLAL VARIABLES
const maxRounds = 10
let round = 0
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

//DOM ELEMENTS
const newGameBtn = document.getElementById("new-game-btn")
const restartBtn = document.getElementById("restart-btn")
const pointsAreaEl = document.getElementById("points-section")
const incomesAreaEl = document.getElementById("incomes-section")
const buildSection = document.getElementById("build-section")
const endRoundSection = document.getElementById("end-round-section")



//FUNCTIONS

function newGame() {
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

function restart() {
    pointsAreaEl.innerHTML = " "
    incomesAreaEl.innerHTML = " "
    endRoundSection.innerHTML = " "
    buildSection.innerHTML = " "
    round = 0
    prefeituraCurrentMetalResource = characters.prefeitura.inicialMetalResource
    prefeituraCurrentWorkerRosource = characters.prefeitura.inicialWorkerResource
    rhCurrentMetalResource = characters.rh.inicialMetalResource
    rhCurrentWorkerResource = characters.rh.inicialWorkerResource
    dfCurrentMetalResource = characters.df.inicialMetalResource
    dfCurrentWorkerResource = characters.df.inicialWorkerResource
}

function construct() {
    let building = document.getElementById("build-input-el").value

    for (let i = 0; i < buildingNumber; i++) {
        let key = buildingNames[i]
        if (buildings[key].name === building) {
            polutionPoints += buildings[key].polution
            lifeQuality += buildings[key].life
            sciencePoints += buildings[key].pontoCientifico
        }
    }

    

    setValues()

    
}

function endRound() {
    round = round + 1
    if (round === maxRounds) {
        endGame()
    }
    setValues()
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
        <h3>Prefeitura: Recursos Atuais</h3>
        <p>Metais: ${prefeituraCurrentMetalResource} créditos</p>
        <p>Mão de Obra: ${prefeituraCurrentWorkerRosource} créditos</p>

        <h3>Diretores de Recursos Humanos: Recursos Atuais</h3>
        <p>Metais: ${rhCurrentMetalResource} créditos</p>
        <p>Mão de Obra: ${rhCurrentWorkerResource} créditos</p>

        <h3>Diretores de Recursos Finaceiros: Recursos Atuais</h3>
        <p>Metais: ${dfCurrentMetalResource} créditos</p>
        <p>Mão de Obra: ${dfCurrentWorkerResource} créditos</p>

        <h2>Rendimentos da Próxima Rodada</h2>
    `
}

//GAME PROCEDURE
newGameBtn.addEventListener("click", newGame)
restartBtn.addEventListener("click", restart)