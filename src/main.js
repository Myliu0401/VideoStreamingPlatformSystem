import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/index.css';
import Particles from 'vue-particles';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/theme/index.scss';
import { i18n } from '@/i18n/index.js';
import { globalComponentSize } from '@/utils/componentSize.js';

Vue.use(Particles);

Vue.use(Element, { i18n: (key, value) => i18n.t(key, value), size: globalComponentSize });

Vue.config.productionTip = false;
Vue.prototype.bus = new Vue();

Vue.prototype.formatTimestamp = (timestamp) => {
	// 创建一个 Date 对象并传入时间戳（单位为毫秒）
	var date = new Date(timestamp);

	// 获取年、月、日、时、分、秒
	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1，并确保两位数格式
	var day = ("0" + date.getDate()).slice(-2); // 确保两位数格式
	var hours = ("0" + date.getHours()).slice(-2); // 确保两位数格式
	var minutes = ("0" + date.getMinutes()).slice(-2); // 确保两位数格式
	var seconds = ("0" + date.getSeconds()).slice(-2); // 确保两位数格式

	// 拼接日期时间字符串
	var formattedDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

	return formattedDate;
};



window.aa = new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App),
}).$mount('#app');
