<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row :gutter="16">
                <el-col :span="6">
                    <el-input placeholder="请输入运单号" v-model="params.waybillNo"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入客户名称" v-model="params.name"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width: 100%;"
                    >
                    </el-date-picker>
                </el-col>
                <el-col :span="6" class="tr">
                    <el-button type="primary" @click="loadData">查询</el-button>
                    <el-button type="primary">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" v-loading="loading">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="no" label="运单号"></el-table-column>
                <el-table-column prop="date" label="下单时间"></el-table-column>
                <el-table-column prop="name" label="客户名称"></el-table-column>
                <el-table-column prop="cargo" label="货物名称"></el-table-column>
                <el-table-column prop="count" label="件数"></el-table-column>
                <el-table-column prop="start" label="起始地"></el-table-column>
                <el-table-column prop="end" label="目的地"></el-table-column>
                <el-table-column prop="price" label="运费"></el-table-column>
                <el-table-column prop="needRecive" label="需要接货"></el-table-column>
                <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
                <el-table-column prop="driver" label="司机"></el-table-column>
                <el-table-column prop="tel" label="司机电话"></el-table-column>
                <el-table-column prop="percent" label="运输进度">
                    <template slot-scope="scope">
                        <el-progress :percentage="scope.row.percent"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="detail(scope.row.no)">详情</el-button>
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
import BreadCrumb from "@/components/BreadCrumb";
import {post} from "@/utils/http";
import moment from "moment";
import { mapState } from 'vuex';
    export default {
        data(){
            return{
                tableData:{},
                params:{
                    waybillNo:"",
                    name:"",
                    status:1,
                },
                pageData:{
                    page:1,
                    pageSize:10
                },
                date:"",
                loading:false
            }
        },
        computed:{
            ...mapState(["isFromDetail"])
        },
        activated(){
            this.isFromDetail?"":this.loadData();
        },
        created(){
            this.loadData();
        },
        beforeRouteLeave(to,from,next){
            if(to.path=="/depart/data/detail"){
                from.meta.keepAlive=true;
            }else{
                //如果去的不是详情页就清除缓存
                this.clearCache();
            }
            next();
        },
        methods:{
            async loadData(){
                this.loading=true;
                let startDate=this.date[0]?moment(this.date[0]).format("YYYY-MM-DD"):"";
                let endDate=this.date[1]?moment(this.date[1]).format("YYYY-MM-DD"):"";
                const res=await post("/waybillList",{...this.params,...this.pageData,startDate,endDate});
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
            detail(no){
                this.$router.push("/depart/data/detail?no="+no)
            },
            clearCache(){
                let vnode = this.$vnode;
                let parentVnode = vnode && vnode.parent;
                if(
                    parentVnode &&
                    parentVnode.componentInstance &&
                    parentVnode.componentInstance.cache
                ){
                    var key = 
                        vnode.key == null
                            ? vnode.componentOptions.Ctor.cid +
                                (vnode.componentOptions.tag
                                    ?`::${vnode.componentOptions.tag}`
                                    :"")
                            :vnode.key;
                    var cache = parentVnode.componentInstance.cache;
                    var keys = parentVnode.componentInstance.keys;
                    if (cache[key]) {
                        this.$destroy();
                        //remove key
                        if (keys.length) {
                            var index = keys.indexOf(key);
                            if (index > -1) {
                                keys.splice(index,1);
                            }
                        }
                        cache[key] = null;
                    }
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