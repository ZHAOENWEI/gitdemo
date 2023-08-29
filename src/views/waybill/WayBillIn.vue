<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-form 
                :model="ruleForm"
                ref="ruleForm"
                label-width="100px"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="name" required>
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称" prop="name" required>
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称" prop="name" required>
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="货物单位" prop="unit" required>
                            <el-select v-model="ruleForm.unit" placeholder="请选择货物单位">
                                <el-option label="公斤" value="kilogram"></el-option>
                                <el-option label="吨" value="ton"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="下单时间" required>
                            <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即时配送" prop="delivery">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="发货地址" prop="name" >
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="承运方式" prop="resource" required>
                            <el-radio-group v-model="ruleForm.way">
                            <el-radio label="个人"></el-radio>
                            <el-radio label="公司"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动形式" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="name" required>
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称" prop="name" required>
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称" prop="name" required>
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="货物单位" prop="unit" required>
                            <el-select v-model="ruleForm.unit" placeholder="请选择货物单位">
                                <el-option label="公斤" value="kilogram"></el-option>
                                <el-option label="吨" value="ton"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="下单时间" required>
                            <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即时配送" prop="delivery">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="发货地址" prop="name" >
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="承运方式" prop="resource" required>
                            <el-radio-group v-model="ruleForm.way">
                            <el-radio label="个人"></el-radio>
                            <el-radio label="公司"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动形式" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb"
    export default {
        data(){
            return{
                ruleForm:{
                    name: '',
                    unit: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    way: '',
                    desc: ''
                }
            }
        },
        components:{
            BreadCrumb
        }
    }
</script>

<style lang="less" scoped>

</style>