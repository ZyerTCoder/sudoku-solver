<template>
	<div class="candidate" :style="`--background: ${computedBackground}`">
		<p v-if="candidate" >{{ candidate }}</p>
	</div>
</template>

<script>
export default {
	name: "CellCandidate",
	data () {
		return {
			background: "white",
		}
	},
	computed: {
		computedBackground() {
			return this.background
		},
	},
	props: ['candidate']
}
</script>

<style scoped>
* {
	box-sizing: border-box;
	margin: auto;
	display: flex; 
}
.candidate {
	width: 33%;
	height: 33%;
	--background: "white";
	background: var(--background);
	border-radius: 50%;

}
p {
	font-size: .8rem;
	user-select: none;
}

@media (max-width: 450px) {
	p {
		font-size: 2.5vw;
	}
}
</style>