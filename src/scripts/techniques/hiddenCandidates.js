import { SetOfDicts, combinations } from "../sudoku"

let floor = Math.floor

const num_to_str = {
	2: "Pair",
	3: "Trio",
	4: "Quad",
}

export default function hiddenCandidates(board, number) {
	// pick n cells in a row/col/box
	// check union of candidates of cells in group vs cells outside group (pair vs the rest of the row)
	// if those cells contain a pair/triple/n candidates that are NOT present in the rest of the row at all
	// then youve found a hidden set and the rest of the candidates can be removed from the hidden set

	let out = new SetOfDicts()

	for (let row=0; row<9; row++) {
		// indices of each empty cell in row
		let indices = []
		for (let col=0; col<9; col++) {
			if (board.isCellUnsolved(row, col)) { indices.push(col) }
		}

		for (let comb of combinations(indices, number)) {
			// get shared candidates between this set
			let candsInside = {
				1: false, 2: false, 3: false,
				4: false, 5: false, 6: false,
				7: false, 8: false, 9: false,
			}
			for (let col of comb) {
				for (let [cand, value] of Object.entries(board.board[row][col])) {
					if (value) {
						candsInside[cand] = true
					}
				}
			}

			// get candidates outside this set
			let candsOutside = {
				1: false, 2: false, 3: false,
				4: false, 5: false, 6: false,
				7: false, 8: false, 9: false,
			}
			for (let col of indices) {
				if (comb.includes(col)) { continue }
				for (let [cand, value] of Object.entries(board.board[row][col])) {
					if (value) {
						candsOutside[cand] = true
					}
				}
			}

			// if those cells contain a pair/triple/n candidates that are NOT present in the rest of the row at all
			let hiddenSet = []
			for (let cand in candsInside) {
				if (candsInside[cand] && !candsOutside[cand]) {
					hiddenSet.push(cand)
				}
			}
			
			// youve found a hidden set and the rest of the candidates can be removed from the hidden set
			let highlight_flag = false
			if (hiddenSet.length === number) {
				let candidatesToRemove = []
				for (let cand in candsInside) {
					if (candsInside[cand] && !hiddenSet.includes(cand)) {
						candidatesToRemove.push(Number(cand))
					}
				}
				for (let col of comb) {
					for (let cand of candidatesToRemove) {
						if (board.board[row][col][cand]) {
							highlight_flag = [comb, hiddenSet]
							out.add({
								row:row, col:col, cand:cand, type:"rm", 
								reason:`Hidden ${num_to_str[number]} ${hiddenSet.join("")} in row`
							})
						} 	
					}
				}
			}

			if (highlight_flag) {
				for (let col of highlight_flag[0]) {
					let cands = board.board[row][col]
					for (let [cand, value] of Object.entries(cands)) {
						if (value && hiddenSet.includes(cand)) {
							out.add({row:row, col:col, cand:Number(cand), type:"yellow"})
						}
					}
				}
			}
		}
	}

	for (let col=0; col<9; col++) {
		let indices = []
		for (let row=0; row<9; row++) {
			if (board.isCellUnsolved(row, col)) { indices.push(row) }
		}

		for (let comb of combinations(indices, number)) {
			let candsInside = {
				1: false, 2: false, 3: false,
				4: false, 5: false, 6: false,
				7: false, 8: false, 9: false,
			}
			for (let row of comb) {
				for (let [cand, value] of Object.entries(board.board[row][col])) {
					if (value) {
						candsInside[cand] = true
					}
				}
			}

			let candsOutside = {
				1: false, 2: false, 3: false,
				4: false, 5: false, 6: false,
				7: false, 8: false, 9: false,
			}
			for (let row of indices) {
				if (comb.includes(row)) { continue }
				for (let [cand, value] of Object.entries(board.board[row][col])) {
					if (value) {
						candsOutside[cand] = true
					}
				}
			}

			let hiddenSet = []
			for (let cand in candsInside) {
				if (candsInside[cand] && !candsOutside[cand]) {
					hiddenSet.push(cand)
				}
			}
			
			let highlight_flag = false
			if (hiddenSet.length === number) {
				let candidatesToRemove = []
				for (let cand in candsInside) {
					if (candsInside[cand] && !hiddenSet.includes(cand)) {
						candidatesToRemove.push(Number(cand))
					}
				}
				
				for (let row of comb) {
					for (let cand of candidatesToRemove) {
						if (board.board[row][col][cand]) {
							highlight_flag = [comb, hiddenSet]
							out.add({
								row:row, col:col, cand:cand, type:"rm", 
								reason:`Hidden ${num_to_str[number]} ${hiddenSet.join("")} in col`
							})
						} 	
					}
				}
			}

			if (highlight_flag) {
				for (let row of highlight_flag[0]) {
					let cands = board.board[row][col]
					for (let [cand, value] of Object.entries(cands)) {
						if (value && hiddenSet.includes(cand)) {
							out.add({row:row, col:col, cand:Number(cand), type:"yellow"})
						}
					}
				}
			}
		}
	}
	
	for (let box=0; box<1; box++) {
		let x = floor(box/3)
		let y = floor(box%3)

		let cell_sets = []
		for (let row=x*3; row<x*3+3; row++) {
			for (let col=y*3; col<y*3+3; col++) {
				if (board.isCellUnsolved(row, col)) { cell_sets.push(String(row) + col) }
			}
		}

		for (let comb of combinations(cell_sets, number)) {
			let candsInside = {
				1: false, 2: false, 3: false,
				4: false, 5: false, 6: false,
				7: false, 8: false, 9: false,
			}
			for (let cell of comb) {
				for (let [cand, value] of Object.entries(board.board[cell[0]][cell[1]])) {
					if (value) {
						candsInside[cand] = true
					}
				}
			}

			let candsOutside = {
				1: false, 2: false, 3: false,
				4: false, 5: false, 6: false,
				7: false, 8: false, 9: false,
			}
			for (let cell of cell_sets) {
				if (comb.includes(cell)) { continue }
				for (let [cand, value] of Object.entries(board.board[cell[0]][cell[1]])) {
					if (value) {
						candsOutside[cand] = true
					}
				}
			}

			let hiddenSet = []
			for (let cand in candsInside) {
				if (candsInside[cand] && !candsOutside[cand]) {
					hiddenSet.push(cand)
				}
			}
			
			let highlight_flag = false
			if (hiddenSet.length === number) {
				let candidatesToRemove = []
				for (let cand in candsInside) {
					if (candsInside[cand] && !hiddenSet.includes(cand)) {
						candidatesToRemove.push(Number(cand))
					}
				}

				for (let cell of comb) {
					for (let cand of candidatesToRemove) {
						if (board.board[cell[0]][cell[1]][cand]) {
							highlight_flag = [comb, hiddenSet]
							console.log(hiddenSet)
							out.add({
								row:Number(cell[0]), col:Number(cell[1]), cand:cand, type:"rm", 
								reason:`Hidden ${num_to_str[number]} ${hiddenSet.join("")} in box`
							})
						} 	
					}
				}
			}

			if (highlight_flag) {
				for (let comb of highlight_flag[0]) {
					let cands = board.board[comb[0]][comb[1]]
					for (let [cand, value] of Object.entries(cands)) {
						if (value && hiddenSet.includes(cand)) {
							out.add({row:Number(comb[0]), col:Number(comb[1]), cand:Number(cand), type:"yellow"})
						}
					}
				}
			}
		}
	}

	return out.dicts_array
}