<template>
    <div class="monitoringLargeScreen">
        <div class="monitoringLargeScreen_titleBox">
            <ul class="ulBox">
                <li class="li active"><span>首页</span></li>
                <li class="li"><span>实时监控</span></li>
                <li class="li"><span>设备列表</span></li>
            </ul>
        </div>

        <div class="monitoringLargeScreen_page">
            <DeviceList />
        </div>



      <template>
        <div class="back1"></div>
        <div class="back2"></div>
        <div class="back3"></div>
      </template>
        
    </div>
</template>


<script>
import DeviceList from './pages/deviceList.vue'
export default {
    components: {
        DeviceList
    },
    data(){
        return {

        }
    }
}
</script>


<style lang="scss" scoped>
  @import url(./index.scss);
</style>