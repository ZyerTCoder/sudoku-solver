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
import Cell from './Cell.vue';
export default {
	name: "Board",
	components: { Cell },
	data () {
		return {
			title: "Sudoku Solver"
		}
	},
	methods: {
		setup() {
			console.log("hi")
			// make the square divisors
			this.$refs.cells[0]
		},
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
	border-width: 5px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
</style>