import { Sudoku } from "../scripts/sudoku"
import { assertType, beforeEach, expect, expectTypeOf, test } from "vitest"

const easy_board = "...1.5...14....67..8...24...63.7..1.9.......3.1..9.52...72...8..26....35...4.9..."
const unsolvedCellStr = JSON.stringify({
	1: true, 2: true, 3: true,
	4: true, 5: true, 6: true,
	7: true, 8: true, 9: true,
})

test("normal sudoku object creation from string", () => {
	const sudoku = new Sudoku(easy_board)

	// unsolvedCells logic
	expect(sudoku.unsolvedCells).toBe(53)
	expect(() => sudoku.unsolvedCells = 1).toThrowError(TypeError)

	// structure
	expect(sudoku.board.length).toBe(9)
	for (let row=0; row<sudoku.board.length; row++) {
		expect(sudoku.board[row].length).toBe(9)
	}

	// correctly placed values
	expect(JSON.stringify(sudoku.board[4][2])).toBe(unsolvedCellStr)
	expect(JSON.stringify(sudoku.board[8][8])).toBe(unsolvedCellStr)
	expect(sudoku.board[1][1]).toBe(4)
	expect(sudoku.board[8][5]).toBe(9)
	expect(sudoku.board[0][5]).toBe(5)
})

test("completed sudoku object creation from string", () => {
	const sudoku = new Sudoku("246975138589316274371248695498621753132754986657839421724183569865492317913567842")

	// unsolvedCells logic
	expect(sudoku.unsolvedCells).toBe(0)
	expect(() => sudoku.unsolvedCells = 1).toThrowError(TypeError)

	// structure
	expect(sudoku.board.length).toBe(9)
	for (let row=0; row<9; row++) {
		expect(sudoku.board[row].length).toBe(9)
	}

	// correctly placed values
	for (let row=0; row<9; row++) {
		for (let col=0; col<9; col++) {
			let c = JSON.stringify(sudoku.board[row][col])
			expect(c).not.toBe(unsolvedCellStr)
		}
	}
	expect(sudoku.board[0][0]).toBe(2)
	expect(sudoku.board[0][8]).toBe(8)
	expect(sudoku.board[8][0]).toBe(9)
	expect(sudoku.board[8][8]).toBe(2)
	expect(sudoku.board[5][3]).toBe(8)
})

test("loading fully empty sudoku", () => {
	const sudoku = new Sudoku(".................................................................................")

	// unsolvedCells logic
	expect(sudoku.unsolvedCells).toBe(81)
	expect(() => sudoku.unsolvedCells = 1).toThrowError(TypeError)

	// structure
	expect(sudoku.board.length).toBe(9)
	for (let row=0; row<9; row++) {
		expect(sudoku.board[row].length).toBe(9)
	}

	// correctly placed values
	for (let row=0; row<9; row++) {
		for (let col=0; col<9; col++) {
			let c = JSON.stringify(sudoku.board[row][col])
			expect(c).toBe(unsolvedCellStr)
		}
	}
})

test("new sudoku from invalid input fails", () => {
	expect(() => new Sudoku()).toThrowError(TypeError)
	expect(() => new Sudoku("")).toThrowError(TypeError)
	expect(() => new Sudoku("asdasd")).toThrowError(TypeError)
	expect(() => new Sudoku(123)).toThrowError(TypeError)
	expect(() => new Sudoku("123..123123...")).toThrowError(TypeError)
})

let sudoku
beforeEach(() => {
	sudoku = new Sudoku(easy_board)
})

test.todo("iterateBoard", () => {
})

test.todo("iterateRow", () => {
})

test.todo("iterateCol", () => {
})

test.todo("iterateBox", () => {
})

test.todo("isSolvedIncorrectly", () => {
})

test.todo("setSolvedCell", () => {	
})

test.todo("isCellSolved", () => {	
})

test.todo("isCellUnsolved", () => {	
})