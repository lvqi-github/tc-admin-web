import TcHamburger from "@/components/TcHamburger.vue";
import TcBreadcrumb from "@/components/TcBreadcrumb.vue";
import TcLeftMenu from "@/components/TcLeftMenu.vue";
import TcRightTop from "@/components/TcRightTop.vue";
import TcRightMain from "@/components/TcRightMain.vue";

const tcComponents = {
    install: function (Vue) {
        Vue.component('TcHamburger', TcHamburger);
        Vue.component('TcBreadcrumb', TcBreadcrumb);
        Vue.component('TcLeftMenu', TcLeftMenu);
        Vue.component('TcRightTop', TcRightTop);
        Vue.component('TcRightMain', TcRightMain);
    }
}

// 导出组件
export default tcComponents