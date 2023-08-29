<template>
    <div>
        <h1 class="title" @click="$router.push('/')">邦达货运管理系统</h1>
        <el-menu 
            class="ofh elmenu" 
            :router="true" 
            background-color="#001529"
            text-color="#fff"
        >
            <menus-vue v-for="(item,index) in menuData" :key="index" :menu="item"></menus-vue>
        </el-menu>
    </div>
</template>

<script>
    import {get} from "@/utils/http"
    import MenusVue from "@/components/MenusVue.vue"
    export default {
        data(){
            return{
                menuData:[]
            }
        },
        created(){
            this.getMenu();
        },
        methods:{
            //获取菜单项
            async getMenu(){
                let {data}= await get("/menu");
                this.menuData=data;
            }
        },
        components:{
            MenusVue
        }
    }
</script>

<style lang="less" scoped>
    .title{
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 50px;
    }
    .elmenu{
        border: none;
    }
</style>