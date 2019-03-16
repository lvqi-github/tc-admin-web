import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout/Layout'
import tcRightMain from '@/components/TcRightMain'

Vue.use(Router)

export const routes = [{
  path: '/login',
  name: '登录页',
  component: resolve => require(['@/views/login/Login'], resolve),
  hidden: true
}, {
  path: '/',
  name: '工作台',
  component: Layout,
  iconCls: 'icon-shouyetianchong',
  leaf: true, //只有一个节点
  redirect: '/dashboard',
  children: [{
    path: '/dashboard',
    component: resolve => require(['@/views/dashboard/Dashboard'], resolve)
  }]
}, {
  path: '/systemManage',
  name: '系统管理',
  component: Layout,
  iconCls: 'icon-shezhitianchong',
  children: [{
    path: '/jobManage',
    name: 'Job管理',
    component: tcRightMain,
    isParent: true, //二级菜单
    redirect: '/jobManage/list',
    children: [{
      path: '/jobManage/list',
      name: 'job任务列表',
      component: resolve => require(['@/views/jobManage/JobList'], resolve)
    }]
  }]
}, {
  path: '/userManage',
  name: '用户管理',
  component: Layout,
  iconCls: 'icon-yonghutianchong',
  leaf: true, //只有一个节点
  redirect: '/user/list',
  children: [{
    path: '/user/list',
    name: '用户列表',
    component: resolve => require(['@/views/user/UserList'], resolve)
  }]
}, {
  path: '/memberManage',
  name: '会员生态管理',
  component: Layout,
  iconCls: 'icon-xinfengtianchong',
  children: [{
    path: '/member',
    name: '会员管理',
    component: tcRightMain,
    isParent: true, //二级菜单
    redirect: '/member/list',
    children: [{
      path: '/member/list',
      name: '会员列表',
      component: resolve => require(['@/views/member/MemberList'], resolve)
    }]
  }, {
    path: '/memberRechargePackage',
    name: '会员充值套餐管理',
    component: tcRightMain,
    isParent: true, //二级菜单
    redirect: '/memberRechargePackage/list',
    children: [{
      path: '/memberRechargePackage/list',
      name: '套餐列表',
      component: resolve => require(['@/views/memberRechargePackage/MemberRechargePackageList'], resolve)
    }, {
      path: '/memberRechargePackage/add',
      name: '套餐添加',
      component: resolve => require(['@/views/memberRechargePackage/MemberRechargePackageAdd'], resolve)
    }, {
      path: '/memberRechargePackage/update',
      name: '套餐修改',
      component: resolve => require(['@/views/memberRechargePackage/MemberRechargePackageUpdate'], resolve)
    }]
  }]
}, {
  path: '/saleManage',
  name: '销售管理',
  component: Layout,
  iconCls: 'icon-tupiantianchong',
  children: [{
    path: '/order',
    name: '订单管理',
    component: tcRightMain,
    isParent: true, //二级菜单
    redirect: '/order/list',
    children: [{
      path: '/order/list',
      name: '订单列表',
      component: resolve => require(['@/views/order/OrderList'], resolve)
    }]
  }, {
    path: '/memberRechargeRecord',
    name: '会员充值记录',
    component: tcRightMain,
    isParent: true, //二级菜单
    redirect: '/memberRechargeRecord/list',
    children: [{
      path: '/memberRechargeRecord/list',
      name: '充值记录列表',
      component: resolve => require(['@/views/memberRechargeRecord/MemberRechargeRecordList'], resolve)
    }]
  }, {
    path: '/articlePurchaseRecord',
    name: '文章购买记录',
    component: tcRightMain,
    isParent: true, //二级菜单
    redirect: '/articlePurchaseRecord/list',
    children: [{
      path: '/articlePurchaseRecord/list',
      name: '购买记录列表',
      component: resolve => require(['@/views/articlePurchaseRecord/ArticlePurchaseRecordList'], resolve)
    }]
  }]
}, {
  path: '/operationManage',
  name: '运营管理',
  component: Layout,
  iconCls: 'icon-fenleiorguangchangorqitatianchong',
  children: [{
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
  }, {
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
  }, {
    path: '/hitRecord',
    name: '战绩管理',
    component: tcRightMain,
    isParent: true, //二级菜单
    redirect: '/hitRecord/list',
    children: [{
      path: '/hitRecord/list',
      name: '战绩列表',
      component: resolve => require(['@/views/hitRecord/HitRecordList'], resolve)
    }, {
      path: '/hitRecord/add',
      name: '战绩添加',
      component: resolve => require(['@/views/hitRecord/HitRecordAdd'], resolve)
    }, {
      path: '/hitRecord/update',
      name: '战绩修改',
      component: resolve => require(['@/views/hitRecord/HitRecordUpdate'], resolve)
    }]
  }]
}, {
  path: '/subscribeManage',
  name: '订阅管理',
  component: Layout,
  iconCls: 'icon-anquantianchong',
  children: [{
    path: '/userAuthorSubscribe',
    name: '作者订阅管理',
    component: tcRightMain,
    isParent: true, //二级菜单
    redirect: '/userAuthorSubscribe/list',
    children: [{
      path: '/userAuthorSubscribe/list',
      name: '作者订阅列表',
      component: resolve => require(['@/views/userAuthorSubscribe/UserAuthorSubscribeList'], resolve)
    }]
  }, {
    path: '/templateMessagePush',
    name: '订阅推送管理',
    component: tcRightMain,
    isParent: true, //二级菜单
    redirect: '/templateMessagePush/list',
    children: [{
      path: '/templateMessagePush/list',
      name: '订阅推送列表',
      component: resolve => require(['@/views/templateMessagePush/TemplateMessagePushList'], resolve)
    }]
  }]
}];

export default new Router({
  routes: routes
})
