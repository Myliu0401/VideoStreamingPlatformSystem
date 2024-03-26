<template>
	<div class="calendar">
		<div class="calendar_titleBox">
			<div class="iconBox">
				<div class="icons" @click="switchYear('pre')">
					<i class="el-icon-caret-left"></i>
					<i class="el-icon-caret-left"></i>
				</div>
				<i class="icon el-icon-caret-left" @click="switchingMonths('pre')"></i>
			</div>
			<div class="titles">
				<span>{{ year }}</span>
				<span>{{ myMonth }}月</span>
			</div>
			<div class="iconBox">
				<i class="icon el-icon-caret-right" @click="switchingMonths('next')"></i>
				<div class="icons" @click="switchYear('next')">
					<i class="el-icon-caret-right"></i>
					<i class="el-icon-caret-right"></i>
				</div>
			</div>
		</div>

		<div class="weekTitles">
			<span>日</span>
			<span>一</span>
			<span>二</span>
			<span>三</span>
			<span>四</span>
			<span>五</span>
			<span>六</span>
		</div>

		<div class="contentBox">
			<li class="item" 
            :class="{ currentMonth: item.year == year && item.month == month, 
                active: activeYear == item.year && activeMonth == item.month && activeDay == item.day}" 
            v-for="(item, index) in datas" 
            :key="index">
				{{ item.day }}
			</li>
		</div>
	</div>
</template>



<script>
export default {
	data() {
		return {
			year: new Date().getFullYear(), // 年
			month: new Date().getMonth() + 1, // 月
            activeDay: new Date().getDate(),
            activeYear: new Date().getFullYear(), // 年
            activeMonth: new Date().getMonth() + 1, // 月
			datas: [],
		};
	},

	created() {
		this.datas = this.buildingData(this.year, this.month);
	},

	computed: {
		myMonth() {
			const obj = {
				1: '一',
				2: '二',
				3: '三',
				4: '四',
				5: '五',
				6: '六',
				7: '七',
				8: '八',
				9: '九',
				10: '十',
				11: '十一',
				12: '十二',
			};
			return obj[this.month];
		},
	},

	methods: {
		// 根据年月份获取1号是星期几
		getTheDayOfTheWeekOnThe1st(year = new Date().getFullYear(), month = new Date().getMonth() + 1) {
			// 创建一个 Date 对象，指定给定的年份和月份
			const firstDay = new Date(year, month - 1, 1);

			// 获取这个月1号是星期几（星期天为 0，星期一为 1，以此类推）
			const dayOfWeek = firstDay.getDay();

			return dayOfWeek;
		},

		// 构建渲染数据
		buildingData(year, month) {
			const week = this.getTheDayOfTheWeekOnThe1st(year, month);
			const arr = [];
			for (let i = 0; i < 42; i++) {
				const item = {
					date: null,
					year: null,
					month: null,
					day: null,
				};
				if (i < week) {
					item.date = new Date(year, month - 1, i - week);
				} else {
					item.date = new Date(year, month - 1, i - week + 1);
				}

				item.year = item.date.getFullYear();
				item.month = item.date.getMonth() + 1;
				item.day = item.date.getDate();
				arr.push(item);
			}

			return arr;
		},


        // 切换年
        switchYear(type){
             this.year = type === 'pre' ? this.year - 1 : this.year + 1;
             this.datas = this.buildingData(this.year, this.month);
        },


        // 切换月
        switchingMonths(type){
            
             if(type === 'pre' && this.month === 1){
                this.month = 12;
                this.year = this.year - 1;
             }else if(type === 'next' && this.month === 12){
                this.month = 1;
                this.year = this.year + 1;
             }else if(type === 'pre'){
                 this.month = this.month - 1;
             }else if(type === 'next'){ 
                 this.month = this.month + 1;
             };

             this.datas = this.buildingData(this.year, this.month);
        }
	},
};
</script>


<style lang="scss" scoped>
.calendar {
	.calendar_titleBox {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		.iconBox {
			display: flex;
			align-items: center;
			.icons {
				display: flex;
				align-items: center;
				font-size: 22px;
				cursor: pointer;
				color: #6ac3c2;
				transition: all 0.3s;

				&:hover {
					color: #23d8d5;
				}

				i:last-child {
					position: relative;
					left: -16px;
				}
			}
			.icon {
				font-size: 22px;
				cursor: pointer;
				color: #6ac3c2;
				transition: all 0.3s;
				&:hover {
					color: #23d8d5;
				}
			}
		}

		.iconBox:last-child {
			.icons {
				i:last-child {
					position: relative;
					left: 0px;
				}
				i:first-child {
					position: relative;
					right: -16px;
				}
			}
		}

		.titles {
			display: flex;
			align-items: center;
			color: #fff;
			flex-grow: 1;
			justify-content: space-around;
			span {
			}
		}
	}

	.weekTitles {
		display: flex;
		align-items: center;
		color: #fff;
		justify-content: space-around;
		flex-grow: 1;
		color: rgba(222, 36, 36, 1);
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 10px;
		span {
			display: inline-block;
			width: 14.28%;
			white-space: nowrap;
			font-size: 12px;
			text-align: center;
		}
	}

	.contentBox {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
		.item {
			width: 14.28%;
			list-style: none;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 1.7vw;
            cursor: pointer;
            color: #ccc;
            border-radius: 50%;
            transition: all 0.3s;

            &.currentMonth{
                color: #fff;
            }

            &.active{
                background: rgba(99, 235, 233, 1);
            }

            &:not(.active):hover{
                background: rgba(99, 235, 233, 0.4);
            }

		}
	}
}
</style>