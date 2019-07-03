import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
axios.defaults.baseURL = 'http://192.168.110.189/minsheng' // 开发本地代理    http://192.168.110.208
axios.defaults.headers.post['Contenst-Type'] = 'application/json;'
axios.defaults.headers.common['token'] = store.state.token  // 在header中添加token
import { Loading, Message } from 'element-ui'

Vue.use(ElementUI);

Vue.prototype.$axios = axios

Vue.config.productionTip = false


// const myfilter = {
//   bzdate: (date) => {
//     if (date) {
//       let timestring = new Date(date)
//       return timestring.toLocaleDateString() + ' ' + timestring.toTimeString().substr(0, 8)
//     }
//   }
// }
// for (let key in myfilter) {
//   Vue.filter(key, myfilter[key])
// }
//添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (store.state.token) {
    config.headers.common['token'] = localStorage.getItem('token');
  }
  return config
}, function (error) {
  router.push('/login');
  return Promise.reject(error);
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
	// console.log(JSON.stringify(response)+"响应");
	if(response.data.msg=="no token"){
		Message.error({
			message:'登录已超时，请重新登录'
		});
		localStorage.clear();
		router.push('/login')
		
	}
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // store.commit('del_token');
        // localStorage.removeItem('token');
        localStorage.clear();
        router.push('/login')
    }
  }
  return Promise.reject(error)
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path !== '/login' && !localStorage.getItem('userInfo')) {
    next({path: '/login'})
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
