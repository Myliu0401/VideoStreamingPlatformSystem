<template>
    <div class="workbench">
        <div class="workbench_titleBox">
            <h1 class="title">可视化大屏</h1>

            <div class="arrows" @click="$router.replace('/visualLargeScreen')">
                <img class="arrow" src="../../assets/workbench/right.png"></img>
                <img class="arrow"  src="../../assets/workbench/right.png"></img>
            </div>
        </div>


        <div class="items">
            <h4 class="title">设备数据</h4>
            <ul class="content">
               <li class="content_li">
                <div class="li_left">
                    <img class="li_img" src="../../assets/workbench/1.png"/>
                </div>
                
                <div class="li_div">
                    <span class="num">88</span>
                    <span class="text">设备总数</span>
                </div>
               </li>

               <li class="content_li">
                <div class="li_left">
                    <img class="li_img" src="../../assets/workbench/1.png"/>
                </div>
                
                <div class="li_div">
                    <span class="num">88</span>
                    <span class="text">设备总数</span>
                </div>
               </li>

               <li class="content_li">
                <div class="li_left">
                    <img class="li_img" src="../../assets/workbench/1.png"/>
                </div>
                
                <div class="li_div">
                    <span class="num">88</span>
                    <span class="text">设备总数</span>
                </div>
               </li>

               <li class="content_li">
                <div class="li_left">
                    <img class="li_img" src="../../assets/workbench/1.png"/>
                </div>
                
                <div class="li_div">
                    <span class="num">88</span>
                    <span class="text">设备总数</span>
                </div>
               </li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {

        }
    },

    created(){
        window.aa = this
    },
    methods:{
           
    }
}
</script>


<style lang="scss" scoped>
  @import url(./index.scss);
</style>