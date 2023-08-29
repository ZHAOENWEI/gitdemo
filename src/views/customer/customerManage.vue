<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-input placeholder="请输入简称" v-model="params.name"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入联系人" v-model="params.person"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入电话" v-model="params.tel"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="mt" v-show="show">
                        <el-col :span="8">
                            <el-input></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="2">
                        <span class="el-dropdown-link" @click="expand">
                            {{show?"收起":"展开"}}<i :class="`el-icon-arrow-${show?'up':'down'} el-icon--right`"></i>
                        </span>
                </el-col>
                <el-col :span="4" class="tr">
                    <el-button type="primary" @click="loadData">查询</el-button>
                    <el-button type="primary">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-button type="primary">添加客户</el-button>
                    <el-button type="primary">批量导入</el-button>
                    <el-button type="primary">导入模板下载</el-button>
                    <el-button type="primary">导出客户</el-button>
                    <el-button type="warning">分配</el-button>
                    <el-button type="warning">查看地图</el-button>
                    <el-button type="warning" icon="el-icon-plus">新增</el-button>
                </el-col>
                <el-col :span="12" class="tr">
                    <el-button icon="el-icon-edit">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete">删除</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" style="width: 100%" v-loading="loading">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="id" label="编号id"></el-table-column>
                <el-table-column prop="nickName" label="用户昵称"></el-table-column>
                <el-table-column prop="company" label="所属公司"></el-table-column>
                <el-table-column prop="business" label="主营业务"></el-table-column>
                <el-table-column prop="account" label="账户余额"></el-table-column>
                <el-table-column prop="status" label="认证状态"></el-table-column>
                <el-table-column prop="distance" label="运输里程数"></el-table-column>
                <el-table-column prop="name" label="联系人"></el-table-column>
                <el-table-column prop="tel" label="联系电话">
                    <template slot-scope="scope">
                        {{ scope.row.tel.slice(0,3)+"****"+scope.row.tel.slice(7) }}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="公司地址"></el-table-column>
                <el-table-column prop="cardNum" label="银行卡号"></el-table-column>
                <el-table-column label="操作">
                    <template>
                        <el-button type="primary" size="mini">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="mt tr"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=pageData.page
                :page-sizes="[10, 20, 30, 50]"
                :page-size=pageData.pageSize
                layout="total, sizes, prev, pager, next, jumper"
                :total=total
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb"
import {post} from "@/utils/http";
    export default {
        data(){
            return{
                loading:false,
                show:false,
                tableData:[],
                params:{
                    name:"",
                    person:"",
                    tel:"",
                    id:"",
                },
                pageData:{
                    page:1,
                    pageSize:10
                },
                total:0,
            }
        },
        created(){
            this.loadData();
        },
        methods:{
            expand(){
                this.show=!this.show
            },
            async loadData(){
                this.loading=true;
                const res=await post("/customer",{...this.params,...this.pageData});
                this.tableData=res.data.list;
                this.total=res.data.total;
                this.loading=false;
            },
            handleSizeChange(size){
                this.pageData.pageSize=size
                this.loadData();
            },
            handleCurrentChange(page){
                this.pageData.page=page
                this.loadData();
            },
        },
        components:{
            BreadCrumb
        }

    }
</script>

<style lang="less" scoped>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down,.el-icon-arrow-up{
        font-size: 12px;
    }

</style>