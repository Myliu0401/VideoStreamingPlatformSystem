<template>
	<div class="imageManagement">
		<div class="selectionArea">
			<el-date-picker
				style="margin-right: 10px; margin-top: 6px"
				size="small"
				v-model="times"
				type="daterange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
			/>
			<el-input
				size="small"
				suffix-icon="el-icon-search"
				style="width: 200px; margin-right: 10px; margin-top: 6px"
				v-model="keyword"
				placeholder="请输入搜索内容"
			/>
			<el-button size="small" style="margin-right: 10px; margin-left: 0px; margin-top: 6px">搜索</el-button>
			<el-button size="small" style="margin-right: 10px; margin-left: 0px; margin-top: 6px"
				><i class="el-icon-download" style="margin-right: 6px"></i>导出</el-button
			>
			<el-button size="small" style="margin-right: 10px; margin-left: 0px; margin-top: 6px"
				><i class="el-icon-menu" style="margin-right: 6px"></i>文本切换</el-button
			>
		</div>

		<div class="contentMain">
			<el-table v-if="conetntType === 'table'" :data="tableData" height="100%" border style="width: 100%">
				<el-table-column prop="date" label="日期" width="180"> </el-table-column>
				<el-table-column prop="name" label="姓名" width="180"> </el-table-column>
				<el-table-column prop="address" label="地址"> </el-table-column>
			</el-table>
            <div v-else-if="conetntType === 'imgBoxs'" class="imgBoxs">
                <ul class="ul">
                    <li class="li">
                        <div class="li_content">
                            <img class="img" src="https://pic.rmb.bdstatic.com/bjh/914b8c0f9814b14c5fedeec7ec6615df5813.jpeg" />
                        </div>
                        <p class="li_text">2023-09-10 12:00:15</p>
                    </li>

                    <li class="li">
                        <div class="li_content">
                            <img class="img" src="https://pic.rmb.bdstatic.com/bjh/914b8c0f9814b14c5fedeec7ec6615df5813.jpeg" />
                        </div>
                        <p class="li_text">2023-09-10 12:00:15</p>
                    </li>

                    <li class="li">
                        <div class="li_content">
                            <img class="img" src="https://pic.rmb.bdstatic.com/bjh/914b8c0f9814b14c5fedeec7ec6615df5813.jpeg" />
                        </div>
                        <p class="li_text">2023-09-10 12:00:15</p>
                    </li>

                    <li class="li">
                        <div class="li_content">
                            <img class="img" src="https://pic.rmb.bdstatic.com/bjh/914b8c0f9814b14c5fedeec7ec6615df5813.jpeg" />
                        </div>
                        <p class="li_text">2023-09-10 12:00:15</p>
                    </li>

                    <li class="li">
                        <div class="li_content">
                            <img class="img" src="https://pic.rmb.bdstatic.com/bjh/914b8c0f9814b14c5fedeec7ec6615df5813.jpeg" />
                        </div>
                        <p class="li_text">2023-09-10 12:00:15</p>
                    </li>

                    <li class="li">
                        <div class="li_content">
                            <img class="img" src="https://pic.rmb.bdstatic.com/bjh/914b8c0f9814b14c5fedeec7ec6615df5813.jpeg" />
                        </div>
                        <p class="li_text">2023-09-10 12:00:15</p>
                    </li>
                </ul>
            </div>
		</div>

        <div class="contentPage">
             <button class="button">上一页</button>
             <div class="info">1/2</div>
             <button class="button">下一页</button>
        </div>
	</div>
</template>


<script>
export default {
	data() {
		return {
			times: '',
			keyword: '',
			tableData: [
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
                {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
                {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
                {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
                {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
                {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
                {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
                {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
                {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
                {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
                {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
                {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
			],

            conetntType: 'imgBoxs', // 内容类型
		};
	},
};
</script>


<style lang="scss" scoped>
@import url(./index.scss);
</style>