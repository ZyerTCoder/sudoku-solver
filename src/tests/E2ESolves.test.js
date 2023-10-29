import exampleSudokus from "../scripts/exampleSudokus"
import { Sudoku } from "../scripts/sudoku"
import { expect, test } from "vitest"

const IterationCap = 1000

test("E2E: Easy board", () => {
	const sudoku = new Sudoku(exampleSudokus["Easy"])
	let result
	let iterations = 0
	do {
		result = sudoku.next()
		iterations++
	} while (result != "no tech" && result != "invalid" && result && iterations < IterationCap)
	expect(iterations).toBeLessThan(IterationCap)
	expect(result).toBe(0)
})

test("E2E: Invalid board", () => {
	const sudoku = new Sudoku(exampleSudokus["Invalid Board"])
	let result
	let iterations = 0
	do {
		result = sudoku.next()
		iterations++
		if (result === "invalid") { break }
	} while (result && iterations < IterationCap)
	expect(result).toBe("invalid")
	expect(iterations).toBeLessThan(IterationCap)
})

test("E2E: Hidden Singles", () => {
	const sudoku = new Sudoku(exampleSudokus["Hidden Singles"])
	let result
	let iterations = 0
	do {
		result = sudoku.next()
		iterations++
	} while (result != "no tech" && result != "invalid" && result && iterations < IterationCap)
	expect(iterations).toBeLessThan(IterationCap)
	expect(result).toBe(0)
})

test("E2E: Naked Pairs", () => {
	const sudoku = new Sudoku(exampleSudokus["Naked Pairs"])
	let result
	let iterations = 0
	do {
		result = sudoku.next()
		iterations++
	} while (result != "no tech" && result != "invalid" && result && iterations < IterationCap)
	expect(iterations).toBeLessThan(IterationCap)
	expect(result).toBe(0)
})

test("E2E: Naked Pairs 2", () => {
	const sudoku = new Sudoku(exampleSudokus["Naked Pairs 2"])
	let result
	let iterations = 0
	do {
		result = sudoku.next()
		iterations++
	} while (result != "no tech" && result != "invalid" && result && iterations < IterationCap)
	expect(iterations).toBeLessThan(IterationCap)
	expect(result).toBe(0)
})

test("E2E: Naked Pairs 3", () => {
	const sudoku = new Sudoku(exampleSudokus["Naked Pairs 3"])
	let result
	let iterations = 0
	do {
		result = sudoku.next()
		iterations++
	} while (result != "no tech" && result != "invalid" && result && iterations < IterationCap)
	expect(iterations).toBeLessThan(IterationCap)
	expect(result).toBe(0)
})

test("E2E: Naked/Hidden Triples", () => {
	const sudoku = new Sudoku(exampleSudokus["Naked/Hidden Triples"])
	let result
	let iterations = 0
	do {
		result = sudoku.next()
		iterations++
	} while (result != "no tech" && result != "invalid" && result && iterations < IterationCap)
	expect(iterations).toBeLessThan(IterationCap)
	expect(result).toBe(0)
})

test("E2E: 2 Solutions", () => {
	const sudoku = new Sudoku(exampleSudokus["2 Solutions"])
	let result
	let iterations = 0
	do {
		result = sudoku.next()
		iterations++
		if (result === "no tech") { break }
	} while (result && iterations < IterationCap)
	expect(iterations).toBeLessThan(IterationCap)
	expect(result).toBe("no tech")
})
