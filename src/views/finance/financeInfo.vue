<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="16">
                <el-col :span="6">
                    <el-input placeholder="请输入运单号" v-model="params.num"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入客户名称" v-model="params.name"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入电话" v-model="params.tel"></el-input>
                </el-col>
                <el-col :span="6" class="tc">
                    <el-button type="primary" @click="loadData">查询</el-button>
                    <el-button type="primary">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="num" label="对账单号"></el-table-column>
                <el-table-column prop="accountTime" label="账单时间"></el-table-column>
                <el-table-column prop="pay" label="付款对象"></el-table-column>
                <el-table-column prop="billStatus" label="账单状态">
                    <template slot-scope="scope">
                        {{ scope.row.billStatus==1?"已对账":"核对中" }}
                    </template>
                </el-table-column>
                <el-table-column prop="receiptStatus" label="开票状态">
                    <template slot-scope="scope">
                        {{ scope.row.receiptStatus==1?"已开票":"未开票" }}
                    </template>
                </el-table-column>
                <el-table-column prop="sum" label="总支出金额"></el-table-column>
                <el-table-column prop="wrongStatus" label="异常状态"></el-table-column>
                <el-table-column prop="buildTime" label="创建时间"></el-table-column>
                <el-table-column prop="person" label="创建人"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" v-if="scope.row.billStatus==2 && scope.row.receiptStatus==2">取消对账</el-button>
                        <el-button type="primary" size="mini" v-else-if="scope.row.billStatus==1 && scope.row.receiptStatus==2">开票</el-button>
                        <el-button type="success" size="mini" v-else>已确认</el-button>
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
    </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import {post} from "@/utils/http"
    export default {
        data(){
            return{
                tableData:[],
                params:{
                    num:"",
                    name:"",
                    tel:""
                },
                pageData:{
                    page:1,
                    pageSize:10
                },
                total:0
            }
        },
        created(){
            this.loadData();
        },
        methods:{
            async loadData(){
                this.loading=true;
                const res=await post("/finance",this.pageData)
                this.tableData=res.data.list;
                this.total=res.data.total;
                this.loading=false;
            },
            handleSizeChange(size){
                this.pageData.pageSize=size;
                this.loadData();
            },
            handleCurrentChange(page){
                this.pageData.page=page;
                this.loadData();
            }
        },
        components:{
            BreadCrumb
        }

    }
</script>

<style lang="less" scoped>

</style>