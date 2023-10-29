import { SetOfDicts } from "../sudoku"

let floor = Math.floor

export default function removeCandidatesSimple(board) {
	let out = new SetOfDicts()

	for (let row=0; row<9; row++) {
		for (let col=0; col<9; col++) {
			if (typeof(board.board[row][col]) !== "number") {
				// check row
				for (let cc=0; cc<9; cc++) {
					if (typeof(board.board[row][cc]) === "number") {
						let cellValue = board.board[row][cc]
						if (board.board[row][col][cellValue]) {
							out.add({row:row, col:col, cand: cellValue, type:"rm"})
						}
					}
				}
				
				// check col
				for (let rr=0; rr<9; rr++) {
					if (typeof(board.board[rr][col]) === "number") {
						let cellValue = board.board[rr][col]
						if (board.board[row][col][cellValue]) {
							out.add({row:row, col:col, cand: cellValue, type:"rm"})
						}
					}
				}
				
				// check box
				let x = floor(row/3)
				let y = floor(col/3)
				for (let rr=x*3; rr<x*3+3; rr++) {
					for (let cc=y*3; cc<y*3+3; cc++) {
						if (typeof(board.board[rr][cc]) === "number") {
							let cellValue = board.board[rr][cc]
							if (board.board[row][col][cellValue]) {
								out.add({row:row, col:col, cand: cellValue, type:"rm"})
							}
						}
					}
				}
			}
		}
	}
	return out.dicts_array
}