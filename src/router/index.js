import Vue from 'vue';
import store from '../store';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {
	Session
} from '@/utils/storage';
import {
	PrevLoading
} from '@/utils/loading.js';
import {
	useMenuApi
} from '@/api/menu';

const menuApi = useMenuApi();

// 解决 `element ui` 导航栏重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

// 安装 VueRouter 插件
Vue.use(VueRouter);

// 定义动态路由
const dynamicRoutes = [{
		path: '/',
		name: '/',
		component: 'layout/index',
		redirect: '/home',
		meta: {
			isKeepAlive: true,
		},
		children: [{
				path: '/home',
				name: "home",
				component: "workbench",
				meta: {
					title: "message.router.workbench",
					isLink: "",
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					roles: ["admin", "common"],
					icon: "el-icon-s-platform"
				}
			},
			{
				path: '/realTimeVideo',
				name: "realTimeVideo",
				component: "realTimeVideo",
				meta: {
					title: "message.router.realTimeVideo",
					isLink: "",
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					roles: ["admin", "common"],
					icon: "el-icon-s-ticket"
				}
			},
			{
				path: '/imageManagement',
				name: "imageManagement",
				component: "imageManagement",
				meta: {
					title: "message.router.imageManagement",
					isLink: "",
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					roles: ["admin", "common"],
					icon: "el-icon-picture"
				}
			},
			{
				path: '/videoRecordingManagement',
				name: "videoRecordingManagement",
				component: "videoRecordingManagement",
				meta: {
					title: "message.router.videoRecordingManagement",
					isLink: "",
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					roles: ["admin", "common"],
					icon: "el-icon-video-camera-solid"
				}
			},
			{
				path: '/deviceManagement',
				name: "deviceManagement",
				component: "layout/routerView/parent",
				redirect: "/deviceManagement/routeManagement",
				meta: {
					title: "message.router.deviceManagement",
					isLink: "",
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					roles: ["admin", "common"],
					icon: "el-icon-s-marketing"
				},
				children: [{
						path: '/deviceManagement/routeManagement',
						name: "routeManagement",
						component: "deviceManagement/routeManagement",
						meta: {
							title: "message.router.routeManagement",
							isLink: "",
							isHide: false,
							isKeepAlive: true,
							isAffix: true,
							isIframe: false,
							roles: ["admin", "common"],

						},
					},
					{
						path: '/deviceManagement/towerManagement',
						name: "towerManagement",
						component: "deviceManagement/towerManagement",
						meta: {
							title: "message.router.towerManagement",
							isLink: "",
							isHide: false,
							isKeepAlive: true,
							isAffix: true,
							isIframe: false,
							roles: ["admin", "common"],

						},
					},
					{
						path: '/deviceManagement/deviceManagement',
						name: "deviceManagement",
						component: "deviceManagement/deviceManagement",
						meta: {
							title: "message.router.deviceManagement",
							isLink: "",
							isHide: false,
							isKeepAlive: true,
							isAffix: true,
							isIframe: false,
							roles: ["admin", "common"],

						},
					}
				]
			}
		],
		pathToRegexpOptions: {
			strict: true
		},
		// 使用exact属性进行严格匹配
		exact: true
	},
	{
		path: '/visualLargeScreen',
		name: 'visualLargeScreen',
		component: 'visualLargeScreen',
		meta: {
			isKeepAlive: true
		},
		children: []
	},
	{
		path: '/monitoringLargeScreen',
		name: 'monitoringLargeScreen',
		component: 'monitoringLargeScreen',
		meta: {
			isKeepAlive: true
		},
		children: []
	}
];

// 定义静态路由
const staticRoutes = [{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login'),
		meta: {
			title: '登录',
		},
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import('@/views/error/404.vue'),
		meta: {
			title: 'message.staticRoutes.notFound',
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('@/views/error/401.vue'),
		meta: {
			title: 'message.staticRoutes.noPower',
		},
	}
];

// 加载静态路由
const createRouter = () =>
	new VueRouter({
		routes: staticRoutes,
		mode: 'history'
	});

// 创建路由
const router = createRouter();

// 加载 loading
//PrevLoading.start();

// 多级嵌套数组处理成一维数组
export function formatFlatteningRoutes(arr) {
	if (arr.length <= 0) return false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children) {
			arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
		}
	}
	return arr;
}

