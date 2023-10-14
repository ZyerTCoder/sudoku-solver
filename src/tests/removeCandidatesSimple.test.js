import { Sudoku } from "../scripts/sudoku"
import { expect, test } from "vitest"

test("1 cell top left box", () => {
	const sudoku = new Sudoku("1................................................................................")
	let arr = sudoku.removeCandidatesSimple()
	expect(arr.length).toBe(20)
	arr = JSON.stringify(arr)
	expect(arr).toBe(`[{"row":0,"col":1,"cand":1,"type":"rm"},{"row":0,"col":2,"cand":1,"type":"rm"},{"row":0,"col":3,"cand":1,"type":"rm"},{"row":0,"col":4,"cand":1,"type":"rm"},{"row":0,"col":5,"cand":1,"type":"rm"},{"row":0,"col":6,"cand":1,"type":"rm"},{"row":0,"col":7,"cand":1,"type":"rm"},{"row":0,"col":8,"cand":1,"type":"rm"},{"row":1,"col":0,"cand":1,"type":"rm"},{"row":1,"col":1,"cand":1,"type":"rm"},{"row":1,"col":2,"cand":1,"type":"rm"},{"row":2,"col":0,"cand":1,"type":"rm"},{"row":2,"col":1,"cand":1,"type":"rm"},{"row":2,"col":2,"cand":1,"type":"rm"},{"row":3,"col":0,"cand":1,"type":"rm"},{"row":4,"col":0,"cand":1,"type":"rm"},{"row":5,"col":0,"cand":1,"type":"rm"},{"row":6,"col":0,"cand":1,"type":"rm"},{"row":7,"col":0,"cand":1,"type":"rm"},{"row":8,"col":0,"cand":1,"type":"rm"}]`)
})

test("1 cell top box", () => {
	const sudoku = new Sudoku("....2............................................................................")
	let arr = sudoku.removeCandidatesSimple()
	expect(arr.length).toBe(20)
	arr = JSON.stringify(arr)
	expect(arr).toBe(`[{"row":0,"col":0,"cand":2,"type":"rm"},{"row":0,"col":1,"cand":2,"type":"rm"},{"row":0,"col":2,"cand":2,"type":"rm"},{"row":0,"col":3,"cand":2,"type":"rm"},{"row":0,"col":5,"cand":2,"type":"rm"},{"row":0,"col":6,"cand":2,"type":"rm"},{"row":0,"col":7,"cand":2,"type":"rm"},{"row":0,"col":8,"cand":2,"type":"rm"},{"row":1,"col":3,"cand":2,"type":"rm"},{"row":1,"col":4,"cand":2,"type":"rm"},{"row":1,"col":5,"cand":2,"type":"rm"},{"row":2,"col":3,"cand":2,"type":"rm"},{"row":2,"col":4,"cand":2,"type":"rm"},{"row":2,"col":5,"cand":2,"type":"rm"},{"row":3,"col":4,"cand":2,"type":"rm"},{"row":4,"col":4,"cand":2,"type":"rm"},{"row":5,"col":4,"cand":2,"type":"rm"},{"row":6,"col":4,"cand":2,"type":"rm"},{"row":7,"col":4,"cand":2,"type":"rm"},{"row":8,"col":4,"cand":2,"type":"rm"}]`)
})

test("1 cell top right box", () => {
	const sudoku = new Sudoku("........3........................................................................")
	let arr = sudoku.removeCandidatesSimple()
	expect(arr.length).toBe(20)
	arr = JSON.stringify(arr)
	expect(arr).toBe(`[{"row":0,"col":0,"cand":3,"type":"rm"},{"row":0,"col":1,"cand":3,"type":"rm"},{"row":0,"col":2,"cand":3,"type":"rm"},{"row":0,"col":3,"cand":3,"type":"rm"},{"row":0,"col":4,"cand":3,"type":"rm"},{"row":0,"col":5,"cand":3,"type":"rm"},{"row":0,"col":6,"cand":3,"type":"rm"},{"row":0,"col":7,"cand":3,"type":"rm"},{"row":1,"col":6,"cand":3,"type":"rm"},{"row":1,"col":7,"cand":3,"type":"rm"},{"row":1,"col":8,"cand":3,"type":"rm"},{"row":2,"col":6,"cand":3,"type":"rm"},{"row":2,"col":7,"cand":3,"type":"rm"},{"row":2,"col":8,"cand":3,"type":"rm"},{"row":3,"col":8,"cand":3,"type":"rm"},{"row":4,"col":8,"cand":3,"type":"rm"},{"row":5,"col":8,"cand":3,"type":"rm"},{"row":6,"col":8,"cand":3,"type":"rm"},{"row":7,"col":8,"cand":3,"type":"rm"},{"row":8,"col":8,"cand":3,"type":"rm"}]`)
})

