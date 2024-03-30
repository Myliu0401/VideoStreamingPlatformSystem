<template>
    <div class="realTimeVideo">
        <div class="realTimeVideo_leftNavs">
            <div class="searchArea">
                <el-input v-model="keyword" placeholder="搜索" suffix-icon="el-icon-search" @change="search"></i></el-input>
                
            </div>
            <div class="accordion">
                <el-tree
                :data="data"
                :props="defaultProps"
                :highlight-current="true"
                  accordion
                 @node-click="handleNodeClick" />

            </div>

            <div class="control">
                <span class="text">云台控制</span>

                <div class="content"></div>
            </div>
        </div>

        <div class="realTimeVideo_main">
            <div class="content"></div>
            <div class="domain">
                <div class="domain_left">
                    <div class="item">
                        <img src="../../assets/realTimeVideo/1.png" />
                    </div>
                   
                    <div class="item">
                        <img src="../../assets/realTimeVideo/2.png" />
                    </div>
                    <div class="item">
                        <img src="../../assets/realTimeVideo/3.png" />
                    </div>
                    <div class="item">
                        <img src="../../assets/realTimeVideo/4.png" />
                    </div>
                    <div class="item">
                        <img src="../../assets/realTimeVideo/5.png" />
                    </div>
                    <div class="item">
                        <img src="../../assets/realTimeVideo/6.png" />

                        <div class="progressBarSlider">
                            <el-slider v-model="voice" :show-tooltip="false"></el-slider>
                        </div>
                    </div>
                </div>

                <div class="domain_right">
                    <Choices />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Choices from './components/Choices.vue';
export default {
    components: {
        Choices
    },
	data() {
		return {
			keyword: null,
			data: [
				{
					label: '一级 1',
					children: [
						{
							label: '二级 1-1',
							children: [
								{
									label: '三级 1-1-1',
								},
							],
						},
					],
				},
				{
					label: '一级 2',
					children: [
						{
							label: '二级 2-1',
							children: [
								{
									label: '三级 2-1-1',
								},
							],
						},
						{
							label: '二级 2-2',
							children: [
								{
									label: '三级 2-2-1',
								},
							],
						},
					],
				},
				{
					label: '一级 3',
					children: [
						{
							label: '二级 3-1',
							children: [
								{
									label: '三级 3-1-1',
								},
							],
						},
						{
							label: '二级 3-2',
							children: [
								{
									label: '三级 3-2-1',
								},
							],
						},
					],
				},
			],
			defaultProps: {
				children: 'children',
				label: 'label',
			},
            voice: 10
		};
	},

	methods: {
		search() {
			console.log('=');
		},
		handleNodeClick(data) {
			console.log(data);
		},
	},
};
</script>


<style lang="scss" scoped>
@import './index.scss';
</style>