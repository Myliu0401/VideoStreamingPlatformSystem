<template>
	<div class="dropDownList" @click.stop="">
		<div class="dropDownList_Box" @click="expand">
			<span class="title">{{ prompt }}</span>
			<i class="triangle" ref="icon"></i>
		</div>

		<div class="tabulation" ref="tabulation">
			<ul class="tabulationUl">
				<li class="ul_li" v-for="(item, index) in lists" :key="index">{{ item.name }}</li>
			</ul>
		</div>
	</div>
</template>


<script>
export default {
	props: {
		prompt: {
			default: '请选择',
		},
		activeTitle: {
			default: '',
		},
		lists: {
			default: () => {
				return [];
			},
		},
	},
	data() {
		return {};
	},

    created(){
        window.onclick = this.putItAllAway;
    },

    

	methods: {
		// 展开
		expand() {
			const tabulations = document.querySelectorAll('.dropDownList .tabulation');

			for (let i = 0; i < tabulations.length; i++) {
				if (tabulations[i] === this.$refs.tabulation) {
					if (tabulations[i].classList.contains('block')) {
						tabulations[i].classList.remove('block');
                        tabulations[i].style.height = '0px';
                        setTimeout(()=>{ tabulations[i] && (tabulations[i].style.display = 'none'); },500);
					} else {
						tabulations[i].classList.add('block');
                        tabulations[i].style.display = 'block';
                        setTimeout(()=>{ tabulations[i] && (tabulations[i].style.height = '200px'); },16);
					}

					continue;
				} else {
                    tabulations[i].classList.remove('block');
                    tabulations[i].style.height = '0px'
					tabulations[i].style.display = 'none';
				}
			}

			const icons = document.querySelectorAll('.dropDownList .triangle');

			for (let i = 0; i < icons.length; i++) {
				if (icons[i] === this.$refs.icon) {
					icons[i].classList.contains('rotate') ? icons[i].classList.remove('rotate') : icons[i].classList.add('rotate');
					continue;
				} else {
					icons[i].classList.remove('rotate');
				}
			}
		},

        // 全部收起
        putItAllAway(){
            const tabulations = document.querySelectorAll('.dropDownList .tabulation');
            const icons = document.querySelectorAll('.dropDownList .triangle');

            for (let i = 0; i < tabulations.length; i++) {
                
                    tabulations[i].classList.remove('block');
                    tabulations[i].style.height = '0px'
                    tabulations[i].style.display = 'none';

                    icons[i].classList.remove('rotate');
                
            }
        }
	},
};
</script>


<style lang="scss" scoped>
.dropDownList {
    position: relative;
	.dropDownList_Box {
		min-width: 110px;
		height: 42px;
		background: rgba(24, 57, 190, 1);
		cursor: pointer;
		border-radius: 10px;

		width: max-content;
		position: relative;

		border: 1px solid #72a1a0;
		padding-right: 20px;
		display: flex;
		align-items: center;
		justify-content: center;

		.title {
			color: rgba(99, 235, 233, 1);
		}

		.triangle {
			width: 0;
			height: 0;
			border-left: 7px solid transparent; /* 左边透明 */
			border-right: 7px solid transparent; /* 右边透明 */
			border-bottom: 11px solid #72d3d2;
			position: absolute;
			top: 50%;
			transform: translateY(-50%) rotate(90deg);
			right: 10px;
			transition: all 0.3s;

			&.rotate {
				transform: translateY(-50%) rotate(180deg);
			}
		}
	}

	.tabulation {
		display: none;
		width: 100%;
		max-height: 200px;
		overflow-y: auto;
		border: 1px solid #72a1a0;
		border-radius: 8px;
		background: #1c3fcb;
        position: absolute;
        top: 100%;
        transition: all 0.6s;
        height: 0px;
		z-index: 11;

		/* 修改滚动条的轨道 */
		&::-webkit-scrollbar {
			width: 3px; /* 滚动条宽度 */
		}

		/* 修改滚动条的滑块 */
		&::-webkit-scrollbar-thumb {
			background-color: rgb(124, 204, 224); /* 滑块颜色 */
			border-radius: 5px; /* 滑块圆角 */
		}

		/* 鼠标悬停在滚动条上时的样式 */
		&::-webkit-scrollbar-thumb:hover {
			background-color: #555;
		}

		.tabulationUl {
			width: 100%;

			.ul_li {
				list-style: none;
				color: #9fe9e8;
				padding: 7px 3px;
				text-align: center;
				cursor: pointer;
				width: 100%;
				white-space: nowrap; /* 不换行 */
				overflow: hidden; /* 溢出部分隐藏 */
				text-overflow: ellipsis; /* 使用省略号代替溢出部分 */
			}
		}
	}
}
</style>

