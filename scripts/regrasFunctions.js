import { disasterList } from "./disasters.js"
import { buildings } from "./gameObjects.js"

//DOM
const deckEl = document.getElementById("deck-el")
const prefDeckEl = document.getElementById("prefeitura-deck-el")
const recursosHDeckEl = document.getElementById("recursosH-deck-el")
const recursosFDeckEl = document.getElementById("recursosF-deck-el")
const disasterEl = document.getElementById("lista-desastres-el")

// VARIABLES
const buildingNumber = Object.keys(buildings).length
const buildingNames = Object.keys(buildings)
const disasterNumber = Object.keys(disasterList).length
const disasterNames = Object.keys(disasterList)


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

function renderDisaster(desastres, place) {
    for (let i = 0; i < disasterNumber; i++) {
        let disasterKey = disasterNames[i]
        let disaster = desastres[disasterKey]
        place.innerHTML += `<p>${disaster.name}</p>`
    }
}


// PAGE SETUP

render("prefeitura", prefDeckEl)
render("recursos humanos", recursosHDeckEl)
render("diretores financeiros", recursosFDeckEl)
renderDisaster(disasterList, disasterEl)