test("1 cell left box", () => {
	const sudoku = new Sudoku("....................................4............................................")
	let arr = sudoku.removeCandidatesSimple()
	expect(arr.length).toBe(20)
	arr = JSON.stringify(arr)
	expect(arr).toBe(`[{"row":0,"col":0,"cand":4,"type":"rm"},{"row":1,"col":0,"cand":4,"type":"rm"},{"row":2,"col":0,"cand":4,"type":"rm"},{"row":3,"col":0,"cand":4,"type":"rm"},{"row":3,"col":1,"cand":4,"type":"rm"},{"row":3,"col":2,"cand":4,"type":"rm"},{"row":4,"col":1,"cand":4,"type":"rm"},{"row":4,"col":2,"cand":4,"type":"rm"},{"row":4,"col":3,"cand":4,"type":"rm"},{"row":4,"col":4,"cand":4,"type":"rm"},{"row":4,"col":5,"cand":4,"type":"rm"},{"row":4,"col":6,"cand":4,"type":"rm"},{"row":4,"col":7,"cand":4,"type":"rm"},{"row":4,"col":8,"cand":4,"type":"rm"},{"row":5,"col":0,"cand":4,"type":"rm"},{"row":5,"col":1,"cand":4,"type":"rm"},{"row":5,"col":2,"cand":4,"type":"rm"},{"row":6,"col":0,"cand":4,"type":"rm"},{"row":7,"col":0,"cand":4,"type":"rm"},{"row":8,"col":0,"cand":4,"type":"rm"}]`)
})

test("1 cell center box", () => {
	const sudoku = new Sudoku("........................................5........................................")
	let arr = sudoku.removeCandidatesSimple()
	expect(arr.length).toBe(20)
	arr = JSON.stringify(arr)
	expect(arr).toBe(`[{"row":0,"col":4,"cand":5,"type":"rm"},{"row":1,"col":4,"cand":5,"type":"rm"},{"row":2,"col":4,"cand":5,"type":"rm"},{"row":3,"col":3,"cand":5,"type":"rm"},{"row":3,"col":4,"cand":5,"type":"rm"},{"row":3,"col":5,"cand":5,"type":"rm"},{"row":4,"col":0,"cand":5,"type":"rm"},{"row":4,"col":1,"cand":5,"type":"rm"},{"row":4,"col":2,"cand":5,"type":"rm"},{"row":4,"col":3,"cand":5,"type":"rm"},{"row":4,"col":5,"cand":5,"type":"rm"},{"row":4,"col":6,"cand":5,"type":"rm"},{"row":4,"col":7,"cand":5,"type":"rm"},{"row":4,"col":8,"cand":5,"type":"rm"},{"row":5,"col":3,"cand":5,"type":"rm"},{"row":5,"col":4,"cand":5,"type":"rm"},{"row":5,"col":5,"cand":5,"type":"rm"},{"row":6,"col":4,"cand":5,"type":"rm"},{"row":7,"col":4,"cand":5,"type":"rm"},{"row":8,"col":4,"cand":5,"type":"rm"}]`)
})

test("1 cell right box", () => {
	const sudoku = new Sudoku("............................................6....................................")
	let arr = sudoku.removeCandidatesSimple()
	expect(arr.length).toBe(20)
	arr = JSON.stringify(arr)
	expect(arr).toBe(`[{"row":0,"col":8,"cand":6,"type":"rm"},{"row":1,"col":8,"cand":6,"type":"rm"},{"row":2,"col":8,"cand":6,"type":"rm"},{"row":3,"col":6,"cand":6,"type":"rm"},{"row":3,"col":7,"cand":6,"type":"rm"},{"row":3,"col":8,"cand":6,"type":"rm"},{"row":4,"col":0,"cand":6,"type":"rm"},{"row":4,"col":1,"cand":6,"type":"rm"},{"row":4,"col":2,"cand":6,"type":"rm"},{"row":4,"col":3,"cand":6,"type":"rm"},{"row":4,"col":4,"cand":6,"type":"rm"},{"row":4,"col":5,"cand":6,"type":"rm"},{"row":4,"col":6,"cand":6,"type":"rm"},{"row":4,"col":7,"cand":6,"type":"rm"},{"row":5,"col":6,"cand":6,"type":"rm"},{"row":5,"col":7,"cand":6,"type":"rm"},{"row":5,"col":8,"cand":6,"type":"rm"},{"row":6,"col":8,"cand":6,"type":"rm"},{"row":7,"col":8,"cand":6,"type":"rm"},{"row":8,"col":8,"cand":6,"type":"rm"}]`)
})

