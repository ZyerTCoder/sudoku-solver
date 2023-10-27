import { Sudoku } from "../scripts/sudoku"
import { expect, test } from "vitest"
import nakedPairs from "../scripts/techniques/nakedPairs"

test("nakedPairs: in row", () => {
	const sudoku = new Sudoku("TEST_NO_CANDIDATES")
	for (let col=0; col<9; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: false, 2: true, 3: true,
			4: true, 5: false, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	for (let col=2; col<4; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: true, 2: true, 3: false,
			4: false, 5: false, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	
	let changes = nakedPairs(sudoku)
	expect(changes).toStrictEqual([
		{"row":0,"col":0,"cand":2,"type":"rm","reason":"NakedPair 12 in row"},
		{"row":0,"col":1,"cand":2,"type":"rm","reason":"NakedPair 12 in row"},
		{"row":0,"col":4,"cand":2,"type":"rm","reason":"NakedPair 12 in row"},
		{"row":0,"col":5,"cand":2,"type":"rm","reason":"NakedPair 12 in row"},
		{"row":0,"col":6,"cand":2,"type":"rm","reason":"NakedPair 12 in row"},
		{"row":0,"col":7,"cand":2,"type":"rm","reason":"NakedPair 12 in row"},
		{"row":0,"col":8,"cand":2,"type":"rm","reason":"NakedPair 12 in row"},

		{"row":0,"col":2,"cand":1,"type":"yellow"},
		{"row":0,"col":2,"cand":2,"type":"yellow"},
		{"row":0,"col":3,"cand":1,"type":"yellow"},
		{"row":0,"col":3,"cand":2,"type":"yellow"},
	])
})

test("nakedPairs: in col", () => {
	const sudoku = new Sudoku("TEST_NO_CANDIDATES")
	for (let row=0; row<9; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: false, 2: true, 3: true,
			4: true, 5: false, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	for (let row=2; row<4; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: true, 2: true, 3: false,
			4: false, 5: false, 6: false,
			7: false, 8: false, 9: false,
		})
	}

	let changes = nakedPairs(sudoku)
	expect(changes).toStrictEqual([
		{"row":0,"col":0,"cand":2,"type":"rm","reason":"NakedPair 12 in col"},
		{"row":1,"col":0,"cand":2,"type":"rm","reason":"NakedPair 12 in col"},
		{"row":4,"col":0,"cand":2,"type":"rm","reason":"NakedPair 12 in col"},
		{"row":5,"col":0,"cand":2,"type":"rm","reason":"NakedPair 12 in col"},
		{"row":6,"col":0,"cand":2,"type":"rm","reason":"NakedPair 12 in col"},
		{"row":7,"col":0,"cand":2,"type":"rm","reason":"NakedPair 12 in col"},
		{"row":8,"col":0,"cand":2,"type":"rm","reason":"NakedPair 12 in col"},
		
		{"row":2,"col":0,"cand":1,"type":"yellow"},
		{"row":2,"col":0,"cand":2,"type":"yellow"},
		{"row":3,"col":0,"cand":1,"type":"yellow"},
		{"row":3,"col":0,"cand":2,"type":"yellow"},
	])
})

test("nakedPairs: in box", () => {
	const sudoku = new Sudoku("TEST_NO_CANDIDATES")
	for (let row=0; row<3; row++) {
		for (let col=0; col<3; col++) {
			sudoku.testingSetCandidatesOnCell(row, col, {
				1: false, 2: true, 3: true,
				4: true, 5: false, 6: false,
				7: false, 8: false, 9: false,
			})
		}
	}
	sudoku.testingSetCandidatesOnCell(0, 0, {
		1: true, 2: true, 3: false,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(1, 1, {
		1: true, 2: true, 3: false,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})

	let changes = nakedPairs(sudoku)
	expect(changes).toStrictEqual([
		{"row":0,"col":1,"cand":2,"type":"rm","reason":"NakedPair 12 in box"},
		{"row":0,"col":2,"cand":2,"type":"rm","reason":"NakedPair 12 in box"},
		{"row":1,"col":0,"cand":2,"type":"rm","reason":"NakedPair 12 in box"},
		{"row":1,"col":2,"cand":2,"type":"rm","reason":"NakedPair 12 in box"},
		{"row":2,"col":0,"cand":2,"type":"rm","reason":"NakedPair 12 in box"},
		{"row":2,"col":1,"cand":2,"type":"rm","reason":"NakedPair 12 in box"},
		{"row":2,"col":2,"cand":2,"type":"rm","reason":"NakedPair 12 in box"},

		{"row":0,"col":0,"cand":1,"type":"yellow"},
		{"row":0,"col":0,"cand":2,"type":"yellow"},
		{"row":1,"col":1,"cand":1,"type":"yellow"},
		{"row":1,"col":1,"cand":2,"type":"yellow"},
	])
})

test.todo("nakedPairs: adjacent pair in same row triggers both row and box", () => {
	const sudoku = new Sudoku("TEST_NO_CANDIDATES")
	for (let col=0; col<2; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: true, 2: true, 3: false,
			4: false, 5: false, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	sudoku.testingSetCandidatesOnCell(0, 2, {
		1: false, 2: true, 3: true,
		4: true, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})

	let changes = nakedPairs(sudoku)
	expect(changes).toStrictEqual([
		{"row":0,"col":2,"cand":2,"type":"rm","reason":"NakedPair 12 in row"},
		
		{"row":0,"col":0,"cand":1,"type":"yellow"},
		{"row":0,"col":0,"cand":2,"type":"yellow"},
		{"row":0,"col":1,"cand":1,"type":"yellow"},
		{"row":0,"col":1,"cand":2,"type":"yellow"},
		
		// this passes with this config but imo it should return instead just a
		// single type:rm with reason:nakedPair 12 in row box
		{"row":0,"col":2,"cand":2,"type":"rm","reason":"NakedPair 12 in box"},
	])
})

test.todo("nakedPairs: 2 pairs in same row", () => {})
test.todo("nakedPairs: 2 pairs in same col", () => {})
test.todo("nakedPairs: 2 pairs in same box", () => {})
test.todo("nakedPairs: 2 pairs in diff row/col pointing at same cell", () => {})