// 处理 tagsViewList 数据，默认路由全部缓存
// isKeepAlive 处理 `name` 值，进行路由缓存
export function formatTwoStageRoutes(arr) {
	if (arr.length <= 0) return false;
	const newArr = [];
	const cacheList = [];
	arr.forEach((v) => {
		newArr.push({
			...v
		});
		cacheList.push(v.name);
		store.dispatch('keepAliveNames/setCacheKeepAlive', cacheList);
	});
	return newArr;
}

// 判断路由 meta.roles 中是否包含当前登录用户权限字段
export function hasAuth(roles, route) {

	if (route.meta && route.meta.roles) {
		return roles.some((role) => {
			return route.meta.roles.includes(role)
		});
	} else {
		return true;
	}
}

// 递归过滤有权限的路由
export function setFilterMenuFun(routes, role) {
	const menu = [];

	routes.forEach((route) => {
		const item = {
			...route
		};

		// 判断配置中有没有包含该权限
		if (hasAuth(role, item)) {
			if (item.children) {
				item.children = setFilterMenuFun(item.children, role);
			}
			menu.push(item);
		}
	});
	return menu;
}

// 缓存多级嵌套数组处理后的一维数组(tagsView、菜单搜索中使用：未过滤隐藏的(isHide))
export function setCacheTagsViewRoutes(arr) {
	// 先处理有权限的路由，否则 tagsView、菜单搜索中无权限的路由也将显示
	let rolesRoutes = setFilterMenuFun(arr, store.state.userInfos.userInfos.roles);


	// 添加到 vuex setTagsViewRoutes 中
	store.dispatch('tagsViewRoutes/setTagsViewRoutes', formatTwoStageRoutes(formatFlatteningRoutes(rolesRoutes)));
}

// 递归处理多余的 layout : <router-view>，让需要访问的组件保持在第一层 layout 层。
// 因为 `keep-alive` 只能缓存二级路由
// 默认初始化时就执行
export function keepAliveSplice(to) {

	if (to.matched && to.matched.length > 2) {
		to.matched.map((v, k) => {

			if (v.components.default instanceof Function) {
				v.components.default().then((components) => {
					if (components.default.name === 'parent') {
						to.matched.splice(k, 1);
						router.push({
							path: to.path,
							query: to.query
						});
						keepAliveSplice(to);
					}
				});
			} else {
				if (v.components.default.name === 'parent') {
					to.matched.splice(k, 1);
					keepAliveSplice(to);
				}
			}
		});
	}
}

// 处理后端返回的 `component` 路径，拼装实现懒加载
export function loadView(path) {
	/**
	 * 打包成一个 js、一个 css
	 */
	// if (path.indexOf('layout') > -1) return () => Promise.resolve(require(`@/${path}`));
	// else return () => Promise.resolve(require(`@/views/${path}`));

	/**
	 * 打包成多个 js、多个 css
	 */
	if (path.indexOf('layout') > -1) {
		return () => import(`@/${path}`);
	} else {
		return () => import(`@/views/${path}`)
	};
};

// 递归处理每一项 `component` 中的路径
export function dynamicRouter(routes) {
	return routes.map((view) => {
		if (view.component) { // 判断是否有路径
			view.component = loadView(view.component); // 会将其转换成组件
		};
		if (view.children) { // 判断是否有子级路由
			dynamicRouter(view.children);
		};
		return view;
	});
};

