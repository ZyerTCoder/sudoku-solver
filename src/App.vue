<template>
	<h1>{{ title }}</h1>
	<button @click="loadSudoku()">Load sudoku</button>
	<button @click="bruteforceSudoku()" :disabled="running_brute_force[0]">Brute-force</button>
	<button @click="resetBoard()">Reset Board</button>
	<Board ref="board"/>
</template>

<script>
import Board from "./components/Board.vue"
import bruteforce from "./scripts/bruteforce.js"
import exampleSudokus from "./scripts/exampleSudokus"

export default {
	name: 'App',
	components: { Board },
	data () {
		return {
			title: "Sudoku Solver",
			loop_timer: 16,
			running_brute_force: [false],
		}
	},
	methods: {
		loadSudoku(board = exampleSudokus["EASY_BOARD"]) {
			const boardDisplay = this.$refs.board
			for (let i in board) {
				let n = Number(board[i])
				if (n) {
					boardDisplay.setCellByIndex(i, n)
					boardDisplay.setCellTextColor(i, "#c40f02")
				}
			}
		},
		bruteforceSudoku() {
			const boardDisplay = this.$refs.board
			
			if (!boardDisplay.getBoardString()) {
				console.log("No board loaded")
				return -1
			}

			let bruteforceIterator = bruteforce(boardDisplay.getBoardString())
			const setCell = boardDisplay.setCell
			let timer = this.loop_timer
			let running = this.running_brute_force

			function iterateNextBrute() {
				let bfIteration = bruteforceIterator.next()
				if (!bfIteration.done) {
					running[0] = setTimeout(iterateNextBrute, timer)
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