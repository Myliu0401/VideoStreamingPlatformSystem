<template>
    <div class="accountManagement">
        <div class="accountManagement_leftNavs">
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


        <div class="accountManagement_content">
            <div class="top">
                <el-form ref="form" :model="form" label-width="80px" size="small">
                <el-form-item label="账号">
                   <el-input v-model="form.account" placeholder="账号" style="width:150px;"></el-input>
                </el-form-item>

                <el-form-item label="手机号" style="margin-right: 15px;">
                   <el-input v-model="form.mobilePhone"  placeholder="手机号" style="width:150px;"></el-input>
                </el-form-item>

                <div class="buttons">
                   <el-button icon="el-icon-search" type="primary" size="small" style="border-top-right: 0px; border-bottom-right:0px;">查询</el-button>
                   <el-button icon="el-icon-refresh" type="primary" plain size="small" style="border-top-left: 0px; border-bottom-left:0px;">重置</el-button>
                </div>

                <el-button style="margin-left: 10px;" icon="el-icon-plus" type="primary" size="small">添加</el-button>
            </el-form>
             
            </div>
            <div class="content">

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

			form: {
				account: null,
				mobilePhone: null,
			},
		};
	},

	methods: {
		search() {},

		handleNodeClick() {},
	},
};
</script>


<style lang="scss" scoped>
@import './index.scss';
</style>