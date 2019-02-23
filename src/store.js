import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import CryptoJS from "crypto-js";
import http from "@/api/interface";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    app: {
      sidebar: {
        opened: !+Cookies.get('sidebarStatus'),
        withoutAnimation: false
      },
      device: 'desktop'
    },
    user: {
      name: '',
      avatar: '',
      loginState: false //登陆状态 用于刷新
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.app.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.app.sidebar.opened = !state.app.sidebar.opened
      state.app.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.app.sidebar.opened = false;
      state.app.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.app.device = device
    },
    SET_USER: (state, obj) => {
      state.user.name = obj.username;
      state.user.avatar = obj.avatar;
      state.user.loginState = true;
    },
    REMOVE_USER: (state) => {
      state.user.name = '';
      state.user.avatar = '';
      state.user.loginState = false;
    }
  },
  actions: {
    ToggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        http.getUserInfo().then(res => {
          if(res.resultCode == "1000"){
            commit('SET_USER', {
              username: res.value.username,
              avatar: res.value.avatar
            })
          }
          resolve(res)
        }).catch(error => {
          reject(error);
        })
      })
    },
    Login({ commit }, params) {
      let reqInfo = {
        username: params.username.trim(),
        password: CryptoJS.MD5(params.password).toString()
      };
      return new Promise((resolve, reject) => {
        http.userLogin(reqInfo).then(res => {
          if(res.resultCode == "1000"){
            window.localStorage.setItem("admin_token", res.value);
          }
          resolve(res)
        }).catch(error => {
          reject(error);
        })
      })
    },
    LogOut({ commit }) {
      return new Promise(resolve => {
        window.localStorage.removeItem('admin_token');
        commit('REMOVE_USER');
        resolve();
      })
    }
  },
  getters: {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    name: state => state.user.name,
    avatar: state => state.user.avatar,
    loginState: state => state.user.loginState
  }
})
