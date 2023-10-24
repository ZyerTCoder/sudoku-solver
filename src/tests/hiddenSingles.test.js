import { Sudoku } from "../scripts/sudoku"
import { expect, test } from "vitest"
import hiddenSingles from "../scripts/techniques/hiddenSingles"
import removeCandidatesSimple from "../scripts/techniques/removeCandidatesSimple"

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