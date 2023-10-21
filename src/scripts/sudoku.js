import checkSolvedCells from "./techniques/checkSolvedCells.js"
import removeCandidatesSimple from "./techniques/removeCandidatesSimple.js"
import hiddenSingles from "./techniques/hiddenSingles.js"

const floor = Math.floor

export function stringToMatrix(inp) {
	if (typeof(inp) !== "string" || inp.length !== 81) {
		throw TypeError(`Input doesn't fit a sudoku string, type: ${typeof(inp)} length:${inp && inp.length}`)
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
	#techList
	#changesStack = []
	techs = [
		{
			tech: this.removeCandidatesSimple,
			name: "removeCandidatesSimple",
			displayName: "Remove candidates",
			enabled: true,},
		{
			tech: this.checkSolvedCells,
			name: "checkSolvedCells",
			displayName: "Check solved cells",
			enabled: true,},
		{
			tech: this.hiddenSingles,
			name: "hiddenSingles",
			displayName: "Hidden singles",
			enabled: true,},
	]

	constructor(sudokuString, boardComponent, techList) {
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
		} else {
			console.warn("No board component given to sudoku object")
		}

		if (techList) {
			this.#techList = techList
			this.#techList.clear()
			for (let tech of this.techs) {
				this.#techList.techs.push(tech)
			}
		} else {
			console.warn("No list component given to sudoku object")
		}

		for (let row=0; row<9; row++) {
			for (let col=0; col<9; col++) {
				if (this.#board[row][col] == 0) {
					this.#board[row][col] = {
						1: true, 2: true, 3: true,
						4: true, 5: true, 6: true,
						7: true, 8: true, 9: true,
					}
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

	update(changes) {
		for (let c of changes) {
			c.cand = Number(c.cand)
			switch(c.type) {
				case "rm":
					this.#board[c.row][c.col][c.cand] = false
					if (this.#display) {
						this.#display.removeCandidateFromCell(c.row, c.col, c.cand)
					}
					break
				case "solved":
					this.#board[c.row][c.col] = c.cand
					this.#unsolvedCells--
					if (this.#display) {
						this.#display.setCell(c.row, c.col, c.cand)
					}
					break
				case "error":
					break //TODO HANDLE HIGHLIGHTING
				default:
					console.error("UNHANDLED CASE", c)
			}
		}
	}

	isCellSolved(row, col) {
		let cell_contents = this.#board[row][col]
		if (typeof(cell_contents) === "number") {
			return cell_contents
		}
		return false
	}

	isCellUnsolved(row, col) {
		let cell_contents = this.#board[row][col]
		if (typeof(cell_contents) !== "number") {
			return cell_contents
		}
		return false
	}

	reset() {
		if (this.#display) { this.#display.resetBoard() }
		if (this.#techList) { this.#techList.removeHighlight() }
	}

	next(sudokuObj = this) {
		if (this.#unsolvedCells === 0 ) {
			console.log("Done solving board.")
			let errors = this.areThereErrors()
			if (errors.length) {
				console.log(errors)
				this.update(errors)
				return "invalid"
			}
			return 0
		}

		if (this.#unsolvedCells < 0) {
			console.error("something very wrong happened, unsolved cells shouldn't go below 0")
		}
		
		for (let tech of sudokuObj.techs) {
			let changes = tech.tech(this)
			console.debug("applying:", tech.name, "changes:", changes)

			if (tech.name === "checkSolvedCells" || tech.name === "hiddenSingles") {
				let errors = this.areThereErrors()
				if (errors.length) {
					this.update(errors)
					return "invalid"
				}
			}

			if (changes.length) {
				if (this.#techList) {
					this.#techList.highlight(tech.name)
				}
				return changes
			} 
		}
		console.log("Can't solve with current techniques")
		return "no tech"
	}

	areThereErrors(sudokuObj = this) {
		let cell_value
		for (let r=0; r<9; r++) {
			let set = {}
			for (let c=0; c<9; c++) {
				if (cell_value = sudokuObj.isCellSolved(r, c)) {
					if (set[cell_value]) {
						return [
							set[cell_value],
							{row:r, col:c, cand: 0, type:"error"}
						]
					}
					set[cell_value] = {row:r, col:c, cand: 0, type:"error"}
				}
			}
		}

		for (let c=0; c<9; c++) {
			let set = {}
			for (let r=0; r<9; r++) {
				if (cell_value = sudokuObj.isCellSolved(r, c)) {
					if (set[cell_value]) {
						return [
							set[cell_value],
							{row:r, col:c, cand: 0, type:"error"}
						]
					}
					set[cell_value] = {row:r, col:c, cand: 0, type:"error"}
				}
			}
		}
		
		for (let b=0; b<9; b++) {
			let set = {}
			let x = floor(b/3)
			let y = floor(b%3)
			for (let r=x*3; r<x*3+3; r++) {
				for (let c=y*3; c<y*3+3; c++) {
					if (cell_value = sudokuObj.isCellSolved(r, c)) {
						if (set[cell_value]) {
							return [
								set[cell_value],
								{row:r, col:c, cand: 0, type:"error"}
							]
						}
						set[cell_value] = {row:r, col:c, cand: 0, type:"error"}
					}
				}
			}
		}
		return []
	}

	removeCandidatesSimple(sudokuObj = this) {
		let changes = removeCandidatesSimple(sudokuObj)
		if (changes.length) {
			sudokuObj.update(changes)
		}
		return changes
	}

	checkSolvedCells(sudokuObj = this) {
		let changes = checkSolvedCells(sudokuObj)
		if (changes.length) {
			sudokuObj.update(changes)
		}
		return changes
	}

	hiddenSingles(sudokuObj = this) {
		let changes = hiddenSingles(sudokuObj)
		if (changes.length) {
			sudokuObj.update(changes)
		}
		return changes
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
	if (typeof(board) === "string") { return board }
	board = board.join("").replaceAll(",", "").replaceAll("0", ".")
	console.log(board)
	for (let row = 0; row<81; row+=9) {
		console.log(board.substring(row, row+3) + "|" + board.substring(row+3, row+6) + "|" + board.substring(row+6, row+9))
		if (row == 18 || row == 45) {
			console.log("---+---+---")
		}
	}
}