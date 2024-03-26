<template>
	<div class="home">
		<div class="homeBaiduMap" id="homeBaiduMap"></div>

		<div class="home_left">
			<div class="left_top">
				<div class="link">
					<div class="titleBox">
						<h3 class="title">实时监控</h3>
					</div>
				</div>

				<div class="contentBox">
					<TreeShaped />
				</div>
			</div>

			<div class="left_bottom">
				<div class="titleBox">
					<h3 class="title">告警信息</h3>
				</div>
				<div class="contentBox">
					<ul class="contentBox_ul">
						<li class="ul_li">
							<span class="text">9月22日</span>
							<p class="text">1.降雨可能导电，还要多注意施工的地点。</p>
							<p class="text">2.降雨可能导电，还要多注意施工的地点。</p>
						</li>

						<li class="ul_li">
							<span class="text">9月22日</span>
							<p class="text">1.降雨可能导电，还要多注意施工的地点。</p>
							<p class="text">2.降雨可能导电，还要多注意施工的地点。</p>
						</li>

						<li class="ul_li">
							<span class="text">9月22日</span>
							<p class="text">1.降雨可能导电，还要多注意施工的地点。</p>
							<p class="text">2.降雨可能导电，还要多注意施工的地点。</p>
						</li>

						<li class="ul_li">
							<span class="text">9月22日</span>
							<p class="text">1.降雨可能导电，还要多注意施工的地点。</p>
							<p class="text">2.降雨可能导电，还要多注意施工的地点。</p>
						</li>

						<li class="ul_li">
							<span class="text">9月22日</span>
							<p class="text">1.降雨可能导电，还要多注意施工的地点。</p>
							<p class="text">2.降雨可能导电，还要多注意施工的地点。</p>
						</li>

						<li class="ul_li">
							<span class="text">9月22日</span>
							<p class="text">1.降雨可能导电，还要多注意施工的地点。</p>
							<p class="text">2.降雨可能导电，还要多注意施工的地点。</p>
						</li>

						<li class="ul_li">
							<span class="text">9月22日</span>
							<p class="text">1.降雨可能导电，还要多注意施工的地点。</p>
							<p class="text">2.降雨可能导电，还要多注意施工的地点。</p>
						</li>

						<li class="ul_li">
							<span class="text">9月22日</span>
							<p class="text">1.降雨可能导电，还要多注意施工的地点。</p>
							<p class="text">2.降雨可能导电，还要多注意施工的地点。</p>
						</li>

						<li class="ul_li">
							<span class="text">9月22日</span>
							<p class="text">1.降雨可能导电，还要多注意施工的地点。</p>
							<p class="text">2.降雨可能导电，还要多注意施工的地点。</p>
						</li>

						<li class="ul_li">
							<span class="text">9月22日</span>
							<p class="text">1.降雨可能导电，还要多注意施工的地点。</p>
							<p class="text">2.降雨可能导电，还要多注意施工的地点。</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="home_center">
			<div class="item">
				<span class="num">0</span>
				<span class="text">告警总数</span>
			</div>
			<div class="item">
				<span class="num">0</span>
				<span class="text">已处理</span>
			</div>
			<div class="item">
				<span class="num">0</span>
				<span class="text">未处理</span>
			</div>
		</div>

		<div class="home_right">
			<div class="titleBox">
				<h3 class="title">装置信息统计</h3>
			</div>

            <div class="itemBox1"></div>
		</div>
	</div>
</template>



<script>
import TreeShaped from '../components/TreeShaped.vue';
export default {
	components: {
		TreeShaped,
	},
	data() {
		return {
			baiduMap: null,
		};
	},

	mounted() {
		this.initBaiduMap();
	},

	beforeDestroy() {
		this.destroyBaiduMaps();
	},

	methods: {
		// 初始化百度地图
		initBaiduMap() {
			this.baiduMap = new BMapGL.Map('homeBaiduMap');
			this.baiduMap.enableScrollWheelZoom(true);
			const point = new BMapGL.Point(116.404, 39.925); // 地图中心点
			this.baiduMap.centerAndZoom(point, 15); // 创建地图并设置中心点
			this.baiduMap.setMapType(BMAP_SATELLITE_MAP); // 切换到卫星地图模式
			this.baiduMap.setMaxZoom(18); // 允许用户放大到18级

			this.addIconsAndText();

			this.baiduMap.addEventListener('tilesloaded', function () {
				console.log('地图渲染完成');
				// 在这里执行地图渲染完成后的操作
			});
		},

		// 销毁百度地图
		destroyBaiduMaps() {
			window.echarts.init(document.getElementById('homeBaiduMap')).dispose();
			this.baiduMap && this.baiduMap.destroy();
			this.baiduMap = null;
		},

		// 添加图标和文本
		addIconsAndText() {
			const datas = [
				{
					num: '100',
					lon: 116.404,
					lat: 39.925,
				},
				{
					num: '90',
					lon: 116.504,
					lat: 39.82,
				},
				{
					num: '1230',
					lon: 116.304,
					lat: 39.725,
				},
			];

			for (let i = 0; i < datas.length; i++) {
				const item = datas[i];
				const longLate = new BMapGL.Point(item.lon, item.lat);
				const node = new BMapGL.Icon('https://img.js.design/assets/img/65f7d9aac89915b1ea84e5d5.png', new BMapGL.Size(75, 75), {
					offset: new BMapGL.Size(30, 30),
				});
				const content = item.num;
				// 动态计算文本宽度
				var textWidth = content.length * 17; // 17px 是字体大小

				// 创建文本标注
				const label = new BMapGL.Label(content, {
					position: longLate,
					offset: new BMapGL.Size(-textWidth / 6, -10),
				});
				label.setStyle({
					// 设置label的样式
					color: '#fff',
					fontSize: '17px',
					backgroundColor: 'rgba(255, 255, 255, 0)', // 透明背景色
					border: 'none', // 没有边框
				});
				const marker = new BMapGL.Marker(longLate, { icon: node });
				this.baiduMap.addOverlay(marker);
				this.baiduMap.addOverlay(label); // 将标注添加到地图中

				marker.addEventListener('click', function () {
					console.log('点击了');
				});
			}
		},
	},
};
</script>


