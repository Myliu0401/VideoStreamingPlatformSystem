<template>
	<div class="realTimeMonitoring">
		<div class="realTimeMonitoring_timeZoneBox">
			<span class="span">{{ date }}</span>
			<span class="span">{{ time }}</span>
			<span class="span">{{ week }}</span>
		</div>

		<div class="realTimeMonitoring_main">
			<div class="main_left">
				<div class="titleBox">
					<h3 class="title">实时监控</h3>
				</div>

				<div class="navigation">
					<TreeShaped />
				</div>
			</div>
			<div class="main_content">
				<div class="contentBox"></div>
				<div class="optionArea">
					<div class="left">操作项</div>
					<div class="right">
						<div class="items" v-for="(items, index) in datas" :key="index">
							<div class="item" v-for="(item, index1) in items">
								<img :src="item.src" />
								<span>{{ item.text }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="main_right">
				<div class="titleBox">
					<h3 class="title">日历快速查询</h3>
				</div>
				<div class="calendarArea">
					<Calendar />
				</div>
				<div class="titleBox">
					<h3 class="title">监测项</h3>
				</div>
				<div class="myitems">
					<div class="item">
						<img class="item_img" src="../../../assets/monitoringLargeScreen/编组4.png" />
						<span class="item_text">图片视频</span>
					</div>

					<div class="item">
						<img class="item_img" src="../../../assets/monitoringLargeScreen/图片分组16.png" />
						<span class="item_text">实时视频</span>
					</div>

					<div class="item">
						<img class="item_img" src="../../../assets/monitoringLargeScreen/图片分组17.png" />
						<span class="item_text">监测项</span>
					</div>
				</div>

				<div class="titleBox">
					<h3 class="title">监拍点</h3>
				</div>

				<div class="myitems">
					<div class="item">
						<img class="item_img" src="../../../assets/monitoringLargeScreen/图片分组18.png" />
						<span class="item_text">小号测</span>
					</div>
					<div class="item">
						<img class="item_img" src="../../../assets/monitoringLargeScreen/图片分组18.png" />
						<span class="item_text">大号测</span>
					</div>
				</div>

				<div class="buttons">
					<button class="button">上一设备</button>
					<button class="button">下一设备</button>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import TreeShaped from '../components/TreeShaped.vue';
import src1 from '../../../assets/monitoringLargeScreen/图片分组.png';
import src2 from '../../../assets/monitoringLargeScreen/图片分组1.png';
import src3 from '../../../assets/monitoringLargeScreen/图片分组2.png';
import src4 from '../../../assets/monitoringLargeScreen/图片分组3.png';
import src5 from '../../../assets/monitoringLargeScreen/图片分组4.png';
import src6 from '../../../assets/monitoringLargeScreen/图片分组4.png';
import src7 from '../../../assets/monitoringLargeScreen/图片分组6.png';
import src8 from '../../../assets/monitoringLargeScreen/图片分组7.png';
import src9 from '../../../assets/monitoringLargeScreen/图片分组8.png';
import src10 from '../../../assets/monitoringLargeScreen/图片分组9.png';
import src11 from '../../../assets/monitoringLargeScreen/图片分组10.png';
import src12 from '../../../assets/monitoringLargeScreen/图片分组11.png';
import src13 from '../../../assets/monitoringLargeScreen/图片分组12.png';
import src14 from '../../../assets/monitoringLargeScreen/图片分组13.png';
import src15 from '../../../assets/monitoringLargeScreen/图片分组14.png';
import src17 from '../../../assets/monitoringLargeScreen/图片分组@2x.png';
import Calendar from '../components/Calendar.vue';
const datas = [
	[
		{ src: src1, text: '主动拍照' },
		{ src: src2, text: '主动录像' },
		{ src: src3, text: '声光报警' },
		{ src: src4, text: '图片调阅' },
		{ src: src5, text: '微信推送' },
		{ src: src6, text: '历史图片' },
		{ src: src7, text: '主动巡查' },
		{ src: src8, text: '图片标记' },
	],
	[
		{ src: src9, text: '补灯光' },
		{ src: src10, text: '超声波' },
		{ src: src11, text: '镜头除雾' },
		{ src: src12, text: '线缆绘制' },
		{ src: src13, text: '清除绘制' },
		{ src: src14, text: '测距' },
		{ src: src15, text: '巡线' },
		{ src: src17, text: '下发工单' },
	],
];

export default {
	components: {
		TreeShaped,
		Calendar,
	},
	data() {
		return {
			date: null,
			time: null,
			week: null,
			timeId: null,

			datas,
		};
	},
	created() {
		this.getCurrentDate();
		this.getCurrentDayOfWeek();
		this.getCurrentTime();
		this.timeId = setInterval(this.getCurrentTime, 1000);
	},

	beforeDestroy() {
		clearInterval(this.timeId);
	},

	methods: {
		getCurrentDate() {
			const today = new Date();
			const year = today.getFullYear();
			let month = today.getMonth() + 1;
			let day = today.getDate();
			month = month < 10 ? '0' + month : month;
			day = day < 10 ? '0' + day : day;

			this.date = `${year}-${month}-${day}`;
		},

		getCurrentTime() {
			const today = new Date();
			let hours = today.getHours();
			let minutes = today.getMinutes();
			let seconds = today.getSeconds();

			hours = hours < 10 ? '0' + hours : hours;
			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;

			this.time = `${hours} : ${minutes} : ${seconds}`;
		},

		getCurrentDayOfWeek() {
			const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
			const today = new Date();
			const dayOfWeek = today.getDay();

			this.week = daysOfWeek[dayOfWeek];
		},
	},
};
</script>


<style lang="scss" scoped>
.realTimeMonitoring {
	padding: 20px;
	height: 100%;

	.realTimeMonitoring_timeZoneBox {
		display: flex;
		align-items: center;
		position: absolute;
		top: -4%;
		right: 3%;

		.span {
			color: #fff;
			font-size: 15px;
			display: inline-block;
			margin-left: 25px;
		}
	}

	.realTimeMonitoring_main {
		width: 100%;
		height: 100%;
		display: flex;
		.main_left {
			width: 20%;
			height: 100%;
			margin-right: 20px;
			background-color: rgb(48 74 183 / 40%);

			.titleBox {
				width: 100%;
				padding-top: 10px;
				padding-bottom: 10px;
				border-bottom: 2px solid rgba(99, 235, 233, 1);

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

			.navigation {
				width: 100%;
				height: calc(100% - 45px);
				padding: 10px;
			}
		}

		.main_content {
			height: 100%;
			width: calc(60% - 40px);

			.contentBox {
				width: 100%;
				height: 75%;
				background: rgba(48, 74, 183, 0.4);
			}

			.optionArea {
				display: flex;
				align-items: center;
				height: calc(25% - 15px);
				margin-top: 10px;

				.left {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					font-size: 15px;
					background: radial-gradient(50% 50% at 50% 50%, rgba(99, 235, 233, 1) 0%, rgba(30, 103, 178, 1) 100%);
					height: 75%;
					width: 35px;
					writing-mode: vertical-rl; /* 设置文字垂直排列，从右向左 */
					letter-spacing: 4px; /* 设置字体间距 */
				}

				.right {
					width: calc(100% - 40px);
					margin-left: 5px;
					height: 100%;

					.items {
						display: flex;
						width: 100%;
						height: 50%;
						justify-content: space-between;
						.item {
							width: 11.7%;
							height: calc(100% - 5px);
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							background-color: rgba(48, 74, 183, 0.4);
							cursor: pointer;
							transition: all 0.3s;
							margin-bottom: 5px;

							&:hover {
								background-color: rgba(48, 74, 183, 0.8);
							}

							img {
								height: 40%;
							}

							span {
								color: #fff;
								font-size: 12px;
								display: inline-block;
								margin-top: 5px;
							}
						}
					}
				}
			}
		}

		.main_right {
			width: 20%;
			height: 100%;
			margin-left: 20px;

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

			.calendarArea {
				width: 100%;
				background: radial-gradient(50% 100% at 50% 50%, rgba(13, 39, 124, 1) 0%, rgba(48, 92, 139, 1) 100%);
				padding: 5px;
				margin-bottom: 10px;
			}

			.myitems {
				width: 100%;
				display: flex;
				margin-bottom: 10px;
				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 32%;
					height: 6vw;
					background-color: rgba(48, 74, 183, 0.4);
					justify-content: center;
					transition: all 0.3s;
					cursor: pointer;
					margin-right: 2.7%;

					&:last-child {
						margin-right: 0px;
					}

					&:hover {
						background-color: rgba(48, 74, 183, 0.8);
					}

					.item_img {
						height: 40%;
					}

					.item_text {
						display: inline-block;
						color: #fff;
						margin-top: 7px;
						font-size: 12px;
					}
				}
			}

			.buttons {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 25%;
				justify-content: end;

				.button {
					width: 70%;
					outline: none;
					border: none;
					cursor: pointer;
					background-color: rgba(24, 57, 190, 0.7);
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					height: 47px;
					font-size: 15px;
					margin-bottom: 10px;
					border: 1px solid rgba(99, 235, 233, 0.4);
					transition: all 0.1s;

					&:hover{
						border-color: rgba(99, 235, 233, 1);
						background-color: rgba(24, 57, 190, 1);
					}

					&:active{
						box-shadow: 0 0 10px rgba(18, 117, 230, 1);
					}
				}
			}
		}
	}
}
</style>