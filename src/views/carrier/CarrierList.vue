<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-input placeholder="请输入简称" v-model="params.shortName"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入联系人"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入电话"></el-input>
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
            <el-table :data="tableData" v-loading="loading">
                <el-table-column prop="no" label="编号id"></el-table-column>
                <el-table-column prop="shortName" label="简称"></el-table-column>
                <el-table-column prop="roadLicence" label="道路许可证"></el-table-column>
                <el-table-column prop="personTel" label="联系人/电话"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
                <el-table-column prop="date" label="注册时间"></el-table-column>
                <el-table-column prop="name" label="承运商名称"></el-table-column>
                <el-table-column prop="code" label="信用代码"></el-table-column>
                <el-table-column prop="address" label="注册地址"></el-table-column>
                <el-table-column prop="commit" label="是否上报"></el-table-column>
                <el-table-column prop="creditMark" label="信用分"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini">删除</el-button>
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
            <carrier-list-model :visible="visible" @hide="close"></carrier-list-model>
        </el-card>
    </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb"
import {post} from "@/utils/http"
import CarrierListModel from "./CarrierListModel.vue"
import { mapMutations } from "vuex"
    export default {
        data(){
            return{
                tableData:[],
                loading:false,
                show:false,
                pageData:{
                    page:1,
                    pageSize:10
                },
                params:{
                    shortName:"",
                },
                total:0,
                visible:false
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
                const res=await post("/carrier/driverlist",{...this.pageData,...this.params});
                this.tableData=res.data.list;
                this.total=res.data.total;
                this.loading=false;
            },
            handleSizeChange(size){
                this.pageData.pageSize=size
                this.loadData();
            },
            handleCurrentChange(page){
                this.pageData.page=page;
                this.loadData();
            },
            close(){
                this.visible=!this.visible
            },
            ...mapMutations(["setRow"]),
            edit(row){
                this.setRow(row);
                this.visible=true
            }
        },
        components:{
            BreadCrumb,CarrierListModel
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