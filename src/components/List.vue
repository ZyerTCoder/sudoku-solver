<template>
<ol id="techList">
	<li v-for="tech in techs" 
		:class="{disabled:!tech.enabled, highlight:tech.highlight}"
	>
		<p>{{ tech.displayName }}</p>
	</li>
</ol>
</template>

<script>
export default {
	name: 'List',
	data () {
		return {
			techs: [],
		}
	},
	methods: {
		clear() {
			this.techs = []
		},
		highlight(name) {
			for (let tech of this.techs) {
				if (tech.highlight) {
					tech.highlight = false
				}
				if (tech.name === name) {
					tech.highlight = true
					console.debug("Highlighting", name)
				}
			}
		},
		removeHighlight() {
			this.highlight()
		}
	}
}
</script>

<style scoped>
#techList {
	/* display: flex;
	flex-direction: column; */
	width: fit-content;
	list-style: none;
	margin: 0;
	padding: 0 0 0 10px;
}

p {
	display: flex;
	justify-content: left;
}

.disabled {
	text-decoration: line-through;
}

.highlight {
	background-color: green;
}

@media (pointer:none), (pointer:coarse), (max-width: 600px) {
	#techList {
		width: 100%;
		padding: 0;
	}

	p {
		display: flex;
		justify-content: center;
	}
}
</style>