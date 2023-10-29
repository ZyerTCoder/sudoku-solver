import { Sudoku } from "../scripts/sudoku"
import { expect, test } from "vitest"
import checkSolvedCells from "../scripts/techniques/checkSolvedCells"

test("checkSolvedCells: 1 on top left on test board", () => {
	let sudoku = new Sudoku("TEST_NO_CANDIDATES")
	sudoku.testingSetCandidatesOnCell(0, 0, {
		1: true, 2: false, 3: false,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})

	let changes = checkSolvedCells(sudoku)
	expect(changes).toStrictEqual([{"row":0,"col":0,"cand":1,"type":"solved"}])
})

test("checkSolvedCells:  1 on bottom right board full of candidates", () => {
	let sudoku = new Sudoku(".................................................................................")
	sudoku.testingSetCandidatesOnCell(0, 0, {
		1: true, 2: false, 3: false,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})

	let changes = checkSolvedCells(sudoku)
	expect(changes).toStrictEqual([{"row":0,"col":0,"cand":1,"type":"solved"}])
})

test("checkSolvedCells: empty board doesn't return anything", () => {
	let sudoku = new Sudoku(".................................................................................")

	let changes = checkSolvedCells(sudoku)
	expect(changes).toStrictEqual([])
})

test("checkSolvedCells: solved board doesn't return anything", () => {
	let sudoku = new Sudoku("246975138589316274371248695498621753132754986657839421724183569865492317913567842")

	let changes = checkSolvedCells(sudoku)
	expect(changes).toStrictEqual([])
})

test("checkSolvedCells: running before ", () => {
	let sudoku = new Sudoku("246975138589316274371248695498621753132754986657839421724183569865492317913567842")

	let changes = checkSolvedCells(sudoku)
	expect(changes).toStrictEqual([])
})