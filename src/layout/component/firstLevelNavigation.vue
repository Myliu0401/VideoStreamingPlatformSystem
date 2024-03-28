<template>
	<div class="firstLevelNavigation">
        <h1 style="text-align: center; padding: 20px 0px;">logo</h1>
		<el-scrollbar class="scrollbar">
			<ul class="scrollbar_ul">
				<li
					class="ul_li"
					v-for="item in getFirstNavs"
					:key="item.path"
					:class="{ active: activeNavPath.startsWith(item.path) }"
					@click="switchNavigation($event, item)"
				>
					<i :class="item.meta.icon" class="icon"></i>
					<h3 class="title">{{ $t(item.meta.title) }}</h3>
				</li>
				<li style="list-style: none" class="block" ref="block"></li>
			</ul>
		</el-scrollbar>
	</div>
</template>



<script>
import { Local } from '@/utils/storage.js';
export default {
	data() {
		return {
			activeNavPath: this.$route.path,
			clientWidth: window.document.body.clientWidth
		};
	},
	computed: {
		// 获取首级导航
		getFirstNavs() {
			return this.$store.state.routesList.routesList;
		},
	},
	created() {},
	mounted() {
		this.setBlockPosition();
	},
	methods: {
		// 修改方块位置
		setBlockPosition() {
			const li = document.querySelector('.firstLevelNavigation .ul_li.active');
			if (li) {
				this.redundantCode(li);
			}
		},

		// 切换首级导航
		switchNavigation({ target }, item) {
			if (this.activeNavPath.startsWith(item.path)) {
			  item.children && item.children.length && this.onThemeConfigChange();
				return;
			};
			target = target.tagName === 'LI' ? target : target.parentElement;
			this.redundantCode(target);
			this.activeNavPath = item.path;
            this.bus.$emit('topLevelNavigation', item.path);
		    

			if(!item.children || !item.children.length){
				this.$router.replace(item.path);
			}else {
				this.onThemeConfigChange();
			}
		},

        // 冗余代码
        redundantCode(target){
            const block = this.$refs.block;
			block.style.top = target.offsetTop + 'px';
			block.style.height = target.offsetHeight + 'px';
        },

		// 点击菜单展开与收起
		onThemeConfigChange() {
			
			this.$store.state.themeConfig.themeConfig.isCollapse = this.clientWidth < 1000 ? true : false;
			
			//this.$store.state.themeConfig.themeConfig.isCollapse = !this.$store.state.themeConfig.themeConfig.isCollapse;
			this.setLocalThemeConfig();
		},
		// 存储布局配置
		setLocalThemeConfig() {
			Local.remove('themeConfigPrev');
			Local.set('themeConfigPrev', this.$store.state.themeConfig.themeConfig);
		},
	},
	watch: {
		// 监听路由变化
		$route: function (to, from) {
			this.$nextTick(this.setBlockPosition)
		},
	},
};
</script>


<style scoped lang="scss">
.firstLevelNavigation {
	min-width: 66px;
	background-color: #cdcdcd;
	.scrollbar {
        height: calc(100% - 67px);
		.scrollbar_ul {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			.ul_li {
				width: 96%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-bottom: 6px;
				padding: 5px 0px;
				cursor: pointer;
				transition: all 0.3s;
				z-index: 2;
				color: rgba(51, 51, 51, 1);
				.icon {
					font-size: 21px;
				}
				.title {
					font-size: 12px;
					font-weight: normal;
					text-align: center;
				}

				&.active {
					color: #fff;
				}

				&:not(.active):hover {
					color: #fff;
				}
			}

			.block {
				position: absolute;
				width: 96%;
				left: 2%;
				background-color: rgba(143, 73, 222, 0.5);
				z-index: 1;
				border-radius: 7px;
				transition: all 0.3s;
			}
		}
	}
}
</style>