import { buildings } from "./gameObjects.js"

//DOM
const deckEl = document.getElementById("deck-el")
const prefDeckEl = document.getElementById("prefeitura-deck-el")
const recursosHDeckEl = document.getElementById("recursosH-deck-el")
const recursosFDeckEl = document.getElementById("recursosF-deck-el")

// VARIABLES
const buildingNumber = Object.keys(buildings).length
const buildingNames = Object.keys(buildings)


// FUNCTIONS
function render(deck, place) {
    for (let i = 0; i < buildingNumber; i++) {
        let buildkey = buildingNames[i]
        let build = buildings[buildkey]
        if (build.deck === deck) {
            place.innerHTML += `<p>${build.name}</p>`
        }    
    }
}

render("prefeitura", prefDeckEl)
render("recursos humanos", recursosHDeckEl)
render("diretores financeiros", recursosFDeckEl)

