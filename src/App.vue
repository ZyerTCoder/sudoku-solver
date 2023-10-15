<template>
	<!-- <h1>{{ title }}</h1> -->
	<button @click="toggleModal()">Load sudoku</button>
	<button @click="bruteforceSudoku()" :disabled="running_timer[0]">
		Brute-force
	</button>
	<!-- :disabled="!sudoku" bits give a warning on load, find alternative -->
	<button @click="resetBoard()">Reset Board</button>
	<button @click="next()">Next Step</button>
	<button @click="autoNext()">Auto Step</button>
	<Board ref="board" @start="startTest" /> <!-- TEMP - DELETE the @start -->
	<Modal 
		v-if="showModal"
		@close="toggleModal"
		@load="loadSudoku"
	>
		<p>Paste your own or pick from the examples below</p>
		<button 
			class="modalButton" 
			v-for="(value, key) in examples" 
			@click="loadSudoku(value); toggleModal()"
		>
			{{ key }}
		</button>
	</Modal>
</template>

<script>
import Board from "./components/Board.vue"
import Modal from "./components/Modal.vue"

import bruteforce from "./scripts/bruteforce.js"
import exampleSudokus from "./scripts/exampleSudokus.js"
import {Sudoku} from "./scripts/sudoku.js"

export default {
	name: 'App',
	components: { Board, Modal },
	data () {
		return {
			title: "Sudoku Solver",
			loop_timer: 16,
			running_timer: [false],
			showModal: false,
			examples: exampleSudokus,
			// sudoku: new Sudoku()
		}
	},
	methods: {
		loadSudoku(board = exampleSudokus["Easy"]) {
			if (typeof(board) !== "string" || board.length !== 81) {
				return console.warn("Tried to load invalid sudoku:", board)
			}
			
			this.sudoku = new Sudoku(board, this.$refs.board)
		},
		bruteforceSudoku() {
			const boardDisplay = this.$refs.board
			const timer = this.loop_timer
			const running_timer = this.running_timer
			
			if (!boardDisplay.getBoardString()) {
				console.log("No board loaded")
				return -1
			}

			let bruteforceIterator = bruteforce(boardDisplay.getBoardString())
			const setCell = boardDisplay.setCell
			
			function iterateNextBrute() {
				let bfIteration = bruteforceIterator.next()
				if (!bfIteration.done) {
					running_timer[0] = setTimeout(iterateNextBrute, timer)
				} else {
					running_timer[0] = false
					return 0
				}
				let v = bfIteration.value
				setCell(v.row, v.col, v.guess)
			}
			
			iterateNextBrute()
		},
		resetBoard() {
			if (this.running_timer[0]) {
				clearTimeout(this.running_timer[0])
				this.running_timer[0] = 0
			}
			this.$refs.board.resetBoard()
			this.sudoku = 0
		},
		toggleModal() {
			this.showModal = !this.showModal
		},
		startTest() {
			this.sudoku = new Sudoku(
				"1................................................................................"
				, this.$refs.board)
			this.sudoku.removeCandidatesSimple()
		},
		autoNext() {
			let timer = 250
			let running_timer = this.running_timer
			let next = this.next

			function takeStep() {
				let notdone = next()
				if (notdone) {
					running_timer[0] = setTimeout(takeStep, timer)
				}
			}
			takeStep()
		},
		next() {
			if (!this.sudoku) {
				console.log("No board loaded")
				return 0
			}
			return this.sudoku.next()
		}
	},
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

.modalButton {
	margin: 5px auto;
	border-radius: 4px;
	width: 180px;
}
</style>