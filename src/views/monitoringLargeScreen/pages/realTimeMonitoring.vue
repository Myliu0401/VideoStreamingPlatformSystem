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
                    <h3 class="title">设备列表</h3>
                </div>
            </div>
            <div class="main_content"></div>
            <div class="main_right"></div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            date: null,
            time: null,
            week: null,
            timeId: null
        }
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
            const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            const today = new Date();
            const dayOfWeek = today.getDay();

            this.week = daysOfWeek[dayOfWeek];
        },



    }
}
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


    .realTimeMonitoring_main{
        width: 100%;
        height: 100%;
        display: flex;
        .main_left{
            width: 20%;
            height: 100%;
            margin-right: 20px;
            background-color: rgb(48 74 183 / 40%);

            .titleBox{
                width: 100%;
                padding-top: 10px;
                padding-bottom: 10px;
                border-bottom: 2px solid rgba(99, 235, 233, 1);

                .title{
                    margin: 0 auto;
                    width: 90%;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: normal;
                    color: #fff;
                    background: radial-gradient(50% 100% at 50% 50%, rgba(99, 235, 233, 1) 0%, rgba(30, 103, 178, 1) 100%);
                    font-size: 14px;
                }

            }
        }

        .main_content{
           height: 100%;
           width: calc(60% - 40px);
        }

        .main_right{
            width: 20%;
            height: 100%;
            margin-left: 20px;
        }
    }
}
</style>