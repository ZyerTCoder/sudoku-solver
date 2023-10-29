import { Sudoku } from "../scripts/sudoku"
import { expect, test, beforeEach } from "vitest"
import nakedCandidates from "../scripts/techniques/nakedCandidates"

let sudoku

beforeEach(() => {
	sudoku = new Sudoku("TEST_NO_CANDIDATES")
	for (let col=0; col<9; col++) {
		for (let row=0; row<9; row++) {
			sudoku.testingSetCandidatesOnCell(row, col, {
				1: false, 2: false, 3: false,
				4: false, 5: true, 6: true,
				7: true, 8: true, 9: true,
			})
		}
	}
})

test("nakedCandidates2: in row", () => {
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
	
	let changes = nakedCandidates(sudoku, 2)
	expect(changes).toStrictEqual([
		{"row":0,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},
		{"row":0,"col":1,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},
		{"row":0,"col":4,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},
		{"row":0,"col":5,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},
		{"row":0,"col":6,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},
		{"row":0,"col":7,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},
		{"row":0,"col":8,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},

		{"row":0,"col":2,"cand":1,"type":"yellow"},
		{"row":0,"col":2,"cand":2,"type":"yellow"},
		{"row":0,"col":3,"cand":1,"type":"yellow"},
		{"row":0,"col":3,"cand":2,"type":"yellow"},
	])
})

test("nakedCandidates2: in col", () => {
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

	let changes = nakedCandidates(sudoku, 2)
	expect(changes).toStrictEqual([
		{"row":0,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},
		{"row":1,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},
		{"row":4,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},
		{"row":5,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},
		{"row":6,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},
		{"row":7,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},
		{"row":8,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},
		
		{"row":2,"col":0,"cand":1,"type":"yellow"},
		{"row":2,"col":0,"cand":2,"type":"yellow"},
		{"row":3,"col":0,"cand":1,"type":"yellow"},
		{"row":3,"col":0,"cand":2,"type":"yellow"},
	])
})

test("nakedCandidates2: in box", () => {
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

	let changes = nakedCandidates(sudoku, 2)
	expect(changes).toStrictEqual([
		{"row":0,"col":1,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},
		{"row":0,"col":2,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},
		{"row":1,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},
		{"row":1,"col":2,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},
		{"row":2,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},
		{"row":2,"col":1,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},
		{"row":2,"col":2,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},

		{"row":0,"col":0,"cand":1,"type":"yellow"},
		{"row":0,"col":0,"cand":2,"type":"yellow"},
		{"row":1,"col":1,"cand":1,"type":"yellow"},
		{"row":1,"col":1,"cand":2,"type":"yellow"},
	])
})

test("nakedCandidates2: 2 pairs in same row", () => {
	for (let col=0; col<9; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: false, 2: true, 3: false,
			4: true, 5: true, 6: false,
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
	
	for (let col=5; col<7; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: false, 2: false, 3: true,
			4: true, 5: false, 6: false,
			7: false, 8: false, 9: false,
		})
	}

	let changes = nakedCandidates(sudoku, 2)
	expect(changes).toStrictEqual([
		{"row":0,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},
		{"row":0,"col":1,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},
		{"row":0,"col":4,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},
		{"row":0,"col":7,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},
		{"row":0,"col":8,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},

		{"row":0,"col":2,"cand":1,"type":"yellow"},
		{"row":0,"col":2,"cand":2,"type":"yellow"},
		{"row":0,"col":3,"cand":1,"type":"yellow"},
		{"row":0,"col":3,"cand":2,"type":"yellow"},

		{"row":0,"col":0,"cand":4,"type":"rm","reason":"Naked Pair 34 in row"},
		{"row":0,"col":1,"cand":4,"type":"rm","reason":"Naked Pair 34 in row"},
		{"row":0,"col":4,"cand":4,"type":"rm","reason":"Naked Pair 34 in row"},
		{"row":0,"col":7,"cand":4,"type":"rm","reason":"Naked Pair 34 in row"},
		{"row":0,"col":8,"cand":4,"type":"rm","reason":"Naked Pair 34 in row"},
		
		{"row":0,"col":5,"cand":3,"type":"yellow"},
		{"row":0,"col":5,"cand":4,"type":"yellow"},
		{"row":0,"col":6,"cand":3,"type":"yellow"},
		{"row":0,"col":6,"cand":4,"type":"yellow"},
	])
})

