<template>
	<div class="sliderBar">
		<span class="text">{{ title }}</span>
		<div class="barBox" ref="barBox" @click="">
			<p class="barBox_bar" :style="{ width: schedule + 'px' }">
				<span class="drop" :class="{ down: isDown }" @mousedown="mousedown" ></span>
			</p>
		</div>
		<span class="text1">{{ myValue }}</span>
	</div>
</template>


<script>
export default {

    props: {
        title: {
            default: ''
        },

        maxValue: {
            default: 100
        },

        minValue: {
            default: 0
        },

        value: {
            default: 0
        }
    },

	data() {
		return {
            schedule: 11, // 当前进度条
            barBoxWidth: 0, // 进度条总宽度
            downX: 0, // 按住位置
            lastTimeX: 0, // 上一次的位置
            isDown: false, // 是否按住鼠标

            myValue: this.value, // 当前值
        };
	},

    mounted(){
       this.barBoxWidth = this.$refs.barBox.offsetWidth;
    },

    created(){
        this.init();
    },

    methods: {

        // 按下事件
        mousedown(e){
           this.downX = e.clientX;
           this.isDown = true;
           document.addEventListener('mousemove', this.mousemove);

           document.addEventListener('mouseup', this.mouseup);
        },

        // 移动事件
        mousemove(e){

            this.schedule = (e.clientX - this.downX) + this.lastTimeX;

            let value = this.schedule;

            if(this.schedule <= 11){
                this.schedule = 11;
            }else if(this.schedule >= (this.barBoxWidth)){
                this.schedule = this.barBoxWidth;
            };

            if(value <= 0){
               value = 0;
            }

            this.myValue = Math.ceil((this.schedule / this.barBoxWidth) * this.maxValue);

        },

        // 抬起事件
        mouseup(){

            this.lastTimeX = this.schedule;
            this.isDown = false;

             // 解绑事件
             document.removeEventListener('mousemove', this.mousemove);
             document.removeEventListener('mouseup', this.mouseup);
        },

        init(){
           this.schedule = (this.barBoxWidth / this.maxValue) * this.value;
           this.schedule = this.schedule <= 11 ? 11 : this.schedule;
        }
    }
};
</script>


<style lang="scss" scoped>
.sliderBar {
	display: flex;
	align-items: center;
	.text {
		color: rgba(197, 255, 254, 1);
        width: 50px;
        display: flex;
        justify-content: flex-end;
    }

    .text1{
        color: rgba(197, 255, 254, 1);
        display: flex;
        justify-content: flex-end;
        width: 30px;
        justify-content: flex-start;
    }

	.barBox {
		margin: 0px 10px;
		flex-grow: 1;
		height: 11px;
		border-radius: 8px;
		background-color: rgba(6, 75, 161, 1);
		cursor: pointer;
		position: relative;
		.barBox_bar {
			position: absolute;
			height: 100%;
            background: linear-gradient(270deg, rgba(99, 235, 233, 1) 0%, rgba(6, 118, 255, 1) 100%);
            border-radius: 8px;

			.drop {
				position: absolute;
				height: 100%;
				width: 11px;
				border-radius: 50%;
				background-color: rgba(255, 255, 255, 1);
                right: 0px;
              //  transform: translateX(100%);

				border: 1px solid rgba(99, 235, 233, 0.8);

               transition: all 0.3s;

               box-shadow: 0px 0px 1.5px 1.5px rgba(255, 255, 255, 0.5), 0px 0px 1px 1px rgba(0, 195, 255, 0.5);

               &:not(.down):hover{
                 box-shadow: 0px 0px 2.5px 2.5px rgba(255, 255, 255, 0.5), 0px 0px 2px 1px rgba(0, 195, 255, 0.5);
               }

               &.down{
                 box-shadow: 0px 0px 4px 4px rgba(255, 255, 255, 0.5), 0px 0px 4px 2px rgba(0, 195, 255, 0.5);
               }

			}
		}
	}
}
</style>