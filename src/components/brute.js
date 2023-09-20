const floor = Math.floor

function isGuessValid(board, guess, row, col) {
	if (board[row][col] != 0 ) { return false }
	
	for (r=0; r<9; r++) {
		if (board[r][col] == guess) { return false }
	}

	for (c=0; c<9; c++) {
		if (board[row][c] == guess) { return false }
	}

	var x = Math.floor(row/3)*3
	var y = Math.floor(col/3)*3
	for (r=x; r<x+3; r++) {
		for (c=y; c<y+3; c++) {
			if (board[r][c] == guess) { return false }
		}
	}

	return true
}

function* bruteForce(origBoard) {
	var board = JSON.parse(JSON.stringify(origBoard))
	var loc = 0
	var iterations = 0

	while (iterations < 1000000) {
		if (loc >= 80) { return true, iterations}

		iterations++

		var row = floor(loc/9)
		var col = floor(loc%9)
		if (row >= 9 || col >= 9) {
			throw new Error('Something went wrong while iterating through board, loc:${loc}')
		}

		if (origBoard[row][col] != 0) {
			loc++
			continue
		}

		var guess = board[row][col] + 1
		board[x][y] = 0
		if (guess >= 9) {
			loc--
			if (loc < 0) { throw new Error("Invalid board provided, no solutions found") }

			while (origBoard[floor(loc/9)][floor(loc%9)] != 0) {
				loc--
			}
		} else {
			if ( isGuessValid(board, guess, row, col) ) {
				board[row][col] = guess
				loc++
				g = 0
				yield row, col, guess
			} else {}
			// TODO
		}
	}
}