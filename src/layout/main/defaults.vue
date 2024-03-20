<template>
	<el-container class="layout-container">
	    <FirstLevelNavigation/>
		<Asides />
		<el-container class="flex-center layout-backtop">
			<Headers v-if="isFixedHeader" />
			<el-scrollbar ref="layoutDefaultsScrollbarRef">
				<Headers v-if="!isFixedHeader" />
				<Mains />
			</el-scrollbar>
		</el-container>
		<el-backtop target=".layout-backtop .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script>
import Asides from '@/layout/component/aside.vue';
import Headers from '@/layout/component/header.vue';
import Mains from '@/layout/component/main.vue';
import FirstLevelNavigation from '@/layout/component/firstLevelNavigation.vue';
export default {
	name: 'layoutDefaults',
	components: { Asides, Headers, Mains, FirstLevelNavigation },
	data() {
		return {};
	},
	computed: {
		// 是否开启固定 header
		isFixedHeader() {
			return this.$store.state.themeConfig.themeConfig.isFixedHeader;
		},
	},
	watch: {
		// 监听路由的变化
		$route: {
			handler() {
				this.$refs.layoutDefaultsScrollbarRef.wrap.scrollTop = 0;
			},
			deep: true,
		},
	},
};
</script>
