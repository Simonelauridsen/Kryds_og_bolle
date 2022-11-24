const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

// Objektet addEventListenser der kører funktionen startGame og starter et spil når man trykker på knappen for at starte et nyt spil.
restartButton.addEventListener('click',startGame)

// Funktionen der starter spillet og fjerner vinder/uafgjort beskeden hvis man allerede har spillet.
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick, { once: true})
        cell.addEventListener('click', handleClick, { once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

// Denne funktion er den som placerer tegnene, skifter tur så det skiftevis er kryds og bolle og så tjekker den også hvem der vinder eller om spillet ender uafgjort.
function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

// Ved endt spil kommer beskeden op med hvem der har vundet eller om spillet ender uafgjort.
function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Uafgjort!'
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} vinder!`
    }
    winningMessageElement.classList.add('show')
  }

// Funktionen tjekker om alle felterne er blevet udfyldt for at finde ud af om spillet er endt uafgjort og så kommer "Uafgjort" tekbstboksen frem på skærmen.
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

// Funktionen som tjekker om der er nogle der har vundet ud fra vinder kombinationerne som står oppe i et array øverst i dokumentet. 
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// Funktionen der skifter mellem kryds og bolle når man trykker så det ikke kun er kryds der kommer når man trykker.
function swapTurns() {
    circleTurn = !circleTurn
}

// Funktionen der viser hover af symbol alt efter om det er kryds eller bolles tur. Dog viser den ikke hover når det er første mands tur.
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

// Funktionen der tjekker om der er en af vinderkombinationerne der er udfyldt. Derudover tjekker den også om det er samme form (kryds eller bolle) der er i samme række for at vinde.
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => { 
            return cellElements[index].classList.contains(currentClass)
        })
    })
}