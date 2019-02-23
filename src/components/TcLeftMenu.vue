<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
        <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse"
                background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF" router>

            <template v-for="(item,index) in routes" v-if="!item.hidden">
                <!-- 多级菜单 -->
                <el-submenu :index="item.path" v-if="!item.leaf" :key="index" >
                    <template slot="title">
                        <i :class="item.iconCls" class="iconfont"></i>
                        <span class="collapse-font" slot="title">{{item.name}}</span>
                    </template>

                    <template v-for="(child,index2) in item.children" >
                        <!-- 二级菜单 -->
                        <el-menu-item v-if="child.isParent" :index="child.path" :key="child.path">
                            {{child.name}}
                        </el-menu-item>
                        <!-- 三级菜单 -->
                        <el-submenu v-else :index="child.path" :key="index2">
                            <template slot="title">
                                <span class="collapse-font">{{child.name}}</span>
                            </template>
                            <el-menu-item v-for="child2 in child.children" v-if="!child2.hidden" :index="child2.path" :key="child2.path">
                                {{child2.name}}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                </el-submenu>

                <!-- 一级菜单 -->
                <el-menu-item v-if="item.leaf && item.children.length > 0" :index="item.path" :key="index" >
                    <i :class="item.iconCls" class="iconfont"></i>
                    <span class="collapse-font " slot="title">{{item.name}}</span>
                </el-menu-item>
            </template>

        </el-menu>
    </el-scrollbar>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "tc-left-menu",
        computed: {
            ...mapGetters([
                'sidebar'
            ]),
            routes() {
                return this.$router.options.routes
            },
            isCollapse() {
                return !this.sidebar.opened
            }
        }
    }
</script>

<style lang="scss" scoped>
    .collapse-font{
        margin-left: 12px;
    }
    .el-menu-item i {
         color: #bfcbd9;
    }
    .el-submenu__title i {
        color: #bfcbd9;
    }
</style>