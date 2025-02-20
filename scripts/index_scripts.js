// DOM MANIPULATION
const menuBtns = document.getElementById("menu-btns")

// GLOBAL VARIABLES
let soundOn = true 


// FUNCTIONS

function addSoundButton(container) {
    const soundBtn = document.createElement("button")
    soundBtn.id = "sound-button"
    soundBtn.innerText = "sound"
    soundBtn.addEventListener('click', function() {
        if (soundOn == true) {
            soundOn = false
            document.getElementById("intro-music").pause()
        } else {
            soundOn = true
            playIntro()
        }
    })
    container.appendChild(soundBtn)
}

function playIntro() {
    document.getElementById("intro-music").play()
}



// GAME ASSETS
const introMusic = document.createElement("audio")
introMusic.id = "intro-music"
introMusic.src = "../sound/ascending_intro.wav"
introMusic.loop = true;
document.body.appendChild(introMusic)

// GAME BUILDING

addSoundButton(menuBtns)

if (soundOn == true) {
    playIntro()
}