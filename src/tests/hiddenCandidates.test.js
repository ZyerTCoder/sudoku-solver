import { Sudoku } from "../scripts/sudoku"
import { expect, test, beforeEach } from "vitest"
import hiddenCandidates from "../scripts/techniques/hiddenCandidates"

let sudoku

beforeEach(() => {
	sudoku = new Sudoku("999999999999999999999999999999999999999999999999999999999999999999999999999999999")
})

test("hiddenCandidates2: in row strict", () => {
	for (let col=5; col<7; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: false, 2: false, 3: false,
			4: false, 5: true, 6: true,
			7: true, 8: true, 9: true,
		})
	}
	for (let col=2; col<4; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: true, 2: true, 3: false,
			4: false, 5: true, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	
	let changes = hiddenCandidates(sudoku, 2)
	expect(changes).toStrictEqual([
		{"row":0,"col":2,"cand":5,"type":"rm","reason":"Hidden Pair 12 in row"},
		{"row":0,"col":3,"cand":5,"type":"rm","reason":"Hidden Pair 12 in row"},

		{"row":0,"col":2,"cand":1,"type":"yellow"},
		{"row":0,"col":2,"cand":2,"type":"yellow"},
		{"row":0,"col":3,"cand":1,"type":"yellow"},
		{"row":0,"col":3,"cand":2,"type":"yellow"},
	])
})

test("hiddenCandidates2: in col strict", () => {
	for (let row=5; row<7; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: false, 2: false, 3: false,
			4: false, 5: true, 6: true,
			7: true, 8: true, 9: true,
		})
	}
	for (let row=2; row<4; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: true, 2: true, 3: false,
			4: false, 5: true, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	
	let changes = hiddenCandidates(sudoku, 2)
	expect(changes).toStrictEqual([
		{"row":2,"col":0,"cand":5,"type":"rm","reason":"Hidden Pair 12 in col"},
		{"row":3,"col":0,"cand":5,"type":"rm","reason":"Hidden Pair 12 in col"},

		{"row":2,"col":0,"cand":1,"type":"yellow"},
		{"row":2,"col":0,"cand":2,"type":"yellow"},
		{"row":3,"col":0,"cand":1,"type":"yellow"},
		{"row":3,"col":0,"cand":2,"type":"yellow"},
	])
})

test("hiddenCandidates2: in box strict", () => {
	sudoku.testingSetCandidatesOnCell(2, 2, {
		1: false, 2: false, 3: false,
		4: false, 5: true, 6: true,
		7: true, 8: true, 9: true,
	})
	sudoku.testingSetCandidatesOnCell(0, 0, {
		1: true, 2: true, 3: false,
		4: false, 5: true, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(1, 1, {
		1: true, 2: true, 3: false,
		4: false, 5: true, 6: false,
		7: false, 8: false, 9: false,
	})
	
	let changes = hiddenCandidates(sudoku, 2)
	expect(changes).toStrictEqual([
		{"row":0,"col":0,"cand":5,"type":"rm","reason":"Hidden Pair 12 in box"},
		{"row":1,"col":1,"cand":5,"type":"rm","reason":"Hidden Pair 12 in box"},

		{"row":0,"col":0,"cand":1,"type":"yellow"},
		{"row":0,"col":0,"cand":2,"type":"yellow"},
		{"row":1,"col":1,"cand":1,"type":"yellow"},
		{"row":1,"col":1,"cand":2,"type":"yellow"},
	])
})

test("hiddenCandidates3: in row", () => {
	for (let col=0; col<9; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: false, 2: false, 3: false,
			4: false, 5: true, 6: true,
			7: true, 8: true, 9: true,
		})
	}
	for (let col=2; col<5; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: true, 2: true, 3: true,
			4: false, 5: true, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	
	let changes = hiddenCandidates(sudoku, 3)
	expect(changes).toStrictEqual([
		{"row":0,"col":2,"cand":5,"type":"rm","reason":"Hidden Trio 123 in row"},
		{"row":0,"col":3,"cand":5,"type":"rm","reason":"Hidden Trio 123 in row"},
		{"row":0,"col":4,"cand":5,"type":"rm","reason":"Hidden Trio 123 in row"},

		{"row":0,"col":2,"cand":1,"type":"yellow"},
		{"row":0,"col":2,"cand":2,"type":"yellow"},
		{"row":0,"col":2,"cand":3,"type":"yellow"},
		{"row":0,"col":3,"cand":1,"type":"yellow"},
		{"row":0,"col":3,"cand":2,"type":"yellow"},
		{"row":0,"col":3,"cand":3,"type":"yellow"},
		{"row":0,"col":4,"cand":1,"type":"yellow"},
		{"row":0,"col":4,"cand":2,"type":"yellow"},
		{"row":0,"col":4,"cand":3,"type":"yellow"},
	])
})

test("hiddenCandidates3: in col", () => {
	for (let row=0; row<9; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: false, 2: false, 3: false,
			4: false, 5: true, 6: true,
			7: true, 8: true, 9: true,
		})
	}
	for (let row=2; row<5; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: true, 2: true, 3: true,
			4: false, 5: true, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	
	let changes = hiddenCandidates(sudoku, 3)
	expect(changes).toStrictEqual([
		{"row":2,"col":0,"cand":5,"type":"rm","reason":"Hidden Trio 123 in col"},
		{"row":3,"col":0,"cand":5,"type":"rm","reason":"Hidden Trio 123 in col"},
		{"row":4,"col":0,"cand":5,"type":"rm","reason":"Hidden Trio 123 in col"},

		{"row":2,"col":0,"cand":1,"type":"yellow"},
		{"row":2,"col":0,"cand":2,"type":"yellow"},
		{"row":2,"col":0,"cand":3,"type":"yellow"},
		{"row":3,"col":0,"cand":1,"type":"yellow"},
		{"row":3,"col":0,"cand":2,"type":"yellow"},
		{"row":3,"col":0,"cand":3,"type":"yellow"},
		{"row":4,"col":0,"cand":1,"type":"yellow"},
		{"row":4,"col":0,"cand":2,"type":"yellow"},
		{"row":4,"col":0,"cand":3,"type":"yellow"},
	])
})

