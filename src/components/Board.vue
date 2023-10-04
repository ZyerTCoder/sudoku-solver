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
	},
	methods: {
		getCellByIndex(index) {
			return this.$refs.cells[index]
		},
		getCell(row, col) {
			return this.$refs.cells[col + 9 * row]
		},
		setCellByIndex(index, value) {
			this.$refs.cells[index].solved = value
		},
		setCell(row, col, value) {
			this.$refs.cells[col + 9 * row].solved = value
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
		resetBoard() {
			let cells = this.$refs.cells
			for (let i in cells) {
				cells[i].solved = 0
				cells[i].color = "red"
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