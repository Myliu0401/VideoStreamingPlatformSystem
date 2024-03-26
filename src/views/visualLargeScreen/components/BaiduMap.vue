<template>
	<div class="baiduMap" id="map"></div>
</template>


<script>
export default {
	data() {
		return {
			mapInstance: null, // 百度地图实例
		};
	},

	created() {
		
	},

	methods: {
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
		// 销毁百度地图
		destroyBaiduMaps() {
			window.echarts.init(document.getElementById('ChinaMap')).dispose();
			this.mapInstance && this.mapInstance.destroy();
			this.mapInstance = null;
		},
	},
};
</script>


<style lang="scss" scoped>
.baiduMap {
	width: 100%;
	height: 100%;
}
</style>