test("nakedCandidates2: 2 pairs in same col", () => {
	for (let row=0; row<9; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: false, 2: true, 3: false,
			4: true, 5: true, 6: false,
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
	
	for (let row=5; row<7; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: false, 2: false, 3: true,
			4: true, 5: false, 6: false,
			7: false, 8: false, 9: false,
		})
	}

	let changes = nakedCandidates(sudoku, 2)
	expect(changes).toStrictEqual([
		{"row":0,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},
		{"row":1,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},
		{"row":4,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},
		{"row":7,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},
		{"row":8,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},

		{"row":2,"col":0,"cand":1,"type":"yellow"},
		{"row":2,"col":0,"cand":2,"type":"yellow"},
		{"row":3,"col":0,"cand":1,"type":"yellow"},
		{"row":3,"col":0,"cand":2,"type":"yellow"},

		{"row":0,"col":0,"cand":4,"type":"rm","reason":"Naked Pair 34 in col"},
		{"row":1,"col":0,"cand":4,"type":"rm","reason":"Naked Pair 34 in col"},
		{"row":4,"col":0,"cand":4,"type":"rm","reason":"Naked Pair 34 in col"},
		{"row":7,"col":0,"cand":4,"type":"rm","reason":"Naked Pair 34 in col"},
		{"row":8,"col":0,"cand":4,"type":"rm","reason":"Naked Pair 34 in col"},
		
		{"row":5,"col":0,"cand":3,"type":"yellow"},
		{"row":5,"col":0,"cand":4,"type":"yellow"},
		{"row":6,"col":0,"cand":3,"type":"yellow"},
		{"row":6,"col":0,"cand":4,"type":"yellow"},
	])
})

