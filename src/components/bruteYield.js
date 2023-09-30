const floor = Math.floor

function stringToMatrix(inp) {
	let inp = inp.replaceAll(/[^\d]/g, "0")
	let board = []
	for (let r=0; r<9; r++) {
		board[r] = []
		for (let c=0; c<9; c++) {
			board[r][c] = Number(inp.charAt(r*9 + c))
		}
	}
	return board
}

function isGuessValid(board, guess, row, col) {
	if (board[row][col] != 0 ) { return false }
	
	for (let r=0; r<9; r++) {
		if (board[r][col] == guess) { return false }
	}

	for (let c=0; c<9; c++) {
		if (board[row][c] == guess) { return false }
	}

	let x = floor(row/3)*3
	let y = floor(col/3)*3
	for (let r=x; r<x+3; r++) {
		for (let c=y; c<y+3; c++) {
			if (board[r][c] == guess) { return false }
		}
	}

	return true
}

function* bruteForce(origBoard) {
	if (typeof(origBoard) === "string") {
		origBoard = stringToMatrix(origBoard)
	}

	console.log(origBoard)

	let board = JSON.parse(JSON.stringify(origBoard))
	let loc = 0
	let iterations = 0

	while (true) {
		if (loc > 80) {
			console.log("Solved the board", iterations)
			return board
		}

		iterations++
		if (iterations % 10000000 == 0) {
			console.log(floor(iterations/1000000) + "mil iterations, running for " + floor((now()-t0) / 1000) + "s (" + floor((now()-t0)/(iterations/10000000)) + "ms per 10 mil)")
		}
		let row = floor(loc/9)
		let col = floor(loc%9)
		if (row >= 9 || row < 0) {
			throw new Error('Something went wrong while iterating through board, loc:${loc}')
		}

		if (origBoard[row][col] != 0) {
			loc++
			continue
		}

		let guess = board[row][col] + 1
		board[row][col] = 0

		yield {
			board: board, 
			row: row,
			col: col,
			guess: guess,
		}
		if (guess > 9) {
			loc--
			if (loc < 0) {
				console.log("Invalid board, could not solve")
				return -1
			}

			while (origBoard[floor(loc/9)][floor(loc%9)] != 0) {
				loc--
				if (loc < 0) {
					console.log("Invalid board, could not solve")
					return -1
					// throw new Error("Invalid board provided, no solutions found")
				}
			}
		} else {
			if ( isGuessValid(board, guess, row, col) ) {
				board[row][col] = guess
				loc++
				yield {
					board: board, 
					row: row,
					col: col,
					guess: guess,
				}
			} else {
				board[row][col] = guess
			}
			
		}
	}
	console.log("Ran for too long, stopped")
	return board
}

const test_boards = {
	["EASY_BOARD"] : "...1.5...14....67..8...24...63.7..1.9.......3.1..9.52...72...8..26....35...4.9...",
	["XWING_EXAMPLE"] : ".93..456..6...314...46.83.9981345...347286951652.7.4834.6..289....4...1..298...34",
	["HIDDEN_SINGLES"] : "200070038000006070300040600008020700100000006007030400004080009060400000910060002",
	["NAKED_PAIRS"] : "400000938032094100095300240370609004529001673604703090957008300003900400240030709",
	["HIDDEN_PAIRS"] : "000000000904607000076804100309701080008000300050308702007502610000403208000000000",
	["POINTING_PAIRS"] : "017903600000080000900000507072010430000402070064370250701000065000030000005601720",
	["SOLVED_BOARD"] : "246975138589316274371248695498621753132754986657839421724183569865492317913567842",
	["INVALID_BOARD"] : "...1.5...24....67..8...24...63.7..1.9.......3.1..9.52...72...8..26....35...4.9...",
	["HARD_FOR_BACKTRACKING"] : "..............3.85..1.2.......5.7.....4...1...9.......5......73..2.1........4...9",
}

if (typeof require !== 'undefined' && require.main === module) {
	const now = Date.now
	const t0 = now()

	let m = stringToMatrix(test_boards["EASY_BOARD"])
	let iterator = bruteForce(m)
	
	let i = 0
	let iteration = iterator.next()
	while (!iteration.done) {
		i++
		let v = iteration.value
		console.log(v.row, v.col, v.guess)
		iteration = iterator.next()
	}
	printBoard(v.board)
	console.log(i, "yields")
	
	const end = now()
	console.log(`Execution time: ${end - t0} ms`)
}

export default bruteForce