<template>
    <div>
        <el-row type="flex" justify="center">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2>邦达货运管理系统</h2>
                </div>
                <div>
                    <el-form 
                        :model="ruleForm" 
                        :rules="rules" 
                        ref="ruleForm" 
                        label-width="80px" 
                        class="demo-ruleForm"
                    >
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model.trim="ruleForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model.trim="ruleForm.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                            @click="login" 
                            type="primary" 
                            class="signIn"
                            :loading="loading"
                            >登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import {post} from "@/utils/http"
import {setToken} from "@/utils/auth.js"
import { mapMutations } from "vuex"
    export default {
        data(){
            return{
                loading:false,
                ruleForm:{
                    username:"",
                    password:""
                },
                rules: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' },
                        { pattern:/^\w{4,8}$/, message: '用户名要求4-8位数字字母组合', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { pattern:/^\w{4,8}$/, message: '密码要求4-8位数字字母组合', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            ...mapMutations(["setRole"]),
            login(){
                this.$refs.ruleForm.validate((valid)=>{
                    if(valid){
                        this.loading=true
                        //登录逻辑
                        post("/login",this.ruleForm).then(res=>{
                            this.setRole(res.role);
                            this.loading=false;
                            setToken(res.token);
                            sessionStorage.setItem("nickname",res.nickname)
                            this.$router.push("/")
                        }).catch((error)=>{
                            this.loading=false;
                            console.log(error)
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
//mock 模拟数据生成接口
    .box-card{
        width: 500px;
        margin-top: 200px;
        h2{
            text-align: center;
            color: #5696ff
        }
    }
    .signIn{
        width: 100%;
    }
</style>