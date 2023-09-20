<template>
	<h1>{{ title }}</h1>
	<button @click="loadSudoku()">Load sudoku</button>
	<Board ref="board"/>
</template>

<script>
import Board from "./components/Board.vue"
export default {
	name: 'App',
	components: { Board },
	data () {
		return {
			title: "Sudoku Solver",
			easy_board: "...1.5...14....67..8...24...63.7..1.9.......3.1..9.52...72...8..26....35...4.9...",
			invalid_board: "...1.5...24....67..8...24...63.7..1.9.......3.1..9.52...72...8..26....35...4.9...",
			hard_for_backtracking: "..............3.85..1.2.......5.7.....4...1...9.......5......73..2.1........4...9",
			xwing_example: ".93..456..6...314...46.83.9981345...347286951652.7.4834.6..289....4...1..298...34",
			hidden_singles: "200070038000006070300040600008020700100000006007030400004080009060400000910060002",
			naked_pairs: "400000938032094100095300240370609004529001673604703090957008300003900400240030709",
			hidden_pairs: "000000000904607000076804100309701080008000300050308702007502610000403208000000000",
			pointing_pairs: "017903600000080000900000507072010430000402070064370250701000065000030000005601720",
			solved_board: "246975138589316274371248695498621753132754986657839421724183569865492317913567842",

		}
	},
	methods: {
		loadSudoku() {
			const setCell = this.$refs.board.setCellByIndex
			for (let i in this.naked_pairs) {
				var n = Number(this.easy_board[i])
				setCell(i, n)
			}
		}
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
	margin: 40px auto;
}
button {
	margin: 20px auto;
	width: 100px;
	height: 30px;
}
</style>