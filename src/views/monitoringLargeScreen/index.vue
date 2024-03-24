<template>
    <div class="monitoringLargeScreen">
        <div class="monitoringLargeScreen_titleBox">
            <ul class="ulBox" @click="switchPages">
                <li class="li" :class="{ active: activePage === 'activeHome' }" 
                data-type="activeHome"><span data-type="activeHome">首页</span></li>
                <li class="li" :class="{ active: activePage === 'realTimeMonitoring' }" 
                data-type="realTimeMonitoring"><span data-type="realTimeMonitoring">实时监控</span></li>
                <li class="li" :class="{ active: activePage === 'deviceList' }" 
                data-type="deviceList"><span data-type="deviceList">设备列表</span></li>
            </ul>
        </div>

        <div class="monitoringLargeScreen_page">
            <DeviceList v-if="activePage ===  'deviceList'" />
            <RealTimeMonitoringVue v-else-if="activePage === 'realTimeMonitoring'" />
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
import RealTimeMonitoringVue from './pages/realTimeMonitoring.vue'
export default {
    components: {
        DeviceList,
        RealTimeMonitoringVue
    },
    data(){
        return { 
             activePage: 'realTimeMonitoring', // 选中的页面
        }
    },


    methods: {

        // 切换页面
        switchPages(e){
           const type = e.target.dataset.type;
           if(type === this.activePage){
             return;
           };

           this.activePage = type;
        }
    }
}
</script>


<style lang="scss" scoped>
  @import url(./index.scss);
</style>