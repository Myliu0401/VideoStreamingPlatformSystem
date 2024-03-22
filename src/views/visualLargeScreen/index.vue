<template>
	<div class="visualLargeScreen">
		<div class="visualLargeScreen_left">
			<button class="exit">退出</button>

			<div class="left_top">
				<div class="titleBox">
					<div class="titleBox_button">
						<span class="arrow"></span>
						<span class="arrow"></span>
					</div>
					<p class="titleBox_title">基础信息</p>
					<div class="titleBox_button">
						<span class="arrow"></span>
						<span class="arrow"></span>
					</div>
				</div>

				<div class="content" ref="deviceStatu"></div>
			</div>

			<div class="left_bottom">
				<div class="titleBox">
					<div class="titleBox_button">
						<span class="arrow"></span>
						<span class="arrow"></span>
					</div>
					<p class="titleBox_title">基础信息</p>
					<div class="titleBox_button">
						<span class="arrow"></span>
						<span class="arrow"></span>
					</div>
				</div>

				<div class="rateRingChartBox">
					<span class="outerRing" :style="{ width: circularDiagram.outerRadius + 'px', height: circularDiagram.outerRadius + 'px' }"></span>
					<div class="rateRingChart" ref="rateRingChart"></div>
					<span class="solidCircle" :style="{ width: circularDiagram.innerRadius + 'px', height: circularDiagram.innerRadius + 'px' }"></span>
				</div>

				<div class="rateRingInfo">
					<div class="rateRingInfoBox">
						<div class="item">
							<span class="item_num">7</span>
							<span class="item_title">在线数</span>
						</div>
						<div class="item">
							<span class="item_num">4</span>
							<span class="item_title">离线数</span>
						</div>
					</div>
					<div class="rateRingInfoBox">
						<div class="item">
							<span class="item_num">100%</span>
							<span class="item_title">GT覆盖率</span>
						</div>
						<div class="item">
							<span class="item_num">57.14%</span>
							<span class="item_title">GT覆盖率</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="visualLargeScreen_content">
			<div class="contentTitleBox"></div>
			<div class="optionSearchArea">
				<DropDownList :lists="administrativeRegion" prompt="省" />
				<DropDownList :lists="administrativeRegion" prompt="市" />
				<DropDownList :lists="administrativeRegion" prompt="区" />

				<button class="search">搜索 <i class="el-icon-search"></i></button>
			</div>

			<div class="contentBox">
				<BaiduMap v-show="currentlySelectedMap === 'baiduMap'" ref="baiduMap"/>
				<EchartsMap v-show="currentlySelectedMap === 'echarts'" ref="echartsMap"/>
				<GTDetails v-if="currentlySelectedMap === 'GTDetails'" />
				<i v-if="isLoading" class="loading el-icon-loading"></i>
			</div>

			<div class="switchingArea">
				<button class="button" :class="{ active: currentlySelectedMap === 'baiduMap' }" @click="switchMaps('baiduMap')">百度地图</button>
				<button class="button" :class="{ active: currentlySelectedMap === 'echarts' }" @click="switchMaps('echarts')">echarts</button>
			</div>
		</div>

		<div class="visualLargeScreen_right">
			<div class="right_top">
				<div class="titleBox">
					<div class="titleBox_button">
						<span class="arrow"></span>
						<span class="arrow"></span>
					</div>
					<p class="titleBox_title">基础信息</p>
					<div class="titleBox_button">
						<span class="arrow"></span>
						<span class="arrow"></span>
					</div>
				</div>

				<div class="contentBox">
					<div class="contentBox_content" ref="dotsBox">
						<div class="info">
							<span class="num">3</span>
							<span class="text">隐患总数</span>
						</div>
					</div>
					<div class="contentBox_info">
						<div class="item">
							<span class="drop"></span>
							<p class="text">隐患类型1</p>
						</div>
						<div class="item">
							<span class="drop"></span>
							<p class="text">隐患类型2</p>
						</div>
						<div class="item">
							<span class="drop"></span>
							<p class="text">隐患类型3</p>
						</div>
					</div>
				</div>

				<div class="regulatoryRegion">
					<SliderBar title="挖掘机" />
					<SliderBar title="塔吊" />
				</div>
			</div>

			<div class="right_bottom">
				<div class="titleBox">
					<div class="titleBox_button">
						<span class="arrow"></span>
						<span class="arrow"></span>
					</div>
					<p class="titleBox_title">基础信息</p>
					<div class="titleBox_button">
						<span class="arrow"></span>
						<span class="arrow"></span>
					</div>
				</div>

				<div class="carouselChart">
					<div class="swiper">
						<div class="swiper-wrapper">
							<div class="swiper-slide"></div>
							<div class="swiper-slide"></div>
							<div class="swiper-slide"></div>
						</div>
						<!-- 如果需要分页器 -->
						<!-- <div class="swiper-pagination"></div> -->

						<!-- 如果需要导航按钮 -->
						<!-- <div class="swiper-button-prev"></div>
						<div class="swiper-button-next"></div> -->

						<!-- 如果需要滚动条 -->
						<!-- <div class="swiper-scrollbar"></div> -->
					</div>
					<div class="button-prev switchButton" @click="switchingTheCarouselChart('prev')"></div>
					<div class="button-next switchButton" @click="switchingTheCarouselChart('next')"></div>
				</div>

				<div class="tabulation" @click="enterGT">
					<ul class="tabulation_ul">
						<li class="ul_li" v-for="(item, index) in alarmDataList" :key="index">
							<p class="li_date">{{ formatTimestamp(item.timeStamp) }}</p>
							<p class="li_title">{{ item.title }}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="backgroundImage"></div>
	</div>
