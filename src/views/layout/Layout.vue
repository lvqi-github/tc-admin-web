<template>
    <div class="app-wrapper" :class="classObj">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
        <tc-left-menu class="sidebar-container"></tc-left-menu>
        <div class="main-container">
            <tc-right-top></tc-right-top>
            <tc-right-main></tc-right-main>
        </div>
    </div>
</template>

<script>
    import ResizeMixin from "./ResizeHandler";
    export default {
        name: "layout",
        mixins: [ResizeMixin],
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar;
            },
            device() {
                return this.$store.state.app.device;
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === "mobile"
                };
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }
    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
</style>