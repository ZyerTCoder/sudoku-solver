import checkSolvedCells from "./techniques/checkSolvedCells.js"
import removeCandidatesSimple from "./techniques/removeCandidatesSimple.js"
import hiddenSingles from "./techniques/hiddenSingles.js"
import nakedPairs from "./techniques/nakedPairs.js"

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
	#highlightedChanges
	#changesStack = []
	techs = [
		{
			tech: removeCandidatesSimple,
			name: "removeCandidatesSimple",
			displayName: "Remove candidates",
			enabled: true,
		},
		{
			tech: checkSolvedCells,
			name: "checkSolvedCells",
			displayName: "Check solved cells",
			enabled: true,
		},
		{
			tech: hiddenSingles,
			name: "hiddenSingles",
			displayName: "Hidden singles",
			enabled: true,
		},
		{
			tech: nakedPairs,
			name: "nakedPairs",
			displayName: "Naked Pairs",
			enabled: true,
		},
	]

	constructor(sudokuString, boardComponent, techList) {
		if (sudokuString === "TEST_NO_CANDIDATES") {
			this.#board = []
			for (let row=0; row<9; row++) {
				this.#board[row] = []
				for (let col=0; col<9; col++) {
					this.#board[row][col] = {
						1: false, 2: false, 3: false,
						4: false, 5: false, 6: false,
						7: false, 8: false, 9: false,
					}
				}
			}
		} else {
			this.#board = stringToMatrix(sudokuString)
			this.#unsolvedCells = 81
			
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

		if (boardComponent) {
			this.#display = boardComponent
			this.#display.resetBoard()

			for (let i in sudokuString) {
				let n = Number(sudokuString[i])
				if (n) {
					this.#display.setCellByIndex(i, n)
					this.#display.setCellTextColor(i, "#c40f02")
				}
				if (sudokuString === "TEST_NO_CANDIDATES") {
					for (let row=0; row<9; row++) {
						for (let col=0; col<9; col++) {
							for (let cand=1; cand<10; cand++) {
								this.#display.removeCandidateFromCell(row, col, cand)
							}
						}
					}
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

	}

	get unsolvedCells() {
		return this.#unsolvedCells
	}

	get board() {
		return this.#board
	}

	update(changes) {
		if (this.#techList) {
			this.#techList.highlight(changes.tech)
		}
		for (let c of changes.changes) {
			c.cand = Number(c.cand)
			switch(c.type) {
				case "rm":
					this.#board[c.row][c.col][c.cand] = false
					if (this.#display) {
						this.#display.removeCandidateFromCell(c.row, c.col, c.cand)
						this.#display.setCellCandidateColor(c.row, c.col, c.cand, "white")
					}
					break
				case "solved":
					this.#board[c.row][c.col] = c.cand
					this.#unsolvedCells--
					if (this.#display) {
						this.#display.setCell(c.row, c.col, c.cand)
					}
					break
				case "yellow":
					this.#display.setCellCandidateColor(c.row, c.col, c.cand, "white")
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
			console.debug("Done solving board.")
			let errors = this.areThereErrors()
			if (errors.length) {
				console.log("errors", errors)
				this.update(errors)
				return "invalid"
			}
			return 0
		}

		if (this.#unsolvedCells < 0) {
			console.error("something very wrong happened, unsolved cells shouldn't go below 0")
		}
		
		let errors = this.areThereErrors()
		if (errors.length) {
			this.update({changes: errors, tech: "error"}) // TODO error highlighting
			return "invalid"
		}

		// apply highlighted changes if there are any
		if (this.#display && this.#highlightedChanges) {
			let changes = this.#highlightedChanges
			this.#highlightedChanges = false
			sudokuObj.update(changes)
			return {changes: changes.changes, tech: changes.name}
		}

		for (let tech of sudokuObj.techs) {
			// console.debug("applying:", tech.name, "changes:", changes)
			let changes = tech.tech(sudokuObj)

			if (!changes.length) {
				continue
			}
			
			// if there is a display to highlight then do that
			if (this.#display && !this.#highlightedChanges && changes.length && tech.name !== "removeCandidatesSimple") {
				this.#highlightedChanges = {changes: changes, tech: tech.name}
				this.#display.highlight(changes)
				if (this.#techList) {
					this.#techList.highlight(tech.name)
				}
				return {changes: changes, tech: tech.name, highlighting: true}
			}

			if (changes.length) {
				sudokuObj.update({changes: changes, tech: tech.name})
				return {changes: changes, tech: tech.name}
			} 			
		}
		console.log("Can't solve with current techniquess")
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

	testingSetCandidatesOnCell(row, col, candidates) {
		this.#board[row][col] = candidates
	}
}

export class SetOfDicts {
	#set

	constructor() {
		this.dicts_array = []
		this.#set = new Set()
	}

	add(d) {
		let string_ver = JSON.stringify(d)
		if (this.#set.has(string_ver)) { return }
		else {
			this.#set.add(string_ver)
			this.dicts_array.push(d)
		}
	}
}

export function* combinations(array, size) {
	// let combs = []

	let indices = []
	for (let i=0; i<size; i++) {
		indices.push(i)
	}

	while (true) {
		if (indices[0] > array.length - (size + 1)) { break }
		
		for (let i=indices.length-1; i>0; i--) {
			if (indices[i] >= array.length - (size - (i + 1)) ) {
				indices[i-1] = indices[i-1] + 1
				for (let ii=i; ii<indices.length; ii++) {
					indices[ii] = indices[ii-1] + 1
				}
			}
		}
		
		if (indices[indices.length-1] < array.length) {
			// combs.push(Array.from(indices, (i) => array[i]))
			yield Array.from(indices, (i) => array[i])
			indices[indices.length-1] = indices[indices.length-1]+1
		}
	}

	// return combs
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