</template>


<script>
import DropDownList from './components/DropDownList.vue';
import administrativeRegion from './administrativeRegion.js';
import SliderBar from './components/SliderBar.vue';
import BaiduMap from './components/BaiduMap.vue';
import EchartsMap from './components/EchartsMap.vue';
import GTDetails from './components/GTDetails.vue';

export default {
	components: {
		DropDownList,
		SliderBar,
		BaiduMap,
		EchartsMap,
		GTDetails
	},

	data() {
		return {
			administrativeRegion, // 行政区数据

			deviceStatus: {
				// 设备状态数据
				inLineeQuipment: 200,
				offLineEquipment: 100,
				faultyEquipment: 170,
			},

			// 环形图的内外半径
			circularDiagram: {
				innerRadius: 0,
				outerRadius: 0,
			},


			carouselChart: null, // 轮播图实例

			currentlySelectedMap: 'GTDetails', // 当前选中的地图

			alarmDataList: [
				{
					timeStamp: 1710904959133,
					title: '037-#002-大号侧-塔吊',
				},
				{
					timeStamp: 1710904959133,
					title: '037-#002-大号侧-塔吊',
				},
				{
					timeStamp: 1710904959133,
					title: '037-#002-大号侧-塔吊',
				},
				{
					timeStamp: 1710904959133,
					title: '037-#002-大号侧-塔吊',
				},
				{
					timeStamp: 1710904959133,
					title: '037-#002-大号侧-塔吊',
				},
				{
					timeStamp: 1710904959133,
					title: '037-#002-大号侧-塔吊',
				},
				{
					timeStamp: 1710904959133,
					title: '037-#002-大号侧-塔吊',
				},
				{
					timeStamp: 1710904959133,
					title: '037-#002-大号侧-塔吊',
				},
			], // 告警数据列表


			contentTimerId: null,

			isLoading: false, // 是否正在加载
		};
	},

	mounted() {
		this.renderDeviceStatu(this.deviceStatus);

		this.renderRateRingChart();

		this.initCarouselChart();

	},

	methods: {
		// 渲染设备状态柱状图
		renderDeviceStatu(datas = {}) {
			const myChart = window.echarts.init(this.$refs.deviceStatu);

			// 标题转换
			const titleConversion = {
				inLineeQuipment: '在线设备',
				offLineEquipment: '离线设备',
				faultyEquipment: '故障设备',
			};
			const obj = {};
			Object.keys(datas).map((name) => {
				return (obj[titleConversion[name]] = datas[name]);
			});

			let barWidth = 800 / 30;
			const option = {
				grid: {
					height: '60%',
					bottom: '15%',
				},

				xAxis: {
					data: Object.keys(obj), // x 轴数据

					axisTick: {
						// 设置 x 轴的刻度线
						show: false, // 不显示刻度线
					},

					axisLine: {
						// 设置 x 轴线的样式
						lineStyle: {
							color: '#C5FFFE', // 设置 x 轴线的颜色
						},
					},

					axisLabel: {
						margin: 20, // 设置标题与坐标轴之间的间距
					},
				},
				yAxis: {
					splitLine: {
						// 设置 y 轴的分割线
						show: true,
						lineStyle: {
							type: 'dashed', // 设置虚线样式
							color: '#C5FFFE', // 设置虚线颜色
							length: 17,
						},
					},

					axisLabel: {
						// 设置 y 轴刻度标签样式
						textStyle: {
							color: '#C5FFFE', // 设置刻度标签文本颜色
						},
					},
				},

				series: [
					{
						type: 'bar',
						barWidth: barWidth,
						z: 1,
						data: this.createColumnColors(Object.values(obj)),
						label: {
							show: true, // 显示数值
							position: 'top', // 数值显示在顶部
							color: '#C5FFFE', // 字体颜色
							fontSize: 12, // 字体大小
							offset: [0, -5], // 位置调整
						},
					},
					{
						z: 3,
						type: 'pictorialBar',
						symbolPosition: 'start',
						data: this.createTopCoverColor(Object.values(obj)),
						symbol: 'diamond',
						symbolOffset: [0, '55%'],
						symbolSize: [barWidth, barWidth * 0.5],
						silent: true,
					},
					{
						z: 3,
						type: 'pictorialBar',
						symbolPosition: 'end',
						data: this.createBottomCoverColor(Object.values(obj)),
						symbol: 'diamond',
						symbolOffset: [0, '-55%'],
						symbolSize: [barWidth, barWidth * 0.5],
						silent: true,
					},
				],

				dataZoom: [
					{
						type: 'inside', // 内置的数据区域缩放组件
						start: 0, // 起始位置百分比
						end: 100, // 结束位置百分比
						minValueSpan: 1, // 缩放的最小值区间
					},
				],
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		},

		// 创建柱子颜色
		createColumnColors(datas = []) {
			return datas.map((value) => {
				return {
					value,
					itemStyle: {
						color: new echarts.graphic.LinearGradient(
							0,
							1,
							0,
							0,
							[
								{
									offset: 0,
									color: 'rgba(0, 132, 255, 0.8)', // 0% 处的颜色
								},
								{
									offset: 0.6,
									color: 'rgba(99, 235, 233, 0.8)', // 60% 处的颜色
								},
								{
									offset: 1,
									color: 'rgba(99, 235, 233, 0.8)', // 100% 处的颜色
								},
							],
							false
						),
					},
				};
			});
		},

		// 创建顶部盖子颜色
		createTopCoverColor(datas = []) {
			return datas.map((value) => {
				return {
					value,
					itemStyle: {
						color: '#0084FF',
					},
				};
			});
		},

		// 创建底部盖子颜色
		createBottomCoverColor(datas = []) {
			return datas.map((value) => {
				return {
					value,
					itemStyle: {
						color: '#63EBE9',
						borderWidth: 1,
						borderColor: '#63EBE9',
						shadowColor: 'rgba(0, 0, 0, 0.2)',
						shadowBlur: 1,
					},
				};
			});
		},

		// 渲染环形饼图
		renderRateRingChart() {
			const myChart = window.echarts.init(this.$refs.rateRingChart);
			const option = {
				legend: {
					right: '5%', // 图例放置在右边
					top: 'center', // 垂直居中
					orient: 'vertical', // 设置图例纵向排列
					icon: 'circle',
					textStyle: {
						color: '#C5FFFE', // 设置字体颜色
					},
				},
				
				series: [
					{
						name: 'Access From',
						type: 'pie',
						radius: ['40%', '58%'],
						center: ['35%', '50%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 20,

							borderWidth: 2,
						},

						labelLine: {
							show: false,
						},
						data: [
							{ value: 1048, name: '在线装置' },
							{ value: 735, name: '离线装置' },
						],
						label: {
							show: false,
							position: 'center',
							fontSize: 12,
							formatter: function (params) {
								return `${params.percent}%\n\n${params.name}`;
							},
						},
						emphasis: {
							label: {
								show: true,
								fontSize: 16,
								fontWeight: 'bold',
								color: '#C5FFFE',
							},
						},
					},
				],
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);

			const width = myChart.getWidth();
			const height = myChart.getHeight();

			// 计算矩形较小边长作为圆的直径
			const diameter = Math.min(width, height);

			// 计算内外半径
			this.circularDiagram.innerRadius = diameter * 0.4 - 7;
			this.circularDiagram.outerRadius = diameter * 0.58 + 12;
		},


		// 初始化轮播图
		initCarouselChart() {
			this.carouselChart = new Swiper('.swiper', {
				direction: 'horizontal', // 垂直切换选项
				loop: true, // 循环模式选项
				slidesPerView: 2, // 设置slider容器能够同时显示的slides数量(carousel模式)。
				slidesPerGroup: 1, // 设置slides的数量多少为一组。
				spaceBetween: 10, // 在slide之间设置距离（单位px）。
				/* navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}, */
			});
		},

		// 切换轮播图
		switchingTheCarouselChart(type) {
			type === 'prev' ? this.carouselChart.slidePrev() : this.carouselChart.slideNext();
		},

		// 切换地图
		switchMaps(type) {
			if (type === this.currentlySelectedMap) {
				return;
			};
			this.$refs.baiduMap.destroyBaiduMaps(); // 卸载百度地图
			this.$refs.echartsMap.uninstallingAnInstance(); // 卸载echarts地图
			this.isLoading = true;
			clearTimeout(this.contentTimerId);
			this.currentlySelectedMap = type;
			if (type === 'baiduMap') {
				this.contentTimerId = setTimeout(() => {
					this.$refs.baiduMap.renderBaiduMap(); // 渲染百度地图
					this.isLoading = false;
				}, 16);
			} else if (type === 'echarts') {
				this.contentTimerId = setTimeout(() => {
					this.$refs.echartsMap.renderInitEchartsRender(); // 渲染echarts地图
					this.isLoading = false;
				}, 16);
			}
		},

		

		
        // 切换进入 GT详情
		enterGT(e){
			 this.currentlySelectedMap = 'GTDetails';
		}
	},
};
</script>


<style lang="scss" scoped>
@import url(./index.scss);
</style>