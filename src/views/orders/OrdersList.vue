<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row>
                <el-col :span="8">
                    <el-input 
                        placeholder="请输入订单号或者客户名称" 
                        v-model="pageData.keyword" 
                        class="input-with-select"
                    >
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :xl={span:6,offset:10} :lg={span:8,offset:8} class="operate">
                    <el-button type="primary" @click="visible=true">新建订单</el-button>
                    <el-button :disabled="!select.length" @click="operate(1)">审核</el-button>
                    <el-button :disabled="!select.length" @click="operate(2)">修改</el-button>
                    <el-button :disabled="!select.length" @click="operate(3)">作废</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table 
                :data="tableData" 
                style="width: 100%" 
                v-loading="loading"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="50" label="序号" fixed="left"></el-table-column>
                <el-table-column type="index" width="50" label="序号" fixed="left"></el-table-column>
                <el-table-column prop="id" label="订单号" width="150" fixed="left"></el-table-column>
                <el-table-column prop="status" label="状态" width="150">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1">待审核</span>
                        <span v-else-if="scope.row.status==2">已审核</span>
                        <span v-else-if="scope.row.status==3">审核通过</span>
                        <span v-else>审核拒绝</span>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="下单时间"></el-table-column>
                <el-table-column prop="name" label="客户名称"></el-table-column>
                <el-table-column prop="start" label="起始城市"></el-table-column>
                <el-table-column prop="end" label="目的城市"></el-table-column>
                <el-table-column prop="cargo" label="货物名称" width="180"></el-table-column>
                <el-table-column prop="count" label="件数" width="180"></el-table-column>
                <el-table-column prop="unit" label="单位" width="180"></el-table-column>
                <el-table-column prop="price" label="运费" width="180"></el-table-column>
                <el-table-column prop="from" label="订单来源" width="180"></el-table-column>
                <el-table-column prop="pay" label="是否支付" width="180">
                    <template slot-scope="scope">
                        {{ scope.row.pay==1?"已支付":"未支付" }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="mt mb fr"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageData.page"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pageData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total=total>
            </el-pagination>
        </el-card>
        <orders-model :visible="visible" @hide="visible=false" @reload="loadData"></orders-model>
    </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb"
import {post} from "@/utils/http"
import OrdersModel from "./OrdersModel.vue"
import {mapMutations} from "vuex"
    export default {
        mixins:[breadCrumb],
        data(){
            return{
                visible:false,
                loading:false,
                tableData:[],
                pageData:{
                    page:1,
                    pageSize:10,
                    keyword:"",
                },
                total:0,
                select:[]
            }
        },
        created(){
            this.loadData()
        },  
        components:{
            OrdersModel
        },
        methods:{
            async loadData(){
                this.loading=true
                const {data}= await post("/orderList",this.pageData)
                this.tableData=data.list
                this.total=data.total
                this.loading=false
            },
            handleSizeChange(pageSize){
                this.pageData.pageSize=pageSize;
                this.loadData();
            },
            handleCurrentChange(page){
                this.pageData.page=page;
                this.loadData();
            },
            handleSelectionChange(selection){
                this.select=selection
                console.log(this.select)
            },
            operate(type){
                console.log(type);
                let nos=this.select.map(item=>item.id)
                this.$notify({
                    title: '操作成功',
                    message: nos,
                    type: 'success'
                });
            },
            ...mapMutations(["setRow"]),
            edit(row){
                this.setRow(row);
                this.visible=true;
            },
        }
    }
</script>

<style lang="less" scoped>
    .operate{
        text-align: right;
    }
</style>