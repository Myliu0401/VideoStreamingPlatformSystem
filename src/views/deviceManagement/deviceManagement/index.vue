<template>
    <div class="deviceManagement">
        <div class="leftNavigation">
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

            
        </div>

        <div class="contentMain">
            <div class="contentMain_searchArea">
                <el-select v-model="equipmentNumber" clearable placeholder="设备编号" size="small" style="width: 150px; min-width: 150px; margin-right: 10px;">
                       <el-option
                         v-for="item in deviceList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
                       </el-option>
                </el-select>
                <el-input v-model="keyword1" placeholder="请输入搜索内容内容" size="small" style="margin-right: 10px;"></el-input>
                <el-button plain size="small">搜索</el-button>
                <el-button plain size="small">批量管理</el-button>
                <el-button plain size="small">添加设备</el-button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
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


            equipmentNumber: null, // 设备编号
            keyword1: '', // 关键字
            deviceList: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }
            ], // 设备列表
		};
	},

	methods: {
		handleNodeClick(data) {
			console.log(data);
		},

        search() {
			console.log('=');
		},
	},
};
</script>



<style lang="scss" scoped>
@import url(./index.scss);
</style>