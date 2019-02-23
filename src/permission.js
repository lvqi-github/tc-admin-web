import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

router.beforeEach((to, from, next) => {
    NProgress.start()
    let token = localStorage.getItem('admin_token'); //登录标示
    let loginState = store.state.user.loginState;
    if (!token) {
        if (to.path == '/login') {
            next()
        }else {
            next('/login');
            NProgress.done();
        }
    }else {
        if (loginState) {
            if (to.path == '/login'){
                next({ path: '/' })
                NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
            }else {
                next()
            }
        }else {
            store.dispatch('GetUserInfo').then(res => { // 拉取用户信息
                if (res.resultCode == "1000") {
                    if (to.path == '/login'){
                        next({ path: '/' })
                        NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
                    }else {
                        next()
                    }
                }
            })
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})