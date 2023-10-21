import { Sudoku } from "../scripts/sudoku"
import { expect, test } from "vitest"

test("hiddenSingle in row", () => {
	const sudoku = new Sudoku(".........2........3..........1..........................1........................")
	sudoku.removeCandidatesSimple()
	let changes = sudoku.hiddenSingles()
	expect(changes.length).toBe(1)
	changes = JSON.stringify(changes)
	expect(changes).toBe(`[{"row":0,"col":0,"cand":1,"type":"solved","reason":"unique in col"}]`)
})

test("hiddenSingle in col", () => {
	const sudoku = new Sudoku(".234567........................................................................11")
	sudoku.removeCandidatesSimple()
	let changes = sudoku.hiddenSingles()
	expect(changes.length).toBe(1)
	changes = JSON.stringify(changes)
	expect(changes).toBe(`[{"row":0,"col":0,"cand":1,"type":"solved","reason":"unique in row"}]`)
})

test("hiddenSingle in box", () => {
	const sudoku = new Sudoku("............1........1......11...................................................")
	sudoku.removeCandidatesSimple()
	let changes = sudoku.hiddenSingles()
	expect(changes.length).toBe(1)
	changes = JSON.stringify(changes)
	expect(changes).toBe(`[{"row":0,"col":0,"cand":1,"type":"solved","reason":"unique in box"}]`)
})

test("hiddenSingle in row col box", () => {
	const sudoku = new Sudoku(".................1.......1.......1.......1.......1.......1.......1.......1.......")
	sudoku.removeCandidatesSimple()
	let changes = sudoku.hiddenSingles()
	expect(changes.length).toBe(1)
	changes = JSON.stringify(changes)
	expect(changes).toBe(`[{"row":0,"col":0,"cand":1,"type":"solved","reason":"unique in row col box"}]`)
})