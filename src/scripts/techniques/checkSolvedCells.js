export default function checkSolvedCells(board) {
	let out = []
	for (let row=0; row<9; row++) {
		for (let col=0; col<9; col++) {
			if (board.isCellUnsolved(row, col)) {
				let num_cands = 0
				let index = null
				for (let i in board.board[row][col]) {
					if (board.board[row][col][i]) {
						num_cands++
						index = i
					}
				}
				if (num_cands === 1) {
					// console.log(board.board[row][col], typeof(board.board[row][col]))
					out.push({row:row, col:col, cand: Number(index), type:"solved"})
				}
			}
		}
	}
	return out
}