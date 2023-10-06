import { isSudokuBoard } from "./sudoku.js"

export default function removeBadCandidates (board) {
	if (!isSudokuBoard(board)) {
		return console.error(
			"Invalid board given to removeBadCandidates:", board)
	}

	
}