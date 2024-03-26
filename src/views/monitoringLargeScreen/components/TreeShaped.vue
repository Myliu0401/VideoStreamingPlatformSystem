<template>
	<div class="treeShaped" :style="{ height: myheight }" @transitionend="transitionend">
		<ul class="treeShaped_contentBox" ref="contentBox">
			<li class="item" v-for="(item, index) in myDatas" :key="item.id" :ref="'item' + index">
				<div
					class="item_div"
					:class="{ active: (topLevel ? activeId : activeid) === item.id }"
					:style="{ paddingLeft: leftValue + 'px' }"
					@click="expandAndCollapse($event, index, item)"
				>
					<i class="el-icon-caret-right" :class="{ open: item.open }" v-if="item.children && item.children.length"></i>
					<span class="item_text">{{ item.name }}</span>
				</div>

				<TreeShaped
					v-if="item.children && item.children.length"
					:datas="item.children"
					:leftValue="getLeftValue"
					:activeid="topLevel ? activeId : activeid"
					:ref="'treeShaped' + index"
					:topLevel="false"
					:secondLevel="topLevel ? true : false"
					:defaultExpandedId="defaultExpandedId"

					@previousLeve="previousLeve"
				/>
			</li>
		</ul>
	</div>
</template>


<script>
export default {
	name: 'TreeShaped',
	props: {
		datas: {
			type: Array,
			default: () => {
				return [
					{
						name: '树1',
						id: '1',
						children: [
							{
								name: '树1-1',
								id: '1-1',
							},
						],
					},
					{
						name: '树2',
						id: '2',
						children: [
							{
								name: '树2-1',
								id: '2-1',
							},
							{
								name: '树2-2',
								id: '2-2',
								children: [
									{
										name: '树2-2-1',
										id: '2-2-1',
									},
								],
							},
						],
					},
				];
			},
		},
		leftValue: {
			default: 0,
		},
		topLevel: {
			default: true,
		},
		activeid: {
			default: '',
		},
		defaultExpandedId: {
			default: '2-2-1',
		},
		secondLevel: {
			default: false
		}
	},

	data() {
		return {
			activeId: this.activeid,
			myheight: this.topLevel ? 'auto' : '0px',
			myDatas: this.initData(this.datas), // 添加数据初始化
		};
	},

	computed: {
		getLeftValue() {
			return this.leftValue + 22;
		},
	},

	watch: {},

	mounted() {
        
           const bol = this.isIdInData(this.defaultExpandedId, this.myDatas);
		   
		   if(!this.topLevel && bol){
               this.secondLevel ? setTimeout(this.calculate, 700) : this.calculate();
		   }

            
        
    },

	methods: {
		// 展开收起
		expandAndCollapse(event, index, item) {
			// 先收起其他项
			this.closeOtherItems(index);

			if (item.children && item.children.length) {
				item.open = !item.open; // 切换展开状态
				this.$refs['treeShaped' + index][0].calculate();
				return;
			}
			if (this.topLevel) {
				this.activeId = item.id;
			} else {
				this.$emit('previousLeve', item.id);
			}
		},

		// 收起其他项
		closeOtherItems(clickedIndex) {
			for (let i = 0; i < this.myDatas.length; i++) {
				if (i !== clickedIndex) {
					if (this.$refs['treeShaped' + i]) {
						const height = this.$refs['treeShaped' + i][0].$refs.contentBox.offsetHeight;
						this.$refs['treeShaped' + i][0].myheight = height + 'px';
						this.myDatas[i].open = false;
						setTimeout(() => {
							this.$refs['treeShaped' + i][0].myheight = '0px';
						});
					}
				}
			}
		},

		// 运动结束时触发
		transitionend() {
			this.myheight = this.myheight !== 'auto' && this.myheight !== '0px' ? 'auto' : this.myheight;
		},

		// 算出高度进行展开或收起
		calculate() {
			const height = this.$refs.contentBox.offsetHeight;
			if (this.myheight === 'auto') {
				this.myheight = height + 'px';

				setTimeout(() => {
					this.myheight = '0px';
				});
			} else {
				this.myheight = height + 'px';
			}
		},

		// 选中时数据往外触发
		previousLeve(id) {
			if (this.topLevel) {
				this.activeId = id;
			} else {
				this.$emit('previousLeve', id);
			}
		},

		// 克隆初始化数据
		initData(data) {
			return data.map((item) => ({
				...item,
				open: false, // 初始状态都为关闭
			}));
		},

        // 判断数据 id是否在数据中
		isIdInData(id, data) {
			for (let i = 0; i < data.length; i++) {
                const item = data[i];
				if (item.id === id) {
                    item.open = true;
					return true; // ID 在数据中找到了
				}
				if (item.children && item.children.length) {
					if (this.isIdInData(id, item.children)) {
                        item.open = true;
						return true; // 递归检查子项
					}
				}
			}
			return false; // ID 未找到
		},
	},
};
</script>


<style lang="scss" scoped>
.treeShaped {
	overflow: hidden;
	transition: all 0.4s ease-in-out;
	.treeShaped_contentBox {
		.item {
			list-style: none;
			font-size: 15px;
			color: rgba(99, 235, 233, 1);
			display: flex;
			flex-direction: column;

			.item_div {
				padding: 6px 0px;
				cursor: pointer;
				transition: all 0.3s;

				&:hover {
					background: #0939f9;
				}

				&.active {
					background: #0939f9;
				}

				.el-icon-caret-right {
					font-size: 17px;
					margin-right: 6px;
					transition: all 0.4s;
					transform: rotate(0deg);

					&.open {
						transform: rotate(90deg);
					}
				}
				.item_text {
				}
			}
		}
	}
}
</style>