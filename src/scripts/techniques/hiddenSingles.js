let floor = Math.floor

export default function hiddenSingles(board) {
	let out = []
	for (let row=0; row<9; row++) {
		for (let col=0; col<9; col++) {
			let cell_cands = board.isCellUnsolved(row, col)
			if (cell_cands) {
				for (let cand in cell_cands) {
					cand = Number(cand) // dont ask just forget about it
					if (cell_cands[cand]) {
						let unique_in = {row: true, col: true, box: true}
		
						// check row
						for (let cc=0; cc<9; cc++) {
							if (col !== cc) {
								let next_cell_cands = board.isCellUnsolved(row, cc)
								if (next_cell_cands[cand]) {
									unique_in.row = false
								}
							}
						}
						
						// check col
						for (let rr=0; rr<9; rr++) {
							if (row !== rr) {
								let next_cell_cands = board.isCellUnsolved(rr, col)
								if (next_cell_cands[cand]) {
									unique_in.col = false
								}
							}
						}
						
						// check box
						let x = floor(row/3)
						let y = floor(col/3)
						for (let rr=x*3; rr<x*3+3; rr++) {
							for (let cc=y*3; cc<y*3+3; cc++) {
								if (row !== rr || col !== cc) {
									let next_cell_cands = board.isCellUnsolved(rr, cc)
									if (next_cell_cands[cand]) {
										unique_in.box = false
									}
								}
							}
						}
						
						let uniqueInStr = ""
						for (let area in unique_in) {
							if (unique_in[area]) {
								uniqueInStr += area + " "
							}
						}
						uniqueInStr = uniqueInStr.trimEnd()
						
						if (uniqueInStr !== "") {
							out.push({row:row, col:col, cand:cand, type:"solved", reason:`unique in ${uniqueInStr}`})
						}
					}
				}
			}
		}
	}
	return out
}