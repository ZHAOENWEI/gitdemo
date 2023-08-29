<template>
    <div>
        <el-container>
            <el-aside width="200px" class="aside">
                <nav-left></nav-left>
            </el-aside>
            <el-container>
                <el-header class="header">
                    <top-header></top-header>
                </el-header>
                <el-main class="main">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </el-main>
                <el-footer class="footer">
                    京ICP备8888888888888888号  京公安网备123456号
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import NavLeft from "@/components/NavLeft.vue";
import TopHeader from "@/components/TopHeader.vue";
    export default {
        components:{
            NavLeft,TopHeader
        }
    }
</script>

<style lang="less" scoped>
    .aside{
        background-color: #001529;
        height: 100vh;
    }
    .header{
        background-color: #fff;
        line-height: 60px;
        box-shadow: 0 5px 3px rgba(221, 221, 221, 0.3);  
        border-right: none;      
    }
    .main{
        height: 70vh;
        background-color: #f4f7ff;
    }
    .main::-webkit-scrollbar {
        width: 0;
    }
    .footer{
        color: #999;
        font-size: 12px;
        text-align: center;
        background-color: #f4f7ff;
        line-height: 60px;
    }
</style>