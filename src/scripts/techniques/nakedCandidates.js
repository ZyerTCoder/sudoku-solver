import { SetOfDicts, combinations } from "../sudoku"

let floor = Math.floor

const num_to_str = {
	2: "Pair",
	3: "Trio",
	4: "Quad",
}

export default function nakedCandidates(board, number) {
	// console.log("called with", board, number)
	// pick n cells in a row/col/box
	// if those cells collectively (union) contain n candidates then they form a naked set
	// and their candidates can be removed from the rest of the cells in the same row/col/box

	let out = new SetOfDicts()

	for (let row=0; row<9; row++) {
		// indices of each empty cell in row
		let indices = []
		for (let col=0; col<9; col++) {
			if (board.isCellUnsolved(row, col)) { indices.push(col) }
		}
		
		for (let cols of combinations(indices, number)) {
			// get shared candidates between that set
			let cands = {
				1: false, 2: false, 3: false,
				4: false, 5: false, 6: false,
				7: false, 8: false, 9: false,
			}
			for (let col of cols) {
				for (let [cand, value] of Object.entries(board.board[row][col])) {
					if (value) {
						cands[cand] = true
					}
				}
			}

			// if they form a naked set
			let highlight_flag = false
			let num_of_cands = Object.values(cands).reduce((acc, val) => acc + val)
			if (num_of_cands === number) {
				for (let col=0; col<9; col++) {
					if (!cols.includes(col) && board.isCellUnsolved(row, col)) {
						for (let [cand, value] of Object.entries(cands)) {
							if (value && board.board[row][col][cand]) {
								highlight_flag = [cols, cands]
								out.add({
									row:row, col:col, cand:Number(cand), type:"rm", 
									reason:`Naked ${num_to_str[number]} ${Object.keys(cands).reduce((acc, cand) => acc + (cands[cand] ? cand : ""), "")} in row`
								})
							} 
						}		
					}
				}
			}

			if (highlight_flag) {
				for (let col of highlight_flag[0]) {
					let cands = board.board[row][col]
					for (let [cand, value] of Object.entries(cands)) {
						if (value) {
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
		
		for (let rows of combinations(indices, number)) {
			let cands = {
				1: false, 2: false, 3: false,
				4: false, 5: false, 6: false,
				7: false, 8: false, 9: false,
			}
			for (let row of rows) {
				for (let [cand, value] of Object.entries(board.board[row][col])) {
					if (value) {
						cands[cand] = true
					}
				}
			}

			let highlight_flag = false
			let num_of_cands = Object.values(cands).reduce((acc, val) => acc + val)
			if (num_of_cands === number) {
				for (let row=0; row<9; row++) {
					if (!rows.includes(row) && board.isCellUnsolved(row, col)) {
						for (let [cand, value] of Object.entries(cands)) {
							if (value && board.board[row][col][cand]) {
								highlight_flag = [rows, cands]
								out.add({
									row:row, col:col, cand:Number(cand), type:"rm", 
									reason:`Naked ${num_to_str[number]} ${Object.keys(cands).reduce((acc, cand) => acc + (cands[cand] ? cand : ""), "")} in col`
								})
							} 
						}		
					}
				}
			}

			if (highlight_flag) {
				for (let row of highlight_flag[0]) {
					let cands = board.board[row][col]
					for (let [cand, value] of Object.entries(cands)) {
						if (value) {
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

		for (let cells of combinations(cell_sets, number)) {
			let cands = {
				1: false, 2: false, 3: false,
				4: false, 5: false, 6: false,
				7: false, 8: false, 9: false,
			}
			for (let cell of cells) {
				for (let [cand, value] of Object.entries(board.board[cell[0]][cell[1]])) {
					if (value) {
						cands[cand] = true
					}
				}
			}

			let highlight_flag = false
			let num_of_cands = Object.values(cands).reduce((acc, val) => acc + val)
			if (num_of_cands === number) {
				for (let row=x*3; row<x*3+3; row++) {
					for (let col=y*3; col<y*3+3; col++) {
						if (!cells.includes(String(row) + col) && board.isCellUnsolved(row, col)) {
							for (let [cand, value] of Object.entries(cands)) {
								if (value && board.board[row][col][cand]) {
									highlight_flag = [cells, cands]
									out.add({
										row:row, col:col, cand:Number(cand), type:"rm", 
										reason:`Naked ${num_to_str[number]} ${Object.keys(cands).reduce((acc, cand) => acc + (cands[cand] ? cand : ""), "")} in box`
									})
								} 
							}		
						}
					}
				}
			}

			if (highlight_flag) {
				for (let cell of highlight_flag[0]) {
					let cands = board.board[cell[0]][cell[1]]
					for (let [cand, value] of Object.entries(cands)) {
						if (value) {
							out.add({row:Number(cell[0]), col:Number(cell[1]), cand:Number(cand), type:"yellow"})
						}
					}
				}
			}
		}
	}

	// console.log(out.dicts_array)
	return out.dicts_array
}