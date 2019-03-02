import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//  reset CSS
import "normalize.css";

import {
  Button, Table, TableColumn, Pagination, Loading, Form, FormItem, Input, Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem,
  Dropdown, DropdownMenu, DropdownItem, Row, Col, Message, Dialog, Select, Option, OptionGroup, Radio, RadioGroup, Switch, InputNumber,
  DatePicker, Tag, Upload, Scrollbar
} from 'element-ui';

Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
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
Vue.use(Row);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Switch);
Vue.use(InputNumber);
Vue.use(DatePicker);
Vue.use(Tag);
Vue.use(Upload);
Vue.use(Scrollbar);

Vue.use(Loading.directive);

Vue.prototype.$message = Message;

// 倒入 http 文件夹下的 index.js
import api from './api/index'
// 此时可以直接在 Vue 原型上调用 $api 了
Vue.use(api)

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
