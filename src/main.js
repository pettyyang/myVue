// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

//引入初始化css
import './assets/css/common.css'

Vue.config.productionTip = false

//引入mint-ui全部组件
import MintUI from 'mint-ui'
Vue.use(MintUI)

//mint-ui全局css样式引入
import 'mint-ui/lib/style.css'

//用原型形式使用Axios
Vue.prototype.$http = Axios;
Axios.defaults.baseURL = "https://some-domain.com/api/";

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})