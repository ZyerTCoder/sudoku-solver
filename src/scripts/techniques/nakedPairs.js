let floor = Math.floor

class SetOfDicts {
	#set

	constructor() {
		this.dicts_array = []
		this.#set = new Set()
	}

	add(d) {
		let string_ver = JSON.stringify(d)
		if (this.#set.has(string_ver)) { return }
		else {
			this.#set.add(string_ver)
			this.dicts_array.push(d)
		}
	}
}

export default function nakedPairs(board) {
	let out = new SetOfDicts()
	let digitRepr = Array(9).fill().map(() => Array(9).fill(""))
	
	// generate a number representing the available candidates in each cell
	for (let row=0; row<9; row++) {
		for (let col=0; col<9; col++) {
			if (board.isCellUnsolved(row, col)) {
				for (let [cand, value] of Object.entries(board.board[row][col])) {
					if (value) {
						digitRepr[row][col] += cand
					}
					// digitRepr[row][col] = (digitRepr[row][col] << 1) + value
				}
			}
		}
	}

	// compare if any of those numbers match in any row/col/box
	// row
	for (let row=0; row<9; row++) {
		let set = {}
		// count occurences of pairs
		for (let col=0; col<9; col++) {
			if (digitRepr[row][col].length === 2) {
				if (!set[digitRepr[row][col]]) {
					set[digitRepr[row][col]] = 1
				} else {
					set[digitRepr[row][col]] += 1
				}
			}
		}

		// if any pair occurs more than once, remove its candidates from the
		// rest of the cells in the same group
		let highlight_flag = false
		for (let [nakedpair, amount] of Object.entries(set)) {
			if (amount != 2) { continue }
			for (let col=0; col<9; col++) {
				let cands = digitRepr[row][col]
				if (cands === nakedpair || cands === "") { continue }
				for (let candidate of nakedpair) {
					if (cands.includes(candidate)) {
						highlight_flag = nakedpair
						out.add({row:row, col:col, cand:Number(candidate), type:"rm", reason:`NakedPair ${nakedpair} in row`})
					}
				}
			}
			if (highlight_flag) {
				for (let col=0; col<9; col++) {
					if (digitRepr[row][col] !== nakedpair) { continue }
					out.add({row:row, col:col, cand:Number(highlight_flag[0]), type:"yellow"})
					out.add({row:row, col:col, cand:Number(highlight_flag[1]), type:"yellow"})
				}
			}
		}
	}

	// col
	for (let col=0; col<9; col++) {
		let set = {}
		for (let row=0; row<9; row++) {
			if (digitRepr[row][col].length === 2) {
				if (!set[digitRepr[row][col]]) {
					set[digitRepr[row][col]] = 1
				} else {
					set[digitRepr[row][col]] += 1
				}
			}
		}

		let highlight_flag = false
		for (let [nakedpair, amount] of Object.entries(set)) {
			if (amount != 2) { continue }
			for (let row=0; row<9; row++) {
				let cands = digitRepr[row][col]
				if (cands === nakedpair || cands === "") { continue }
				for (let candidate of nakedpair) {
					if (cands.includes(candidate)) {
						highlight_flag = nakedpair
						out.add({row:row, col:col, cand:Number(candidate), type:"rm", reason:`NakedPair ${nakedpair} in col`})
					}
				}
			}
			if (highlight_flag) {
				for (let row=0; row<9; row++) {
					if (digitRepr[row][col] !== nakedpair) { continue }
					out.add({row:row, col:col, cand:Number(highlight_flag[0]), type:"yellow"})
					out.add({row:row, col:col, cand:Number(highlight_flag[1]), type:"yellow"})
				}
			}
		}
	}

	// box
	for (let box=0; box<9; box++) {
		let x = floor(box/3)
		let y = floor(box%3)
		
		let set = {}
		for (let row=x*3; row<x*3+3; row++) {
			for (let col=y*3; col<y*3+3; col++) {
				if (digitRepr[row][col].length === 2) {
					if (!set[digitRepr[row][col]]) {
						set[digitRepr[row][col]] = 1
					} else {
						set[digitRepr[row][col]] += 1
					}
				}
			}
		}

		let highlight_flag = false
		for (let [nakedpair, amount] of Object.entries(set)) {
			if (amount != 2) { continue }
			
			for (let row=x*3; row<x*3+3; row++) {
				for (let col=y*3; col<y*3+3; col++) {
					let cands = digitRepr[row][col]
					if (cands === nakedpair || cands === "") { continue }
					for (let candidate of nakedpair) {
						if (cands.includes(candidate)) {
							highlight_flag = nakedpair
							out.add({row:row, col:col, cand:Number(candidate), type:"rm", reason:`NakedPair ${nakedpair} in box`})
						}
					}
				}
			}
			if (highlight_flag) {
				for (let row=x*3; row<x*3+3; row++) {
					for (let col=y*3; col<y*3+3; col++) {
						if (digitRepr[row][col] !== nakedpair) { continue }
						out.add({row:row, col:col, cand:Number(highlight_flag[0]), type:"yellow"})
						out.add({row:row, col:col, cand:Number(highlight_flag[1]), type:"yellow"})
					}
				}
			}
		}
	}

	return out.dicts_array
}