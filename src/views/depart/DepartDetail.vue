<template>
    <div>
        <bread-crumb></bread-crumb>
        <el-card class="mt">
            <el-row>
                <el-col :span="12">
                    <span style="font-size: 14px;line-height: 40px;">运单编号:{{no}}&nbsp;&nbsp;&nbsp;创建时间:2022-08-24&nbsp;&nbsp;&nbsp;审核员:张三丰</span>
                </el-col>
                <el-col :span="12" class="tr">
                    <el-button type="primary" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-steps :active="2" align-center>
                <el-step title="已发货"></el-step>
                <el-step title="运输中"></el-step>
                <el-step title="已收货"></el-step>
                <el-step title="已完成"></el-step>
            </el-steps>
        </el-card>
        <el-card class="mt">
            <el-row>
                <el-row>
                    <el-col class="title">基础信息</el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="6">
                        <p>客户名称:诺莱科技有限公司</p>
                        <p>货物名称:口罩</p>
                        <p>数量:8(吨)</p>
                    </el-col>
                    <el-col :span="6">
                        <p>是否是易燃易爆物品:不是</p>
                        <p>结算方式:现付</p>
                        <p>运费:12000元</p>
                    </el-col>
                    <el-col :span="6">
                        <p>发货单据:暂未上传</p>
                        <p>接货单据:暂未上传</p>
                        <p>所属业务员:苏澄海</p>
                    </el-col>
                    <el-col :span="6">
                        <p>客户下单时间:2000-08-20</p>
                        <p>是否需要换货:不需要</p>
                    </el-col>
                </el-row>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-row>
                    <el-col class="title">运输信息</el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="6">
                        <p>车牌号:京A12345</p>
                        <p>司机姓名:王五</p>
                    </el-col>
                    <el-col :span="6">
                        <p>司机电话:18888888888</p>
                        <p>司机地址:北京市朝阳区</p>
                    </el-col>
                    <el-col :span="6">
                        <p>司机身份证号:878132468621353416</p>
                        <p>所属公司:天博运输公司</p>
                    </el-col>
                    <el-col :span="6">
                        <p>预计运输时间:8天</p>
                        <p>违约金:5000元</p>
                    </el-col>
                </el-row>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-row>
                    <el-col class="title">经办人员信息</el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="6">
                        <p>业务员:张三</p>
                    </el-col>
                    <el-col :span="6">
                        <p>审核员:李四</p>
                    </el-col>
                    <el-col :span="6">
                        <p>制单员:王五</p>
                    </el-col>
                    <el-col :span="6">
                        <p>备注:无备注</p>
                    </el-col>
                </el-row>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
    export default {
        data(){
            return{
                no:this.$route.query.no   
            }
        },
        beforeRouteLeave(to,from,next){
            if(to.path=="/depart/data"){
                this.changeIsFromDetail(true);
            }else{
                this.changeIsFromDetail(false);
            }
            next();
        },
        methods:{
            ...mapMutations(["changeIsFromDetail"]),
            back(){
                this.$router.push("/depart/data");
            }
        }
    }
</script>

<style lang="less" scoped>
.title{
    font-size: 18px;
    font-weight: bold;
}
p{
    font-size: 12px;
    line-height: 30px;
}

</style>