test("nakedCandidates2: 2 pairs in same box", () => {
	for (let row=0; row<3; row++) {
		for (let col=0; col<3; col++) {
			sudoku.testingSetCandidatesOnCell(row, col, {
				1: false, 2: true, 3: false,
				4: true, 5: true, 6: false,
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
	sudoku.testingSetCandidatesOnCell(0, 1, {
		1: false, 2: false, 3: true,
		4: true, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(1, 2, {
		1: false, 2: false, 3: true,
		4: true, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})

	let changes = nakedCandidates(sudoku, 2)
	expect(changes).toStrictEqual([
		{"row":0,"col":2,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},
		{"row":1,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},
		{"row":2,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},
		{"row":2,"col":1,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},
		{"row":2,"col":2,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},

		{"row":0,"col":0,"cand":1,"type":"yellow"},
		{"row":0,"col":0,"cand":2,"type":"yellow"},
		{"row":1,"col":1,"cand":1,"type":"yellow"},
		{"row":1,"col":1,"cand":2,"type":"yellow"},

		{"row":0,"col":2,"cand":4,"type":"rm","reason":"Naked Pair 34 in box"},
		{"row":1,"col":0,"cand":4,"type":"rm","reason":"Naked Pair 34 in box"},
		{"row":2,"col":0,"cand":4,"type":"rm","reason":"Naked Pair 34 in box"},
		{"row":2,"col":1,"cand":4,"type":"rm","reason":"Naked Pair 34 in box"},
		{"row":2,"col":2,"cand":4,"type":"rm","reason":"Naked Pair 34 in box"},
		
		{"row":0,"col":1,"cand":3,"type":"yellow"},
		{"row":0,"col":1,"cand":4,"type":"yellow"},
		{"row":1,"col":2,"cand":3,"type":"yellow"},
		{"row":1,"col":2,"cand":4,"type":"yellow"},
	])
})

test("nakedCandidates2: 2 pairs in diff row/col (sqr) pointing at same cell", () => {
	sudoku.testingSetCandidatesOnCell(0, 0, {
		1: false, 2: true, 3: true,
		4: true, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	for (let row=2; row<4; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: true, 2: true, 3: false,
			4: false, 5: false, 6: false,
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

	let changes = nakedCandidates(sudoku, 2)
	expect(changes).toStrictEqual([
		{"row":0,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in row"},
		
		{"row":0,"col":2,"cand":1,"type":"yellow"},
		{"row":0,"col":2,"cand":2,"type":"yellow"},
		{"row":0,"col":3,"cand":1,"type":"yellow"},
		{"row":0,"col":3,"cand":2,"type":"yellow"},

		{"row":0,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in col"},
		
		{"row":2,"col":0,"cand":1,"type":"yellow"},
		{"row":2,"col":0,"cand":2,"type":"yellow"},
		{"row":3,"col":0,"cand":1,"type":"yellow"},
		{"row":3,"col":0,"cand":2,"type":"yellow"},

		{"row":0,"col":0,"cand":2,"type":"rm","reason":"Naked Pair 12 in box"},
	])
})

test("nakedCandidates3: in row", () => {
	for (let col=0; col<9; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: false, 2: false, 3: true,
			4: true, 5: false, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	for (let col=2; col<5; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: true, 2: true, 3: true,
			4: false, 5: false, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	
	let changes = nakedCandidates(sudoku, 3)
	expect(changes).toStrictEqual([
		{"row":0,"col":0,"cand":3,"type":"rm","reason":"Naked Trio 123 in row"},
		{"row":0,"col":1,"cand":3,"type":"rm","reason":"Naked Trio 123 in row"},
		{"row":0,"col":5,"cand":3,"type":"rm","reason":"Naked Trio 123 in row"},
		{"row":0,"col":6,"cand":3,"type":"rm","reason":"Naked Trio 123 in row"},
		{"row":0,"col":7,"cand":3,"type":"rm","reason":"Naked Trio 123 in row"},
		{"row":0,"col":8,"cand":3,"type":"rm","reason":"Naked Trio 123 in row"},

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

test("nakedCandidates3: in col", () => {
	for (let row=0; row<9; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: false, 2: false, 3: true,
			4: true, 5: false, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	for (let row=2; row<5; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: true, 2: true, 3: true,
			4: false, 5: false, 6: false,
			7: false, 8: false, 9: false,
		})
	}
	
	let changes = nakedCandidates(sudoku, 3)
	expect(changes).toStrictEqual([
		{"row":0,"col":0,"cand":3,"type":"rm","reason":"Naked Trio 123 in col"},
		{"row":1,"col":0,"cand":3,"type":"rm","reason":"Naked Trio 123 in col"},
		{"row":5,"col":0,"cand":3,"type":"rm","reason":"Naked Trio 123 in col"},
		{"row":6,"col":0,"cand":3,"type":"rm","reason":"Naked Trio 123 in col"},
		{"row":7,"col":0,"cand":3,"type":"rm","reason":"Naked Trio 123 in col"},
		{"row":8,"col":0,"cand":3,"type":"rm","reason":"Naked Trio 123 in col"},

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

test("nakedCandidates3: in box", () => {
	for (let row=0; row<3; row++) {
		for (let col=0; col<3; col++) {
			sudoku.testingSetCandidatesOnCell(row, col, {
				1: false, 2: false, 3: true,
				4: true, 5: false, 6: false,
				7: false, 8: false, 9: false,
			})
		}
	}
	sudoku.testingSetCandidatesOnCell(0, 0, {
		1: true, 2: true, 3: true,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(1, 1, {
		1: true, 2: true, 3: true,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(2, 2, {
		1: true, 2: true, 3: true,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	
	let changes = nakedCandidates(sudoku, 3)
	expect(changes).toStrictEqual([
		{"row":0,"col":1,"cand":3,"type":"rm","reason":"Naked Trio 123 in box"},
		{"row":0,"col":2,"cand":3,"type":"rm","reason":"Naked Trio 123 in box"},
		{"row":1,"col":0,"cand":3,"type":"rm","reason":"Naked Trio 123 in box"},
		{"row":1,"col":2,"cand":3,"type":"rm","reason":"Naked Trio 123 in box"},
		{"row":2,"col":0,"cand":3,"type":"rm","reason":"Naked Trio 123 in box"},
		{"row":2,"col":1,"cand":3,"type":"rm","reason":"Naked Trio 123 in box"},

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

test("nakedCandidates4: splits in row", () => {
	for (let col=4; col<9; col++) {
		sudoku.testingSetCandidatesOnCell(0, col, {
			1: false, 2: false, 3: false,
			4: true, 5: true, 6: true,
			7: true, 8: true, 9: true,
		})
	}
	sudoku.testingSetCandidatesOnCell(0, 0, {
		1: true, 2: true, 3: false,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(0, 1, {
		1: false, 2: true, 3: true,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(0, 2, {
		1: false, 2: false, 3: true,
		4: true, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(0, 3, {
		1: true, 2: false, 3: false,
		4: true, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})

	let changes = nakedCandidates(sudoku, 4)
	expect(changes).toStrictEqual([
		{"row":0,"col":4,"cand":4,"type":"rm","reason":"Naked Quad 1234 in row"},
		{"row":0,"col":5,"cand":4,"type":"rm","reason":"Naked Quad 1234 in row"},
		{"row":0,"col":6,"cand":4,"type":"rm","reason":"Naked Quad 1234 in row"},
		{"row":0,"col":7,"cand":4,"type":"rm","reason":"Naked Quad 1234 in row"},
		{"row":0,"col":8,"cand":4,"type":"rm","reason":"Naked Quad 1234 in row"},

		{"row":0,"col":0,"cand":1,"type":"yellow"},
		{"row":0,"col":0,"cand":2,"type":"yellow"},
		{"row":0,"col":1,"cand":2,"type":"yellow"},
		{"row":0,"col":1,"cand":3,"type":"yellow"},
		{"row":0,"col":2,"cand":3,"type":"yellow"},
		{"row":0,"col":2,"cand":4,"type":"yellow"},
		{"row":0,"col":3,"cand":1,"type":"yellow"},
		{"row":0,"col":3,"cand":4,"type":"yellow"},
	])
})

test("nakedCandidates4: splits in col", () => {
	for (let row=4; row<9; row++) {
		sudoku.testingSetCandidatesOnCell(row, 0, {
			1: false, 2: false, 3: false,
			4: true, 5: true, 6: true,
			7: true, 8: true, 9: true,
		})
	}
	sudoku.testingSetCandidatesOnCell(0, 0, {
		1: true, 2: true, 3: false,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(1, 0, {
		1: false, 2: true, 3: true,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(2, 0, {
		1: false, 2: false, 3: true,
		4: true, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(3, 0, {
		1: true, 2: false, 3: false,
		4: true, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})

	let changes = nakedCandidates(sudoku, 4)
	expect(changes).toStrictEqual([
		{"row":4,"col":0,"cand":4,"type":"rm","reason":"Naked Quad 1234 in col"},
		{"row":5,"col":0,"cand":4,"type":"rm","reason":"Naked Quad 1234 in col"},
		{"row":6,"col":0,"cand":4,"type":"rm","reason":"Naked Quad 1234 in col"},
		{"row":7,"col":0,"cand":4,"type":"rm","reason":"Naked Quad 1234 in col"},
		{"row":8,"col":0,"cand":4,"type":"rm","reason":"Naked Quad 1234 in col"},

		{"row":0,"col":0,"cand":1,"type":"yellow"},
		{"row":0,"col":0,"cand":2,"type":"yellow"},
		{"row":1,"col":0,"cand":2,"type":"yellow"},
		{"row":1,"col":0,"cand":3,"type":"yellow"},
		{"row":2,"col":0,"cand":3,"type":"yellow"},
		{"row":2,"col":0,"cand":4,"type":"yellow"},
		{"row":3,"col":0,"cand":1,"type":"yellow"},
		{"row":3,"col":0,"cand":4,"type":"yellow"},
	])
})

test("nakedCandidates4: splits in box", () => {
	for (let row=0; row<3; row++) {
		for (let col=0; col<3; col++) {
			sudoku.testingSetCandidatesOnCell(row, col, {
				1: false, 2: false, 3: false,
				4: true, 5: true, 6: true,
				7: true, 8: true, 9: true,
			})
		}
	}
	sudoku.testingSetCandidatesOnCell(0, 0, {
		1: true, 2: true, 3: false,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(0, 1, {
		1: false, 2: true, 3: true,
		4: false, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(2, 1, {
		1: false, 2: false, 3: true,
		4: true, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})
	sudoku.testingSetCandidatesOnCell(2, 2, {
		1: true, 2: false, 3: false,
		4: true, 5: false, 6: false,
		7: false, 8: false, 9: false,
	})

	let changes = nakedCandidates(sudoku, 4)
	expect(changes).toStrictEqual([
		{"row":0,"col":2,"cand":4,"type":"rm","reason":"Naked Quad 1234 in box"},
		{"row":1,"col":0,"cand":4,"type":"rm","reason":"Naked Quad 1234 in box"},
		{"row":1,"col":1,"cand":4,"type":"rm","reason":"Naked Quad 1234 in box"},
		{"row":1,"col":2,"cand":4,"type":"rm","reason":"Naked Quad 1234 in box"},
		{"row":2,"col":0,"cand":4,"type":"rm","reason":"Naked Quad 1234 in box"},

		{"row":0,"col":0,"cand":1,"type":"yellow"},
		{"row":0,"col":0,"cand":2,"type":"yellow"},
		{"row":0,"col":1,"cand":2,"type":"yellow"},
		{"row":0,"col":1,"cand":3,"type":"yellow"},
		{"row":2,"col":1,"cand":3,"type":"yellow"},
		{"row":2,"col":1,"cand":4,"type":"yellow"},
		{"row":2,"col":2,"cand":1,"type":"yellow"},
		{"row":2,"col":2,"cand":4,"type":"yellow"},
	])
})