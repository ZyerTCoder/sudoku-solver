<template>
	<div class="board">
		<Cell
			v-for="index in 81"
			:key="index"
			ref="cells"
		/>
	</div>
</template>

<script>
import Cell from './Cell.vue'

export default {
	name: "Board",
	components: { Cell },
	data () {
		return {
			title: "Sudoku Solver",
		}
	},
	mounted() {
		let cells = this.$refs.cells
		for (let index = 0; index < 9; index++) {
			// verticals
			let i1 = index * 9 + 3
			let i2 = index * 9 + 6
			cells[i1].left_border = "1px";
			cells[i2].left_border = "1px";
			// horizontals
			let i3 = 9 * 2 + index
			let i4 = 9 * 5 + index
			cells[i3].bottom_border = "1px";
			cells[i4].bottom_border = "1px";
		}
		this.$emit("start") // TEMP - DELETE ME
	},
	methods: {
		getCellByIndex(index) {
			return this.$refs.cells[index]
		},
		getCell(row, col) {
			return this.$refs.cells[row * 9 + col]
		},
		setCellByIndex(index, value) {
			this.$refs.cells[index].solved = value
		},
		setCell(row, col, value) {
			this.$refs.cells[row * 9 + col].solved = value
		},
		isCellSolved(row, col) {
			return this.$refs.cells[row * 9 + col].solved
		},
		isCellUnsolved(row, col) {
			return !this.$refs.cells[row * 9 + col].solved
		},
		getBoardString() {
			let cells = this.$refs.cells
			let out = ""
			for (let i in cells) {
				out = out.concat(cells[i].solved ? cells[i].solved : ".")
			}
			if (out === ".".repeat(81)) { return false }
			return out
		},
		setCellTextColor(index, color) {
			this.$refs.cells[index].text_color = color
		},
		removeCandidateFromCell(row, col, candidate) {
			this.$refs.cells[row * 9 + col].candidates[candidate-1] = false
		},
		resetBoard() {
			let cells = this.$refs.cells
			for (let i in cells) {
				cells[i].solved = 0
				cells[i].candidates = [
					true, true, true,
					true, true, true,
					true, true, true,
				]
				cells[i].text_color = "#029dc4"
			}
		},
	}
}
</script>

<style scoped>
.board {
	background: black;
	width: 450px;
	height: 450px;
	margin: 0 auto;
	border-style: solid;
	border-width: 4px 4px 5px 5px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
</style>