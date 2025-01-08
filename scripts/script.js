import { buildings } from "./gameObjects.js"
//GAME ELEMENTS


//VARIABLES

//DOM ELEMENTS
const newGameBtn = document.getElementById("new-game-btn")
const menuBtns = document.getElementById("menu-btns")
const restartBtn = document.getElementById("restart-btn")
const testArea = document.getElementById("teste-area")


//FUNCTIONS
function newGame() {
    let titulo = buildings.casa.name
    let preco = buildings.casa.price
    let deck = buildings.casa.deck
    testArea.innerHTML += `<p>Título: ${titulo}</p><p>Preço: ${preco}</p>`
    alert("newGame called")
}

function restart() {
    //limpar tela
    testArea.innerHTML = ""
    newGame()
}

function teste() {
    alert("clicked")
}

//GAME PROCEDURE
newGameBtn.addEventListener("click", newGame)
restartBtn.addEventListener("click", restart)