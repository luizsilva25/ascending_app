// DOM MANIPULATION
const introMusic = document.createElement("audio")
introMusic.id = "intro-music"
introMusic.src = "../sound/ascending_intro.wav"
introMusic.loop = true;
document.body.appendChild(introMusic)

// FUNCTIONS
function playIntro() {
    document.getElementById("intro-music").play()
}

// GAME BUILDING
playIntro()