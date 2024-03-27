<template>
	<div class="choice">
		<div class="choiceBox" :class="{ active: isActive }" @click="handleClick">
			{{ data[activeIndex] }}
		</div>
		<div class="contentBox" :style="{ height: isActive ? (data.length - 1) * 40 + 1 + 'px' : '0px' }">
			<ul class="ul">
				<li class="li" v-for="(text, index) in selectionItems" :key="index" @click="switchSelection(text)">{{ text }}</li>
			</ul>
		</div>
	</div>
</template>


<script>
export default {
	props: {
		selectIndex: {
			default: 0,
		},
	},

	computed: {
		selectionItems() {
			return this.data.filter((item, index) => {
				return index !== this.activeIndex;
			});
		},
	},

	created() {
		window.addEventListener('click', this.close);
	},

	beforeDestroy() {
		window.removeEventListener('click', this.close);
	},

	data() {
		return {
			data: ['1x1', '2x2', '3x3'],
			isActive: false,
            activeIndex: this.selectIndex
		};
	},

	methods: {
		handleClick(event) {
            event.stopPropagation();
			this.isActive = !this.isActive;
		},

		close() {
			this.isActive = false;
		},


        switchSelection(text){
            this.activeIndex = this.data.indexOf(text);
        }
	},
};
</script>


<style lang="scss" scoped>
.choice {
	position: relative;
	.choiceBox {
		height: 40px;
		width: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(238, 238, 238, 1);
		font-size: 23px;
		cursor: pointer;
		transition: all 0.3s ease-in-out;

		&.active {
			background-color: rgb(194, 194, 194);
		}

		&:hover {
			background-color: rgb(194, 194, 194);
		}
	}

	.contentBox {
		position: absolute;
		width: 100px;
		background-color: rgba(238, 238, 238, 1);
		bottom: 100%;
		overflow: hidden;
		transition: all 0.3s;
		.ul {
			width: 100%;
			.li {
				list-style: none;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				font-size: 23px;
				cursor: pointer;
				transition: all 0.3s ease-in-out;
				box-shadow: 0px 1px 0px #ccc;
				&:hover {
					background-color: rgb(209, 209, 209);
				}
			}
		}
	}
}
</style>