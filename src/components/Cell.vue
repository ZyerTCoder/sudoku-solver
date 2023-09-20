<template>
	<div class="cell">
		<p class="solved" v-if="solved">{{ solved }}</p>
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
		}
	}
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
	border-width: 1px;
	flex-wrap: wrap;
	justify-content: space-between;
}
.solved {
	font-size: 2rem;
}
.candidates {
	width: 33%;
	height: 33%;
}
.candidate {
	font-size: .8rem;
}
</style>