test("1 cell bottom left box", () => {
	const sudoku = new Sudoku("........................................................................7........")
	let arr = sudoku.removeCandidatesSimple()
	expect(arr.length).toBe(20)
	arr = JSON.stringify(arr)
	expect(arr).toBe(`[{"row":0,"col":0,"cand":7,"type":"rm"},{"row":1,"col":0,"cand":7,"type":"rm"},{"row":2,"col":0,"cand":7,"type":"rm"},{"row":3,"col":0,"cand":7,"type":"rm"},{"row":4,"col":0,"cand":7,"type":"rm"},{"row":5,"col":0,"cand":7,"type":"rm"},{"row":6,"col":0,"cand":7,"type":"rm"},{"row":6,"col":1,"cand":7,"type":"rm"},{"row":6,"col":2,"cand":7,"type":"rm"},{"row":7,"col":0,"cand":7,"type":"rm"},{"row":7,"col":1,"cand":7,"type":"rm"},{"row":7,"col":2,"cand":7,"type":"rm"},{"row":8,"col":1,"cand":7,"type":"rm"},{"row":8,"col":2,"cand":7,"type":"rm"},{"row":8,"col":3,"cand":7,"type":"rm"},{"row":8,"col":4,"cand":7,"type":"rm"},{"row":8,"col":5,"cand":7,"type":"rm"},{"row":8,"col":6,"cand":7,"type":"rm"},{"row":8,"col":7,"cand":7,"type":"rm"},{"row":8,"col":8,"cand":7,"type":"rm"}]`)
})

test("1 cell bottom box", () => {
	const sudoku = new Sudoku("............................................................................8....")
	let arr = sudoku.removeCandidatesSimple()
	expect(arr.length).toBe(20)
	arr = JSON.stringify(arr)
	expect(arr).toBe(`[{"row":0,"col":4,"cand":8,"type":"rm"},{"row":1,"col":4,"cand":8,"type":"rm"},{"row":2,"col":4,"cand":8,"type":"rm"},{"row":3,"col":4,"cand":8,"type":"rm"},{"row":4,"col":4,"cand":8,"type":"rm"},{"row":5,"col":4,"cand":8,"type":"rm"},{"row":6,"col":3,"cand":8,"type":"rm"},{"row":6,"col":4,"cand":8,"type":"rm"},{"row":6,"col":5,"cand":8,"type":"rm"},{"row":7,"col":3,"cand":8,"type":"rm"},{"row":7,"col":4,"cand":8,"type":"rm"},{"row":7,"col":5,"cand":8,"type":"rm"},{"row":8,"col":0,"cand":8,"type":"rm"},{"row":8,"col":1,"cand":8,"type":"rm"},{"row":8,"col":2,"cand":8,"type":"rm"},{"row":8,"col":3,"cand":8,"type":"rm"},{"row":8,"col":5,"cand":8,"type":"rm"},{"row":8,"col":6,"cand":8,"type":"rm"},{"row":8,"col":7,"cand":8,"type":"rm"},{"row":8,"col":8,"cand":8,"type":"rm"}]`)
})

test("1 cell bottom right box", () => {
	const sudoku = new Sudoku("................................................................................9")
	let arr = sudoku.removeCandidatesSimple()
	expect(arr.length).toBe(20)
	arr = JSON.stringify(arr)
	expect(arr).toBe(`[{"row":0,"col":8,"cand":9,"type":"rm"},{"row":1,"col":8,"cand":9,"type":"rm"},{"row":2,"col":8,"cand":9,"type":"rm"},{"row":3,"col":8,"cand":9,"type":"rm"},{"row":4,"col":8,"cand":9,"type":"rm"},{"row":5,"col":8,"cand":9,"type":"rm"},{"row":6,"col":6,"cand":9,"type":"rm"},{"row":6,"col":7,"cand":9,"type":"rm"},{"row":6,"col":8,"cand":9,"type":"rm"},{"row":7,"col":6,"cand":9,"type":"rm"},{"row":7,"col":7,"cand":9,"type":"rm"},{"row":7,"col":8,"cand":9,"type":"rm"},{"row":8,"col":0,"cand":9,"type":"rm"},{"row":8,"col":1,"cand":9,"type":"rm"},{"row":8,"col":2,"cand":9,"type":"rm"},{"row":8,"col":3,"cand":9,"type":"rm"},{"row":8,"col":4,"cand":9,"type":"rm"},{"row":8,"col":5,"cand":9,"type":"rm"},{"row":8,"col":6,"cand":9,"type":"rm"},{"row":8,"col":7,"cand":9,"type":"rm"}]`)
})

test("empty board returns empty", () => {
	const sudoku = new Sudoku(".................................................................................")
	let arr = JSON.stringify(sudoku.removeCandidatesSimple())
	expect(arr).toBe(`[]`)
})

test("solved board returns empty", () => {
	const sudoku = new Sudoku("246975138589316274371248695498621753132754986657839421724183569865492317913567842")
	let arr = JSON.stringify(sudoku.removeCandidatesSimple())
	expect(arr).toBe(`[]`)
})

test("board almost full of 1s only removes 1 candiate", () => {
	const sudoku = new Sudoku(".11111111111111111111111111111111111111111111111111111111111111111111111111111111")
	let arr = JSON.stringify(sudoku.removeCandidatesSimple())
	expect(arr).toBe(`[{"row":0,"col":0,"cand":1,"type":"rm"}]`)
})