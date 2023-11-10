<template>
	<!-- <h1>{{ title }}</h1> -->
	<div  v-if="!isMobile()">
		<div class="buttons">
			<button @click="toggleLoadModal()">Load sudoku</button>
			<!-- :disabled="!sudoku" bits give a warning on load, find alternative -->
			<button @click="next()" :disabled="running_timer[0]">Next Step</button>
			<button @click="autoNext()" :disabled="running_timer[0]">Auto Step</button>
			<button @click="bruteforceSudoku()" :disabled="running_timer[0]">Brute-force</button>
			<button @click="resetBoard()">Reset Board</button>
		</div>
		<div class="boardAndList">
			<Board ref="board" @start="startTest" /> <!-- TEMP - DELETE the @start -->
			<List ref="techList"/>
		</div>
	</div>
	<!-- portrait mobile -->
	<div v-if="isMobile() && !isLandscape()">
		<div class="boardAndList">
			<Board ref="board" @start="startTest" /> <!-- TEMP - DELETE the @start -->
			<List ref="techList"/>
		</div>
		<div class="buttons footer">
			<button @click="toggleLoadModal()">Load sudoku</button>
			<!-- :disabled="!sudoku" bits give a warning on load, find alternative -->
			<button @click="next()" :disabled="running_timer[0]">Next Step</button>
			<button @click="autoNext()" :disabled="running_timer[0]">Auto Step</button>
			<button @click="bruteforceSudoku()" :disabled="running_timer[0]">Brute-force</button>
			<button @click="resetBoard()">Reset Board</button>
		</div>
	</div>
	<!-- landscape mobile TODO-->
	<div v-if="isMobile() && isLandscape()">
		<div class="sidebyside">
			<Board ref="board" @start="startTest" /> <!-- TEMP - DELETE the @start -->
			<List ref="techList"/>
		</div>
		<div class="buttons footer">
			<button @click="toggleLoadModal()">Load sudoku</button>
			<!-- :disabled="!sudoku" bits give a warning on load, find alternative -->
			<button @click="next()" :disabled="running_timer[0]">Next Step</button>
			<button @click="autoNext()" :disabled="running_timer[0]">Auto Step</button>
			<button @click="bruteforceSudoku()" :disabled="running_timer[0]">Brute-force</button>
			<button @click="resetBoard()">Reset Board</button>
		</div>
	</div>
	<Modal 
		v-if="showLoadModal"
		@close="toggleLoadModal"
		@load="loadSudoku"
	>
		<p>Paste your own or pick from the examples below</p>
		<button 
			class="modalButton" 
			v-for="(value, key) in examples" 
			@click="loadSudoku(value); toggleLoadModal()"
		>
			{{ key }}
		</button>
	</Modal>
	<Modal
		v-if="showMessageModal"
		@close="toggleMessageModal"
	>
		<p>{{ message }}</p>
	</Modal>
</template>

<script>

import Board from "./components/Board.vue"
import Modal from "./components/Modal.vue"
import List from "./components/List.vue"

import bruteforce from "./scripts/bruteforce.js"
import exampleSudokus from "./scripts/exampleSudokus.js"
import {Sudoku} from "./scripts/sudoku.js"

export default {
	name: 'App',
	components: { Board, Modal, List},
	data () {
		return {
			title: "Sudoku Solver",
			loop_timer: 16,
			running_timer: [false],
			showLoadModal: false,
			showMessageModal: false,
			message: "",
			examples: exampleSudokus,
		}
	},
	methods: {
		loadSudoku(board = exampleSudokus["Easy"]) {
			if (typeof(board) !== "string" || board.length !== 81) {
				return console.warn("Tried to load invalid sudoku:", board)
			}
			this.resetBoard()
			if (this.sudoku) {
				this.sudoku.reset()
			}
			this.sudoku = new Sudoku(board, this.$refs.board, this.$refs.techList)
		},
		bruteforceSudoku() {
			console.log(navigator.userAgent)
			const boardDisplay = this.$refs.board
			const timer = this.loop_timer
			const running_timer = this.running_timer
			
			if (!boardDisplay.getBoardString()) {
				console.log("No board loaded")
				return 0
			}

			const bruteforceIterator = bruteforce(boardDisplay.getBoardString())
			const setCell = boardDisplay.setCell
			const toggleMessageModal = this.toggleMessageModal

			function iterateNextBrute() {
				let bfIteration = bruteforceIterator.next()
				if (!bfIteration.done) {
					running_timer[0] = setTimeout(iterateNextBrute, timer)
				} else {
					if (bfIteration.value === "invalid") {
						toggleMessageModal("This sudoku board doesn't have a solution")
					}
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
		toggleLoadModal() {
			this.showLoadModal = !this.showLoadModal
		},
		toggleMessageModal(message) {
			this.message = message
			this.showMessageModal = !this.showMessageModal
		},
		startTest() { // TEMP - DELETE
			this.sudoku = new Sudoku(
				// "TEST_NO_CANDIDATES",
				exampleSudokus["Naked/Hidden Triples"],
				// "1................................................................................",
				this.$refs.board,
				this.$refs.techList
			)
			// for (let i=0; i<2; i++) {
			// 	this.sudoku.next()
			// }
		},
		autoNext() {
			let timer = 250
			let running_timer = this.running_timer
			let next = this.next

			function takeStep() {
				let result = next()
				if (result) {
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
			let result = this.sudoku.next()
			if (result === "no tech") {
				this.toggleMessageModal("Can't solve this board with current techniques")
				return 0
			} else if (result === "invalid") {
				this.toggleMessageModal("This sudoku board doesn't have a solution")
				return 0
			}
			return result
		},
		isMobile() {
			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		},
		isLandscape() {
			return window.innerHeight < window.innerWidth
		}
	},
}
</script>

<style>
#app {
	margin: 0 auto;
	text-align: center;
	font-family: Calibri, Verdana;
}
h1 {
	display: flex;
	flex-direction: column;
	margin: 20px auto 10px;
}
button {
	width: 100px;
	height: 40px;
}
.buttons {
	justify-content: center;
	width: 100%;
	margin: 10px auto;
	display: flex;
}
.modalButton {
	margin: 5px auto;
	padding: 5px;
	height: fit-content;
	border-radius: 4px;
	width: 180px;
}

.consolas {
	font-family: consolas, monospace;
}

p {
	margin: 0;
}

.boardAndList {
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	margin: 0;
	padding: 0;
}

.sidebyside {
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	margin: 0;
	padding: 0;
}

@media (pointer: none), (pointer: coarse) {
	.boardAndList {
		position: fixed;
		top: 0;
		flex-direction: column;
	}

	.modalButton {
		padding: 10px;
	}
}

@media (max-width: 600px) {
	.boardAndList {
		flex-direction: column;
	}
}

.footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	margin: 0;
	padding: 0;
}

@media (pointer: fine) {
	::-webkit-scrollbar {
		width: 5px;
	}


	::-webkit-scrollbar-thumb {
		background-color: #888;
		border-radius: 5px;
		height: 50px;
	}
}
</style>