// 添加路由，模拟数据与方法，可自行进行修改 admin
// 添加动态路由，`{ path: '*', redirect: '/404' }` 防止页面刷新，静态路由丢失问题
// next({ ...to, replace: true }) 动态路由 addRoute 完毕后才放行，防止刷新时 NProgress 进度条加载2次
// 文档地址：https://router.vuejs.org/zh/api/#router-addroutes
export async function adminUser(router, to, next) {


	resetRouter(); // 重置路由信息
	try {
		//const res = await menuApi.getMenuAdmin(); // 获取后端动态路由菜单

		store.dispatch('userInfos/setUserInfos'); // 设置用户信息

		// 添加有权限的路由
		store.dispatch('routesList/setRoutesList', setFilterMenuFun(dynamicRoutes[0].children, store.state.userInfos.userInfos.roles));

		//	dynamicRoutes[0].children = res.data; // 获取路由数据

		const awaitRoute = await dynamicRouter(dynamicRoutes); // 递归路由配置

		console.log(awaitRoute, '=============');

		[...awaitRoute, {
			path: '*',
			redirect: '/404'
		}].forEach((route) => {
			router.addRoute({
				...route
			}); // 添加路由规则
		});



		//setCacheTagsViewRoutes(JSON.parse(JSON.stringify(res.data)));

		setCacheTagsViewRoutes(JSON.parse(JSON.stringify(dynamicRoutes[0].children)));
		next({
			...to,
			replace: true
		}); // 跳转路由


	} catch (err) {

	};
};



// 添加路由，模拟数据与方法，可自行进行修改 test
// 添加动态路由，`{ path: '*', redirect: '/404' }` 防止页面刷新，静态路由丢失问题
export function testUser(router, to, next) {
	resetRouter();
	menuApi
		.getMenuTest()
		.then(async (res) => {
			// 读取用户信息，获取对应权限进行判断
			store.dispatch('userInfos/setUserInfos');
			store.dispatch('routesList/setRoutesList', setFilterMenuFun(res.data, store.state.userInfos.userInfos.roles));
			//dynamicRoutes[0].children = res.data;
			//const awaitRoute = await dynamicRouter(dynamicRoutes);
			[...awaitRoute, {
				path: '*',
				redirect: '/404'
			}].forEach((route) => {
				router.addRoute({
					...route
				});
			});
			setCacheTagsViewRoutes(JSON.parse(JSON.stringify(res.data)));
			next({
				...to,
				replace: true
			});
		})
		.catch(() => {});
}

// 重置路由
export function resetRouter() {

	router.matcher = router.matcher // createRouter().matcher;
}

// 延迟关闭进度条
export function delayNProgressDone(time = 300) {
	setTimeout(() => {
		NProgress.done();
	}, time);
}

// 动态加载后端返回路由路由(模拟数据)
export function getRouterList(router, to, next) {

	if (!Session.get('userInfo')) { // 获取用户信息
		Session.remove('token'); // 删除令牌
		next('/login'); // 回到登录页
		return false;
	} else if (Session.get('userInfo').userName === 'admin') { // 判断是否是管理员
		adminUser(router, to, next);
	} else if (Session.get('userInfo').userName === 'test') { // 普通用户
		testUser(router, to, next);
	}
}

// 路由加载前
router.beforeEach((to, from, next) => {
	keepAliveSplice(to);
	NProgress.configure({
		showSpinner: false
	});
	if (to.meta.title && to.path !== '/login') {
		NProgress.start();
	};
	let token = Session.get('token'); // 获取令牌
	if (to.path === '/login' && !token) {
		NProgress.start();
		next();
		delayNProgressDone();
	} else {

		// 判断是否有令牌
		if (!token) {
			NProgress.start();
			next('/login');
			Session.clear();
			delayNProgressDone();
		} else if (token && to.path === '/login') {
			next('/home');
			delayNProgressDone();
		} else {
			if (Object.keys(store.state.routesList.routesList).length <= 0) {
				getRouterList(router, to, next);
			} else {
				next();
				delayNProgressDone(0); // 关闭进度条
			}
		}
	}
});

// 路由加载后
router.afterEach(() => {
	PrevLoading.done(); // 暂停加载
	delayNProgressDone(); // 进度条完毕
});

// 导出路由
export default router;