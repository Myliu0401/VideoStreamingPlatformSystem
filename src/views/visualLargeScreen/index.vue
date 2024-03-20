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
				<div v-show="currentlySelectedMap === 'baiduMap'" class="map" id="map"></div>
				<div v-show="currentlySelectedMap === 'echarts'" class="echartsMap" id="ChinaMap" ref="ChinaMap"></div>
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

				<div class="tabulation">
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
import mapData from './mapData.js'; // 地图数据
const x = 10;
const y = 25;

export default {
	components: {
		DropDownList,
		SliderBar,
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

			mapInstance: null, // 地图实例

			carouselChart: null, // 轮播图实例

			currentlySelectedMap: 'echarts', // 当前选中的地图

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

			// 选中的图片
			graphic: [],

			selectedProvince: [], // 选中的省份

			echartsMapExample: null, // 地图实例

			contentTimerId: null,

			isLoading: false, // 是否正在加载
		};
	},

	mounted() {
		this.renderDeviceStatu(this.deviceStatus);

		this.renderRateRingChart();

		this.initCarouselChart();

		this.renderInitEchartsRender();
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
					right: '10%', // 图例放置在右边
					top: 'center', // 垂直居中
					orient: 'vertical', // 设置图例纵向排列
					icon: 'circle',
					textStyle: {
						color: '#C5FFFE', // 设置字体颜色
					},
				},
				/* background: url(https://img.js.design/assets/img/64db2681c1f4a1f251392e0a.png);
				 */
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

		// 渲染百度地图
		renderBaiduMap() {
			this.mapInstance = new BMapGL.Map('map');
			this.mapInstance.enableScrollWheelZoom(true);
			const point = new BMapGL.Point(116.404, 39.925); // 地图中心点
			this.mapInstance.centerAndZoom(point, 15); // 创建地图并设置中心点
			this.mapInstance.setMapType(BMAP_SATELLITE_MAP); // 切换到卫星地图模式
			this.mapInstance.setMaxZoom(18); // 允许用户放大到18级

			const node = new BMapGL.Icon('https://img.js.design/assets/img/65f7d9a90a306d32b3048cc1.png', new BMapGL.Size(25, 25), {
				offset: new BMapGL.Size(0, 0),
			});

			var marker = new BMapGL.Marker(new BMapGL.Point(116.404, 39.925), { icon: node });
			this.mapInstance.addOverlay(marker);

			marker.addEventListener('click', function () {
				console.log('点击了');
			});

			this.mapInstance.addEventListener('tilesloaded', function () {
				console.log('地图渲染完成');
				// 在这里执行地图渲染完成后的操作
			});
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
			this.isLoading = true;
			clearTimeout(this.contentTimerId);
			this.currentlySelectedMap = type;
			if (type === 'baiduMap') {
				window.echarts.init(document.getElementById('ChinaMap')).dispose();

				this.contentTimerId = setTimeout(() => {
					this.renderBaiduMap();
					this.isLoading = false;
				}, 16);
			} else if (type === 'echarts') {
				this.destroyBaiduMaps();
				this.contentTimerId = setTimeout(() => {
					this.renderInitEchartsRender();
					this.isLoading = false;
				}, 16);
			}
		},

		// 销毁百度地图
		destroyBaiduMaps() {
			this.mapInstance && this.mapInstance.destroy();
			this.mapInstance = null;
		},

		// 渲染初始化echarts地图
		renderInitEchartsRender() {
			window.echarts.registerMap('中国', mapData);
			this.echartsMapExample = window.echarts.init(document.getElementById('ChinaMap'));
			this.echartsMapExample.setOption({
				geo: this.assemblingMapModules(),
				graphic: this.graphic,
				series: this.buildingScatterData(),
			});

		},

		// 渲染选中的省份
		renderSelectedEcharts() {
			this.graphic.length = 0;
			this.selectedProvince.length = 0;

			const data = [
				{ name: '北京市', value: 100 },
				{ name: '天津市', value: 200 },
				{ name: '上海市', value: 300 },
				{ name: '重庆市', value: 400 },
				{ name: '河北省', value: 500 },
				{ name: '香港特别行政区', value: 600 },
				{ name: '澳门特别行政区', value: 700 },
				{ name: '台湾省', value: 800 },
				{ name: '广东省', value: 900 },
				{ name: '广西壮族自治区', value: 1000 },
				{ name: '江苏省', value: 1100 },
				{ name: '浙江省', value: 1200 },
				{ name: '安徽省', value: 1300 },
				{ name: '福建省', value: 1400 },
				{ name: '江西省', value: 1500 },
				{ name: '山东省', value: 1600 },
				{ name: '河南省', value: 1700 },
				{ name: '湖北省', value: 1800 },
				{ name: '湖南省', value: 1900 },
				{ name: '四川省', value: 2000 },
				{ name: '海南省', value: 2100 },
			];

			data.forEach((item) => {
				const coordinate = window.mapChart.convertToPixel('geo', item.name); // 获取省份在界面中的像素坐标

				this.selectedProvince.push(this.buildSelectedData(item.name));

				// 修正指定省份的坐标
				if (item.name === '河北省') {
					coordinate[0] = coordinate[0] - 10;
					coordinate[1] = coordinate[1] + 20;
				} else if (item.name === '香港特别行政区') {
					coordinate[0] = coordinate[0] + 10;
					coordinate[1] = coordinate[1] + 5;
				} else if (item.name === '澳门特别行政区') {
					coordinate[0] = coordinate[0] - 10;
					coordinate[1] = coordinate[1] + 5;
				}

				this.graphic.push(this.buildProvincePromptData(coordinate[0] - x, coordinate[1] - y, item.value));
			});

			this.echartsMapExample.setOption({
				geo: this.assemblingMapModules(),
				graphic: this.graphic,
			}, ()=>{ 
				console.log('==')
			 });
		},

		// 构建地图选中数据
		buildSelectedData(provinceName) {
			return {
				name: provinceName,
				itemStyle: {
					areaColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#5e6ce1' }, // 渐变起点颜色
						{ offset: 1, color: '#5e6ce1' }, // 渐变终点颜色
					]),
				},
			};
		},

		buildProvincePromptData(left, top, value) {
			return {
				// 添加图片和文本
				type: 'group',
				left, // 图片位置居中
				top, // 图片位置居上
				children: [
					{
						type: 'image',
						style: {
							image: './img/椭圆形.png',
							width: 20,
							height: 20,
						},
						zlevel: 10,
					},
					{
						type: 'text',
						style: {
							text: value,
							x: 10, // 在图片上方居中位置
							y: 5,
							textAlign: 'center',
							textBaseline: 'middle',
							fill: '#fff',
						},
						zlevel: 11,
					},
				],
				zlevel: 10,
			};
		},

		// 组装地图模块数据
		assemblingMapModules() {
			const width1 = window.innerWidth;
			const mapBackground = [
				//地图背景
				{
					map: '中国',
					label: {
						show: false,
					},
					roam: false,
					top: width1 < 1400 ? 140 : 65,
					itemStyle: {
						areaColor: '#7fc4cc',
						borderColor: 'rgba(30,130,210,1)',
					},
					silent: true,
					zoom: 1.1,
				},
				{
					map: '中国',
					label: {
						show: false,
					},
					roam: false,

					top: width1 < 1400 ? 137 : 62,
					itemStyle: {
						areaColor: '#7fc4cc',
						borderColor: 'transparent',
					},
					silent: true,
					zoom: 1.1,
				},
				{
					map: '中国',
					label: {
						show: false,
					},
					roam: false,

					top: width1 < 1400 ? 134 : 59,
					itemStyle: {
						areaColor: '#7fc4cc',
						borderColor: 'transparent',
					},
					silent: true,
					zoom: 1.1,
				},
				{
					map: '中国',
					label: {
						show: false,
					},
					roam: false,

					top: width1 < 1400 ? 131 : 56,
					itemStyle: {
						areaColor: '#7fc4cc',
						borderColor: 'transparent',
					},
					silent: true,
					zoom: 1.1,
				},
				{
					map: '中国',
					label: {
						show: false,
					},
					roam: false,

					top: width1 < 1400 ? 128 : 53,
					itemStyle: {
						areaColor: '#7fc4cc',
						borderColor: 'transparent',
					},
					silent: true,
					zoom: 1.1,
				},
				//地图坐标,本层为最上层，上面是为了营造立体效果，可以删除上面的就是2d效果
				{
					map: '中国',
					label: {
						show: false, //是否显示版块标题
						textStyle: {
							color: '#5FB5FF',
							fontSize: 12,
						},
					},
					roam: false, // 是否开启滚轮缩放和拖拽漫游,默认为false（关闭），其他有效输入为true（开启），'scale'（仅开启滚轮缩放），'move'（仅开启拖拽漫游）
					top: width1 < 1400 ? 125 : 50,
					itemStyle: {
						areaColor: {
							type: 'linear-gradient',
							x: 1000,
							y: 4000,
							x2: 1000,
							y2: 0,
							colorStops: [
								{
									offset: 0.9,
									color: '#5e6ce1', // 0% 处的颜色
								},
								{
									offset: 1,
									color: '#5e6ce1', // 100% 处的颜色
								},
							],

							global: true, // 各省为 false
						},
						borderColor: '#1A39D0',
						borderWidth: 1,
					},
					emphasis: {
						// 鼠标放到地图上面显示
						itemStyle: {
							areaColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: '#2940FE' }, // 渐变起点颜色
								{ offset: 1, color: '#2940FE' }, // 渐变终点颜色
							]),
						},
						label: {
							color: '#fff',
							show: false,
						},
					},
					zoom: 1.1,
					regions: this.selectedProvince,
				},
			];

			return mapBackground;
		},

		// 构建散点数据
		buildingScatterData() {
			return [
				{
					type: 'effectScatter',
					coordinateSystem: 'geo', // 使用地理坐标系
					data: [
						{ name: '散点1', value: [116.405285, 41.5, 100] },
						{ name: '散点2', value: [117.190182, 40.425596, 100] },
						{ name: '散点3', value: [87.617733, 45.0928, 130] },
						// 继续添加更多的散点数据
					],

					rippleEffect: {
						//涟漪特效
						period: 2, //动画时间，值越小速度越快
						brushType: 'stroke', //波纹绘制方式 stroke, fill
						scale: 4, //波纹圆环最大限制，值越大波纹越大
					},

					symbolSize: function (val) {
						if (!val[2]) {
							return 10;
						}
						return val[2] / 10;
					},
					label: {
						show: true,
						position: 'right', // 文字位置
						formatter: '{b}', // 显示散点的名称
					},
					itemStyle: {
						color: '#FF0000', // 散点颜色
						shadowBlur: 10, // 散点阴影模糊大小,
						shadowColor: '#333', // 散点阴影颜色
					},
				},
			];
		},
	},
};
</script>


<style lang="scss" scoped>
@import url(./index.scss);
</style>