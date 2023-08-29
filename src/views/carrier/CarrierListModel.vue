<template>
    <div>
        <el-dialog
        title="编辑信息"
        :visible="visible"
        width="50%"
        :before-close="close">
        <el-row :gutter="20">
            <el-form :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm">
                <el-col :span="12">
                    <el-form-item label="道路许可证" prop="roadLicence">
                        <el-input v-model="ruleForm.roadLicence"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人/电话" prop="personTel">
                        <el-input v-model="ruleForm.personTel"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择类型">
                            <el-option label="自有车" value="private"></el-option>
                            <el-option label="公司车" value="company"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="注册时间" prop="date">
                        <el-col>
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="承运商名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="注册地址" prop="address">
                        <el-input v-model="ruleForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="是否上报" prop="commit">
                        <el-radio-group v-model="ruleForm.commit">
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="信用分" prop="creditMark">
                        <el-input v-model="ruleForm.creditMark"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import {post} from "@/utils/http"
    export default {
        props:["visible"],
        data(){
            return{
                ruleForm:{
                    roadLicence:"",
                    personTel:"",
                    type:"",
                    date:"",
                    name:"",
                    address:"",
                    commit:"",
                    creditMark:""
                },
                rules:{
                    roadLicence:[{required:true,message:"不能为空",trigger:"blur"}],
                    personTel:[{required:true,message:"不能为空",trigger:"blur"}],
                    type:[{required:true,message:"不能为空",trigger:"change"}],
                    date:[{required:true,message:"不能为空",trigger:"change"}],
                    name:[{required:true,message:"不能为空",trigger:"blur"}],
                    address:[{required:true,message:"不能为空",trigger:"blur"}],
                    commit:[{required:true,message:"不能为空",trigger:"change"}],
                    creditMark:[{required:true,message:"不能为空",trigger:"blur"}],
                }
            }
        },
        computed:{
            ...mapState(["row"])
        },
        watch:{
            visible(){
                const {roadLicence,personTel,type,date,name,address,commit,creditMark}=this.row;
                this.ruleForm={roadLicence,personTel,type,date,name,address,commit,creditMark};
            }
        },
        methods:{
            ...mapMutations(["clearRow"]),
            close(){
                this.$emit("hide")
                this.clearRow();
            },
            save(){
                this.$refs.ruleForm.validate((valid)=>{
                    if(valid){
                        post("/carrier/driverlist",this.ruleForm).then(()=>{
                            this.$message({
                                message: '保存成功!',
                                type: 'success'
                            });
                        })
                    }
                    this.close();
                    this.clearRow();
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>