import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 倒入 http 文件夹下的 index.js
import api from './api/index'
// 此时可以直接在 Vue 原型上调用 $api 了
Vue.use(api)

//  reset CSS
import "normalize.css";

import {
  Button, Table, Form, FormItem, Input, Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem,
  Dropdown, DropdownMenu, DropdownItem, Scrollbar
} from 'element-ui';

Vue.use(Button);
Vue.use(Table);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Scrollbar);

import tcComponents from "@/components/index";
Vue.use(tcComponents);

import "./assets/iconfont/iconfont.css"
import '@/styles/index.scss' // global css

import '@/permission' // permission control

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
