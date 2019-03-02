import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout/Layout'
import tcRightMain from '@/components/TcRightMain'

Vue.use(Router)

export const routes = [
  {
    path: '/login',
    name: '登录页',
    component: resolve => require(['@/views/login/Login'], resolve),
    hidden: true
  },
  {
    path: '/',
    name: '工作台',
    component: Layout,
    iconCls: 'icon-xiugai',
    leaf: true, //只有一个节点
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      component: resolve => require(['@/views/dashboard/Dashboard'], resolve)
    }]
  },
  {
    path: '/subscribe',
    name: '订阅管理',
    component: Layout,
    iconCls: 'icon-anquantianchong',
    leaf: true, //只有一个节点
    redirect: '/subscribe/list',
    children: [
      {
        path: '/subscribe/list',
        name: '订阅列表',
        component: resolve => require(['@/views/subscribe/SubscribeList'], resolve)
      },
      {
        path: '/subscribe/add',
        name: '新增订阅',
        component: resolve => require(['@/views/subscribe/SubscribeAdd'], resolve)
      }
    ]
  },
  {
    path: '/operation',
    name: '运营管理',
    component: Layout,
    iconCls: 'icon-fenleiorguangchangorqitatianchong',
    children: [
      {
        path: '/author',
        name: '作者管理',
        component: tcRightMain,
        isParent: true, //二级菜单
        redirect: '/author/list',
        children: [{
          path: '/author/list',
          name: '作者列表',
          component: resolve => require(['@/views/author/AuthorList'], resolve)
        }]
      },
      {
        path: '/article',
        name: '文章管理',
        component: tcRightMain,
        isParent: true, //二级菜单
        redirect: '/article/list',
        children: [{
          path: '/article/list',
          name: '文章列表',
          component: resolve => require(['@/views/article/ArticleList'], resolve)
        }, {
          path: '/article/add',
          name: '文章添加',
          component: resolve => require(['@/views/article/ArticleAdd'], resolve)
        }, {
          path: '/article/update',
          name: '文章修改',
          component: resolve => require(['@/views/article/ArticleUpdate'], resolve)
        }]
      },
      {
        path: '/record',
        name: '战绩管理',
        component: tcRightMain,
        isParent: true, //二级菜单
        redirect: '/record/list',
        children: [{
          path: '/record/list',
          name: '战绩列表',
          component: resolve => require(['@/views/record/RecordList'], resolve)
        }, {
          path: '/record/add',
          name: '战绩添加',
          component: resolve => require(['@/views/record/RecordAdd'], resolve)
        }, {
          path: '/record/update',
          name: '战绩修改',
          component: resolve => require(['@/views/record/RecordUpdate'], resolve)
        }]
      }
    ]
  }
];

export default new Router({
  routes: routes
})
