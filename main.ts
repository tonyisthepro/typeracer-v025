/**
 * INIT
 */
function resetGame () {
    score = 0
    combo = 0
    lives = 3
    timeLeft = 60
    playing = true
    inputWord = ""
    currentLetterIndex = 0
    newWord()
}
// LETTER SELECT LEFT
input.onButtonPressed(Button.A, function () {
    if (!(playing)) {
        return
    }
    currentLetterIndex = (currentLetterIndex - 1 + alphabet.length) % alphabet.length
    updateDisplay()
})
function showSlow (text: string) {
    basic.showString(text, 120)
}
function gameOver () {
    playing = false
    music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
basic.showString("END", 120)
basic.showNumber(score)
}
// TYPE LETTER
input.onButtonPressed(Button.AB, function () {
    if (!(playing)) {
        return
    }
    selected = alphabet.charAt(currentLetterIndex)
    inputWord = "" + inputWord + selected
    serial.writeLine("INPUT: " + inputWord)
})
// LETTER SELECT RIGHT
input.onButtonPressed(Button.B, function () {
    if (!(playing)) {
        return
    }
    currentLetterIndex = (currentLetterIndex + 1) % alphabet.length
    updateDisplay()
})
function updateDisplay () {
    letter = alphabet.charAt(currentLetterIndex)
    basic.showString(letter, 120)
}
// SUBMIT
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (!(playing)) {
        return
    }
    if (inputWord == targetWord) {
        score += 1
        combo += 1
        basic.showIcon(IconNames.Yes)
        newWord()
    } else {
        combo = 0
        lives += 0 - 1
        basic.showIcon(IconNames.No)
        inputWord = ""
        if (lives <= 0) {
            gameOver()
        }
    }
})
// NEW WORD (FIXED)
function newWord () {
    targetWord = wordList[Math.randomRange(0, wordList.length - 1)]
    inputWord = ""
    currentLetterIndex = 0
    serial.writeLine("WORD: " + targetWord)
    showSlow(targetWord)
    updateDisplay()
}
let targetWord = ""
let letter = ""
let selected = ""
let currentLetterIndex = 0
let inputWord = ""
let playing = false
let combo = 0
let score = 0
let wordList: string[] = []
let alphabet = ""
let lives = 0
let timeLeft = 0
timeLeft = 60
lives = 3
alphabet = "abcdefghijklmnopqrstuvwxyz"
wordList = [
"cat",
"dog",
"apple",
"space",
"rocket",
"coding"
]
serial.redirectToUSB()
basic.showString("TYPE", 120)
resetGame()
// TIMER
loops.everyInterval(1000, function () {
    if (playing) {
        timeLeft += 0 - 1
        if (timeLeft <= 0) {
            gameOver()
        }
    }
})