test("hiddenCandidates3: in box", () => {
	for (let row=0; row<3; row++) {
		for (let col=0; col<3; col++) {
			sudoku.testingSetCandidatesOnCell(row, col, {
				1: false, 2: false, 3: false,
				4: false, 5: true, 6: true,
				7: true, 8: true, 9: true,
			})
		}
	}
	sudoku.testingSetCandidatesOnCell(0, 0, {
		1: true, 2: true, 3: true,
		4: false, 5: true, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(1, 1, {
		1: true, 2: true, 3: true,
		4: false, 5: true, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(2, 2, {
		1: true, 2: true, 3: true,
		4: false, 5: true, 6: false,
		7: false, 8: false, 9: false,
	})
	
	let changes = hiddenCandidates(sudoku, 3)
	expect(changes).toStrictEqual([
		{"row":0,"col":0,"cand":5,"type":"rm","reason":"Hidden Trio 123 in box"},
		{"row":1,"col":1,"cand":5,"type":"rm","reason":"Hidden Trio 123 in box"},
		{"row":2,"col":2,"cand":5,"type":"rm","reason":"Hidden Trio 123 in box"},

		{"row":0,"col":0,"cand":1,"type":"yellow"},
		{"row":0,"col":0,"cand":2,"type":"yellow"},
		{"row":0,"col":0,"cand":3,"type":"yellow"},
		{"row":1,"col":1,"cand":1,"type":"yellow"},
		{"row":1,"col":1,"cand":2,"type":"yellow"},
		{"row":1,"col":1,"cand":3,"type":"yellow"},
		{"row":2,"col":2,"cand":1,"type":"yellow"},
		{"row":2,"col":2,"cand":2,"type":"yellow"},
		{"row":2,"col":2,"cand":3,"type":"yellow"},
	])
})

test("hiddenCandidates4: in row", () => {
	for (let col=0; col<9; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: false, 2: false, 3: false,
			4: false, 5: true, 6: true,
			7: true, 8: true, 9: true,
		})
	}
	for (let col=1; col<5; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: true, 2: true, 3: true,
			4: true, 5: true, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	
	let changes = hiddenCandidates(sudoku, 4)
	expect(changes).toStrictEqual([
		{"row":0,"col":1,"cand":5,"type":"rm","reason":"Hidden Quad 1234 in row"},
		{"row":0,"col":2,"cand":5,"type":"rm","reason":"Hidden Quad 1234 in row"},
		{"row":0,"col":3,"cand":5,"type":"rm","reason":"Hidden Quad 1234 in row"},
		{"row":0,"col":4,"cand":5,"type":"rm","reason":"Hidden Quad 1234 in row"},

		{"row":0,"col":1,"cand":1,"type":"yellow"},
		{"row":0,"col":1,"cand":2,"type":"yellow"},
		{"row":0,"col":1,"cand":3,"type":"yellow"},
		{"row":0,"col":1,"cand":4,"type":"yellow"},
		{"row":0,"col":2,"cand":1,"type":"yellow"},
		{"row":0,"col":2,"cand":2,"type":"yellow"},
		{"row":0,"col":2,"cand":3,"type":"yellow"},
		{"row":0,"col":2,"cand":4,"type":"yellow"},
		{"row":0,"col":3,"cand":1,"type":"yellow"},
		{"row":0,"col":3,"cand":2,"type":"yellow"},
		{"row":0,"col":3,"cand":3,"type":"yellow"},
		{"row":0,"col":3,"cand":4,"type":"yellow"},
		{"row":0,"col":4,"cand":1,"type":"yellow"},
		{"row":0,"col":4,"cand":2,"type":"yellow"},
		{"row":0,"col":4,"cand":3,"type":"yellow"},
		{"row":0,"col":4,"cand":4,"type":"yellow"},
	])
})

test("hiddenCandidates4: in col", () => {
	for (let row=0; row<9; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: false, 2: false, 3: false,
			4: false, 5: true, 6: true,
			7: true, 8: true, 9: true,
		})
	}
	for (let row=1; row<5; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: true, 2: true, 3: true,
			4: true, 5: true, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	
	let changes = hiddenCandidates(sudoku, 4)
	expect(changes).toStrictEqual([
		{"row":1,"col":0,"cand":5,"type":"rm","reason":"Hidden Quad 1234 in col"},
		{"row":2,"col":0,"cand":5,"type":"rm","reason":"Hidden Quad 1234 in col"},
		{"row":3,"col":0,"cand":5,"type":"rm","reason":"Hidden Quad 1234 in col"},
		{"row":4,"col":0,"cand":5,"type":"rm","reason":"Hidden Quad 1234 in col"},

		{"row":1,"col":0,"cand":1,"type":"yellow"},
		{"row":1,"col":0,"cand":2,"type":"yellow"},
		{"row":1,"col":0,"cand":3,"type":"yellow"},
		{"row":1,"col":0,"cand":4,"type":"yellow"},
		{"row":2,"col":0,"cand":1,"type":"yellow"},
		{"row":2,"col":0,"cand":2,"type":"yellow"},
		{"row":2,"col":0,"cand":3,"type":"yellow"},
		{"row":2,"col":0,"cand":4,"type":"yellow"},
		{"row":3,"col":0,"cand":1,"type":"yellow"},
		{"row":3,"col":0,"cand":2,"type":"yellow"},
		{"row":3,"col":0,"cand":3,"type":"yellow"},
		{"row":3,"col":0,"cand":4,"type":"yellow"},
		{"row":4,"col":0,"cand":1,"type":"yellow"},
		{"row":4,"col":0,"cand":2,"type":"yellow"},
		{"row":4,"col":0,"cand":3,"type":"yellow"},
		{"row":4,"col":0,"cand":4,"type":"yellow"},
	])
})

test("hiddenCandidates4: in box", () => {
	for (let row=0; row<3; row++) {
		for (let col=0; col<3; col++) {
			sudoku.testingSetCandidatesOnCell(row, col, {
				1: false, 2: false, 3: false,
				4: false, 5: true, 6: true,
				7: true, 8: true, 9: true,
			})
		}
	}
	sudoku.testingSetCandidatesOnCell(0, 0, {
		1: true, 2: true, 3: true,
		4: true, 5: true, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(1, 1, {
		1: true, 2: true, 3: true,
		4: true, 5: true, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(2, 2, {
		1: true, 2: true, 3: true,
		4: true, 5: true, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(0, 1, {
		1: true, 2: true, 3: true,
		4: true, 5: true, 6: false,
		7: false, 8: false, 9: false,
	})
	
	let changes = hiddenCandidates(sudoku, 4)
	expect(changes).toStrictEqual([
		{"row":0,"col":0,"cand":5,"type":"rm","reason":"Hidden Quad 1234 in box"},
		{"row":0,"col":1,"cand":5,"type":"rm","reason":"Hidden Quad 1234 in box"},
		{"row":1,"col":1,"cand":5,"type":"rm","reason":"Hidden Quad 1234 in box"},
		{"row":2,"col":2,"cand":5,"type":"rm","reason":"Hidden Quad 1234 in box"},

		{"row":0,"col":0,"cand":1,"type":"yellow"},
		{"row":0,"col":0,"cand":2,"type":"yellow"},
		{"row":0,"col":0,"cand":3,"type":"yellow"},
		{"row":0,"col":0,"cand":4,"type":"yellow"},
		{"row":0,"col":1,"cand":1,"type":"yellow"},
		{"row":0,"col":1,"cand":2,"type":"yellow"},
		{"row":0,"col":1,"cand":3,"type":"yellow"},
		{"row":0,"col":1,"cand":4,"type":"yellow"},
		{"row":1,"col":1,"cand":1,"type":"yellow"},
		{"row":1,"col":1,"cand":2,"type":"yellow"},
		{"row":1,"col":1,"cand":3,"type":"yellow"},
		{"row":1,"col":1,"cand":4,"type":"yellow"},
		{"row":2,"col":2,"cand":1,"type":"yellow"},
		{"row":2,"col":2,"cand":2,"type":"yellow"},
		{"row":2,"col":2,"cand":3,"type":"yellow"},
		{"row":2,"col":2,"cand":4,"type":"yellow"},
	])
})