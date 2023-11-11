<template>
<ol id="techList">
	<li :id="'techList' + tech.index" v-for="tech in techs" 
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
			this.scrollThing = document.getElementById("verticalMobile")
		},
		highlight(name) {
			let index = 0
			for (let tech of this.techs) {
				if (tech.highlight) {
					tech.highlight = false
					if (this.scrollThing) {
						document.getElementById("verticalMobile").scrollTo(0, 0)
					}
				}
				if (tech.name === name) {
					tech.highlight = true
					console.debug("Highlighting", name)
					if (this.scrollThing) {
						if (index > 3) {
							let refName = ('techList' + (index-3))
							let refElement = document.getElementById(refName)
							console.log(refElement)
							refElement.scrollIntoView()
						} else {
							document.getElementById("verticalMobile").scrollTo(0, 0)
						}
					}
				}
				index++
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