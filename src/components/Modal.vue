<template>
	<div class="backdrop" @click.self="closeModal">
		<div class="modal">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		closeModal() {
			this.$emit('close')
		},
		handlePasteEvent(event) {
			let board = event.clipboardData.getData("text")
			this.$emit('load', board)
			this.$emit('close')
		}
	},
	mounted() {
		addEventListener("paste", this.handlePasteEvent)
	},
	unmounted() {
		removeEventListener("paste", this.handlePasteEvent)
	},
}
</script>

<style scoped>
	.modal {
		padding: 20px 15px;
		margin: 20% auto;
		width: 200px;
		max-height: 60%;
		background: #ddd;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		overflow: auto;
	}

	.backdrop {
		top: 0;
		position: fixed;
		background: rgba(0,0,0,0.5);
		width: 100%;
		height: 100%;
	}

	@media (pointer: fine) {
		::-webkit-scrollbar-track {
			margin: 60px 0 25px 0;
		}
	}

	/* @media (pointer:none), (pointer:coarse) {
	.boardAndList {
		position: fixed;
		top: 0;
		flex-direction: column;
	}
}

	@media (max-height: 600px) {
		.boardAndList {
			flex-direction: column;
		}
	} */
</style>