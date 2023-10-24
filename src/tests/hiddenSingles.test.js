import { Sudoku } from "../scripts/sudoku"
import { expect, test } from "vitest"
import hiddenSingles from "../scripts/techniques/hiddenSingles"
import removeCandidatesSimple from "../scripts/techniques/removeCandidatesSimple"

// MCR : Manual Candidate Removal

test("hiddenSingles: in row", () => {
	const sudoku = new Sudoku(".........2........3..........1..........................1........................")
	sudoku.update({changes:removeCandidatesSimple(sudoku)})
	let changes = hiddenSingles(sudoku)
	expect(changes.length).toBe(1)
	changes = JSON.stringify(changes)
	expect(changes).toBe(`[{"row":0,"col":0,"cand":1,"type":"solved","reason":"unique in col"}]`)
})

test("hiddenSingles: in col", () => {
	const sudoku = new Sudoku(".234567........................................................................11")
	sudoku.update({changes:removeCandidatesSimple(sudoku)})
	let changes = hiddenSingles(sudoku)
	expect(changes.length).toBe(1)
	changes = JSON.stringify(changes)
	expect(changes).toBe(`[{"row":0,"col":0,"cand":1,"type":"solved","reason":"unique in row"}]`)
})

test("hiddenSingles: in box", () => {
	const sudoku = new Sudoku("............1........1......11...................................................")
	sudoku.update({changes:removeCandidatesSimple(sudoku)})
	let changes = hiddenSingles(sudoku)
	expect(changes.length).toBe(1)
	changes = JSON.stringify(changes)
	expect(changes).toBe(`[{"row":0,"col":0,"cand":1,"type":"solved","reason":"unique in box"}]`)
})

test("hiddenSingles: in row col box", () => {
	const sudoku = new Sudoku(".................1.......1.......1.......1.......1.......1.......1.......1.......")
	sudoku.update({changes:removeCandidatesSimple(sudoku)})
	let changes = hiddenSingles(sudoku)
	expect(changes.length).toBe(1)
	changes = JSON.stringify(changes)
	expect(changes).toBe(`[{"row":0,"col":0,"cand":1,"type":"solved","reason":"unique in row col box"}]`)
})

test("hiddenSingles: doesnt remove from empty sudoku", () => {
	const sudoku = new Sudoku(".................................................................................")
	let changes = hiddenSingles(sudoku)
	expect(changes.length).toBe(0)
	changes = JSON.stringify(changes)
	expect(changes).toBe(`[]`)
})

test("hiddenSingles: in row MCR", () => {
	const sudoku = new Sudoku(".................................................................................")
	for (let col = 1; col<9; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: false, 2: true, 3: true,
			4: true, 5: true, 6: true,
			7: true, 8: true, 9: true,
		})
	}
	let changes = hiddenSingles(sudoku)
	expect(changes.length).toBe(1)
	expect(changes).toStrictEqual([{"row":0,"col":0,"cand":1,"type":"solved","reason":"unique in row"}])
})

test("hiddenSingles: in col MCR", () => {
	const sudoku = new Sudoku(".................................................................................")
	for (let row=1; row<9; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: false, 2: true, 3: true,
			4: true, 5: true, 6: true,
			7: true, 8: true, 9: true,
		})
	}
	let changes = hiddenSingles(sudoku)
	expect(changes.length).toBe(1)
	expect(changes).toStrictEqual([{"row":0,"col":0,"cand":1,"type":"solved","reason":"unique in col"}])
})

test("hiddenSingles: in box MCR", () => {
	const sudoku = new Sudoku(".................................................................................")
	for (let row=1; row<3; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: false, 2: true, 3: true,
			4: true, 5: true, 6: true,
			7: true, 8: true, 9: true,
		})
	}
	for (let row=0; row<3; row++) {
		for (let col=1; col<3; col++)
		sudoku.testingSetCandidatesOnCell(row, col, {
			1: false, 2: true, 3: true,
			4: true, 5: true, 6: true,
			7: true, 8: true, 9: true,
		})
	}
	let changes = hiddenSingles(sudoku)
	expect(changes.length).toBe(1)
	expect(changes).toStrictEqual([{"row":0,"col":0,"cand":1,"type":"solved","reason":"unique in box"}])
})