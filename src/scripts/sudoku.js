import removeCandidatesSimple from "./removeCandidatesSimple.js"

const floor = Math.floor

export function stringToMatrix(inp) {
	if (typeof(inp) !== "string" || inp.length !== 81) {
		throw TypeError("Input doesn't fit a sudoku string")
	}
	inp = inp.replaceAll(/[^\d]/g, "0")
	let board = []
	for (let r=0; r<9; r++) {
		board[r] = []
		for (let c=0; c<9; c++) {
			board[r][c] = Number(inp.charAt(r*9 + c))
		}
	}
	return board
}

export class Sudoku {
	#board
	#unsolvedCells
	#display
	#changesStack = []

	constructor(sudokuString, boardComponent) {
		this.#board = stringToMatrix(sudokuString)
		this.#unsolvedCells = 81

		if (boardComponent) {
			this.#display = boardComponent
			this.#display.resetBoard()

			for (let i in sudokuString) {
				let n = Number(sudokuString[i])
				if (n) {
					this.#display.setCellByIndex(i, n)
					this.#display.setCellTextColor(i, "#c40f02")
				}
			}
		}

		for (let row=0; row<9; row++) {
			for (let col=0; col<9; col++) {
				if (this.#board[row][col] == 0) {
					this.#board[row][col] = [
						true, true, true,
						true, true, true,
						true, true, true]
				} else {
					this.#unsolvedCells--
				}
			}
		}
	}

	get unsolvedCells() {
		return this.#unsolvedCells
	}

	get board() {
		return this.#board
	}

	updateDisplay(changes) {
		for (let change of changes) {
			if (change.type === "rm") {
				this.#display.removeCandidateFromCell(change.row, change.col, change.cand)
			}
		}
	}

	removeCandidatesSimple() {
		let changes = removeCandidatesSimple(this)
		console.log(changes)
		this.updateDisplay(changes)
	}
}


export function matrixToString(board) {
	return board.join("").replaceAll(",", "").replaceAll("0", ".")
}

export function isGuessValid(board, guess, row, col) {
	if (board[row][col] != 0 ) { return false }
	
	for (let r=0; r<9; r++) {
		if (board[r][col] == guess) { return false }
	}

	for (let c=0; c<9; c++) {
		if (board[row][c] == guess) { return false }
	}

	let x = floor(row/3)*3
	let y = floor(col/3)*3
	for (let r=x; r<x+3; r++) {
		for (let c=y; c<y+3; c++) {
			if (board[r][c] == guess) { return false }
		}
	}

	return true
}

export function printBoard(board) {
	if (board == -1) { return -1 }
	board = board.join("").replaceAll(",", "").replaceAll("0", ".")
	console.log(board)
	for (let row = 0; row<81; row+=9) {
		console.log(board.substring(row, row+3) + "|" + board.substring(row+3, row+6) + "|" + board.substring(row+6, row+9))
		if (row == 18 || row == 45) {
			console.log("---+---+---")
		}
	}
}

export function isSudokuBoard(board) {
	console.log(typeof(board))
}