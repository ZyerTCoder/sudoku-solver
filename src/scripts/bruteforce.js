import { stringToMatrix, isGuessValid } from "./sudoku.js"

const floor = Math.floor

export default function* bruteforce(origBoard) {
	if (typeof(origBoard) === "string") {
		origBoard = stringToMatrix(origBoard)
	}

	console.debug("running bruteforce on:", origBoard)

	let board = JSON.parse(JSON.stringify(origBoard))
	let loc = 0
	let iterations = 0

	while (iterations <= 10000000) {
		if (loc > 80) {
			console.log(`Bruteforce solved the board in ${iterations} iterations`)
			console.debug("solved board:", board)
			return board
		}

		iterations++
		if (iterations % 1000000 == 0) {
			console.warn(`${floor(iterations/1000000)} mil iterations, running for ${floor((now()-t0) / 1000)}s (${floor((now()-t0)/(iterations/10000000))}ms per 10 mil)`)
		}
		let row = floor(loc/9)
		let col = floor(loc%9)
		if (row >= 9 || row < 0) {
			throw new Error(`Something went wrong while iterating through board, loc:${loc}`)
		}

		if (origBoard[row][col] != 0) {
			loc++
			continue
		}

		let guess = board[row][col] + 1
		board[row][col] = 0
		
		if (guess > 9) {
			loc--
			if (loc < 0) {
				console.log("Invalid board, could not solve")
				return "invalid"
			}

			while (origBoard[floor(loc/9)][floor(loc%9)] != 0) {
				loc--
				if (loc < 0) {
					console.log("Invalid board, could not solve")
					return "invalid"
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
	console.warn("Bruteforce ran for too long, stopped")
	return board
}