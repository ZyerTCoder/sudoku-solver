<template>
	<div class="cell" :style="`--border-width: ${computedBorderWidth}`">
		<p class="solved" 
			v-if="solved"
			:style="`--color: ${computedColor}`"
		>
			{{ solved }}
		</p>
		<div 
			class="candidates"
			v-if="!solved"
			v-for="(cand, i) in candidates"
		>
			<p class="candidate" v-if="cand">{{ i+1 }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Cell",
	data () {
		return {
			solved: 0,
			candidates: [
				true, true, true,
				true, true, true,
				true, true, true,
			],
			bottom_border: "0px",
			left_border: "0px",
			text_color: "#029dc4",
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
	font-size: 2rem;
	--color: black;
	color: var(--color);
}
.candidates {
	width: 33%;
	height: 33%;
}
.candidate {
	font-size: .8rem;
}
</style>