<style lang="scss" scoped>
.home {
	padding-left: 15px;
	padding-right: 15px;
	width: 100vw;
	height: calc(99.9vh - 48px);
	position: relative;

	.homeBaiduMap {
		width: 100vw;
		height: 99.9vh;
		position: fixed !important;
		top: 0px;
		left: 0px;
	}

	.titleBox {
		width: 100%;
		padding-bottom: 10px;

		.title {
			margin: 0 auto;
			width: 90%;
			height: 35px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: normal;
			color: #fff;
			background: radial-gradient(50% 100% at 50% 50%, rgba(99, 235, 233, 1) 0%, rgba(30, 103, 178, 1) 100%);
			font-size: 14px;
		}
	}

	.home_left {
		position: relative;
		z-index: 111;
		width: 18vw;
		height: calc(100vh - 48px);
		padding-top: 3%;
		.left_top {
			width: 90%;
			margin: 0 auto;
			height: 42vh;
			background: rgba(54, 86, 126, 0.8);
			padding-top: 10px;

			.link {
				border-bottom: 2px solid rgba(99, 235, 233, 1);
			}

			.contentBox {
				height: 86%;
				padding-top: 10px;
			}
		}

		.left_bottom {
			margin-top: 45px;

			.contentBox {
				width: 100%;
				margin-top: 7px;
				height: 35vh;
				background: rgba(54, 86, 126, 0.8);
				padding: 7px;
				overflow: auto;

				/* WebKit 浏览器 */
				&::-webkit-scrollbar {
					width: 4px; /* 滚动条宽度 */
				}

				&::-webkit-scrollbar-thumb {
					background-color: rgb(49, 177, 166); /* 滚动条拖动部分的背景色 */
					border-radius: 6px; /* 滚动条拖动部分的圆角 */
				}

				&::-webkit-scrollbar-thumb:hover {
					background-color: rgb(49, 177, 166); /* 鼠标悬停时滚动条拖动部分的背景色 */
				}

				.contentBox_ul {
					.ul_li {
						list-style: none;
						margin-bottom: 6px;

						.text {
							color: rgba(252, 252, 252, 1);
							font-size: 12px;
							margin-bottom: 3px;
							display: inline-block;
						}
					}
				}
			}
		}
	}

	.home_center {
		width: 40vw;
		height: 150px;
		background: rgba(54, 86, 126, 0.8);
		position: absolute;
		bottom: 3%;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		justify-content: center;

		.item {
			width: 110px;
			height: 100px;
			margin: 0px 15px;
			background-size: cover;
			background-image: url(../../../assets/monitoringLargeScreen/4.png);
			position: relative;
			top: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.num {
				position: relative;
				left: 5px;
				top: -30px;
				font-size: 18px;
			}

			.text {
				color: #fff;
				font-size: 13px;
				position: relative;
				left: 7px;
				top: -23px;
			}

			&:nth-child(1) {
				color: rgba(254, 232, 58, 1);
			}
			&:nth-child(2) {
				color: rgba(99, 235, 233, 1);
			}
			&:nth-child(3) {
				color: rgba(227, 28, 28, 1);
			}
		}
	}

	.home_right {
		width: 18vw;
		height: calc(100vh - 48px);
		padding-top: 3%;
		position: absolute;
		right: 17px;
		top: 0px;


        .itemBox1{
            margin-top: 20px;
            width: 100%;
            height: 25vh;
        }
	}
}
</style>

<style lang="scss">
.home {
	.home_left {
		.left_top {
			.contentBox {
				.treeShaped {
					.treeShaped_contentBox {
						.item {
							.item_div {
								&:hover {
									background-color: rgba(9, 57, 249, 0.7);
								}

								&.active {
									background-color: rgba(9, 57, 249, 0.7);
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>