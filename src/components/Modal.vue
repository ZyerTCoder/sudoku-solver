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
		margin: 100px auto;
		width: 200px;
		background: #ddd;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
	}

	.backdrop {
		top: 0;
		position: fixed;
		background: rgba(0,0,0,0.5);
		width: 100%;
		height: 100%;
	}
</style>