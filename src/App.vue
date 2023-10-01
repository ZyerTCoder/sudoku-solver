<template>
	<h1>{{ title }}</h1>
	<button @click="loadSudoku()">Load sudoku</button>
	<button @click="bruteForceSudoku()" :disabled="running_brute_force[0]">Brute-force</button>
	<button @click="resetBoard()">Reset Board</button>
	<Board ref="board"/>
</template>

<script>
import Board from "./components/Board.vue"
import bruteForce from "./components/bruteYield.js"

export default {
	name: 'App',
	components: { Board },
	data () {
		return {
			title: "Sudoku Solver",
			loop_timer: 16,
			running_brute_force: [false],

			test_boards: {
				EASY_BOARD: "...1.5...14....67..8...24...63.7..1.9.......3.1..9.52...72...8..26....35...4.9...",
				XWING_EXAMPLE: ".93..456..6...314...46.83.9981345...347286951652.7.4834.6..289....4...1..298...34",
				HIDDEN_SINGLES: "2...7..38.....6.7.3...4.6....8.2.7..1.......6..7.3.4....4.8...9.6.4.....91..6...2",
				NAKED_PAIRS: "4.....938.32.941...953..24.37.6.9..4529..16736.47.3.9.957..83....39..4..24..3.7.9",
				HIDDEN_PAIRS: ".........9.46.7....768.41..3.97.1.8...8...3...5.3.87.2..75.261....4.32.8.........",
				POINTING_PAIRS: ".179.36......8....9.....5.7.72.1.43....4.2.7..6437.25.7.1....65....3......56.172.",
				SOLVED_BOARD: "246975138589316274371248695498621753132754986657839421724183569865492317913567842",
				INVALID_BOARD: "...1.5...24....67..8...24...63.7..1.9.......3.1..9.52...72...8..26....35...4.9...",
				HARD_FOR_BACKTRACKING: "..............3.85..1.2.......5.7.....4...1...9.......5......73..2.1........4...9",
			}
		}
	},
	methods: {
		loadSudoku(board = this.test_boards["EASY_BOARD"]) {
			const boardDisplay = this.$refs.board
			for (let i in board) {
				let n = Number(board[i])
				if (n) {
					boardDisplay.setCellByIndex(i, n)
					boardDisplay.setCellTextColor(i, "#c40f02")
				}
			}
		},
		bruteForceSudoku() {
			const boardDisplay = this.$refs.board
			
			if (!boardDisplay.getBoardString()) {
				console.log("No board loaded")
				return -1
			}

			let bruteForceIterator = bruteForce(boardDisplay.getBoardString())
			const setCell = boardDisplay.setCell
			let timer = this.loop_timer
			let running = this.running_brute_force

			function iterateNextBrute() {
				let bfIteration = bruteForceIterator.next()
				if (!bfIteration.done) {
					running[0] = setTimeout(iterateNextBrute, timer)
					console.log(running[0])
				} else {
					running[0] = false
					return 0
				}
				let v = bfIteration.value
				setCell(v.row, v.col, v.guess)
			}

			iterateNextBrute()
		},
		resetBoard() {
			if (this.running_brute_force[0]) {
				clearTimeout(this.running_brute_force[0])
				this.running_brute_force[0] = 0
			}
			this.$refs.board.resetBoard()
		},
	}
}
</script>

<style>
#app {
	margin: 0 auto;
	text-align: center;
	font-family: Calibri;
}
h1 {
	display: flex;
	flex-direction: column;
	margin: 20px auto 10px;
}
button {
	margin: 10px auto;
	width: 100px;
	height: 30px;
}
</style>