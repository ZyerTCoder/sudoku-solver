<template>
	<!-- <h1>{{ title }}</h1> -->
	<button @click="toggleModal()">Load sudoku</button>
	<button @click="bruteforceSudoku()" :disabled="running_brute_force[0]">
		Brute-force
	</button>
	<button @click="resetBoard()">Reset Board</button>
	<button @click="rmBadCands()">Remove Cands</button>
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
			running_brute_force: [false],
			showModal: false,
			examples: exampleSudokus,
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
		toggleModal() {
			this.showModal = !this.showModal
		},
		startTest() {
			this.sudoku = new Sudoku("........................................................................7........", this.$refs.board)
			this.sudoku.removeCandidatesSimple()
		},
		rmBadCands() {
			this.sudoku.removeCandidatesSimple()
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