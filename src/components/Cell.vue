<template>
	<div class="cell" :style="`--border-width: ${computedBorderWidth}`">
		<p class="solved" 
			v-if="solved"
			:style="`--color: ${computedColor}`"
		>
			{{ solved }}
		</p>
		<CellCandidate
			v-if="!solved"
			v-for="(i, cand) of candidates"
			ref="cands"
			:candidate="i && cand"
		/>
	</div>
</template>

<script>
import CellCandidate from './CellCandidate.vue'

export default {
	name: "Cell",
	components: { CellCandidate },
	data () {
		return {
			solved: 0,
			candidates: {
				1: true, 2: true, 3: true,
				4: true, 5: true, 6: true,
				7: true, 8: true, 9: true,
			},
			bottom_border: "0px",
			left_border: "0px",
			text_color: "#029dc4",
		}
	},
	methods: {
		reset() {
			if (this.$refs.cands.length) {
				for (let c=0; c<9; c++) {
					this.$refs.cands[c].background = "white"
				}
			}
			this.solved = 0
		}
	},
	computed: {
		computedBorderWidth() {
			return "1px 1px " + this.bottom_border + " " + this.left_border
		},
		computedColor() {
			return this.text_color
		},
	},
}
</script>

<style scoped>
* {
	box-sizing: border-box;
	margin: auto;
	display: flex; 
}

.cell {
	background: white;
	width: 11.1111%;
	height: 11.1111%;
	border-style: solid;
	--border-width: 1px 1px 0 0;
	border-width: var(--border-width);
	flex-wrap: wrap;
	justify-content: space-between;
}

.solved {
	font-size: 2.36em;
	--color: black;
	color: var(--color);
}

@media (max-width: 450px) {
	.solved {
		font-size: 8.6vw;
	}
}

p {
	user-select: none;
}
</style>