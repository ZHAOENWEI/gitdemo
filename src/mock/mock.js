import Mock from "mockjs";
//模拟网络请求延时
Mock.setup({
    timeout:500
})
//登录接口
Mock.mock("http://localhost:8080/login","post",(req)=>{
    //请求对象
   const {username,password} = JSON.parse(req.body);
   //根据用户名和密码查询数据库,查询出数据返回给前端
    if(username=="admin"&&password==123456){
        return{
            code:200,
            success:true,
            message:"登陆成功",
            token:"3arc9h0vhcr0f8iprpnscmfo8s",
            nickname:"赵铁柱",
            role:"boss"
        }
    }else{
          return{
            code:100,
            success:false,
            message:"账号或者密码有误"
          }  
    }
})
//入职日期接口
Mock.mock("http://localhost:8080/in","get",()=>{
    return{
            code:200,
            success:true,
            message:"请求成功",
            time:"2020-07-01 00:00:00"
    }
})
//菜单接口
const menuList = [
    {
        name: "首页",
        icon: "el-icon-s-home",
        url: "/index",
    },
    {
        name: "订单管理",
        icon: "el-icon-s-order",
        url: "/order",
        children: [
            {
                name: "订单列表",
                icon: "el-icon-user",
                url: "/orders/list",
            }
        ]
    },
    {
        name: "运单管理",
        icon: "el-icon-menu",
        url: "/waybill",
        children: [
            {
                name: "运单录入",
                icon: "el-icon-notebook-2",
                url: "/waybill/in",
            },
            {
                name: "运单列表",
                icon: "el-icon-truck",
                url: "/waybill/list",
            }
        ]
    },
    {
        name: "发车管理",
        icon: "el-icon-s-order",
        url: "/depart",
        children: [
            {
                name: "发车数据单",
                icon: "el-icon-tickets",
                url: "/depart/data",
            }
        ]
    },
    {
        name: "承运商管理",
        icon: "el-icon-user",
        url: "/carrier",
        children: [
            {
                name: "承运商列表",
                icon: "el-icon-chat-square",
                url: "/carrier/list",
            },
            {
                name: "车辆列表",
                icon: "el-icon-bank-card",
                url: "/carrier/trucks",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/carrier/driverlist",
            },
        ]
    },
    {
        name: "客户管理",
        icon: "el-icon-chat-dot-square",
        url: "/customer",
    },
    {
        name: "财务管理",
        icon: "el-icon-user",
        url: "/finance",
        children: [
            {
                name: "客户对账单",
                icon: "el-icon-chat-square",
                url: "/finance/info",
            },
            {
                name: "承运商对账单",
                icon: "el-icon-bank-card",
                url: "/finance/record",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/finance/driver",
            },
        ]
    },
    {
        name: "个人中心",
        icon: "el-icon-chat-dot-square",
        url: "/personal",
    },
]
Mock.mock("http://localhost:8080/menu","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:menuList
    }
})
//折线图图表接口
Mock.mock("http://localhost:8080/line","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        data:{
            "22-01":30,
            "22-02":84,
            "22-03":56,
            "22-04":47,
            "22-05":84,
            "22-06":61,
            "22-07":90,
        } 
    }
})
//订单管理-订单列表
Mock.mock('http://localhost:8080/orderList', 'post', (req) => {
    const { page, pageSize,keyword } = JSON.parse(req.body);
    console.log("接口接收到参数:",page,pageSize,keyword)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'id|+1': 10000,//订单号
                'status|1': [1,2,3,4],//订单状态 1待审核 2已审核 3审核通过 4审核拒绝
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'unit|1': ["方","吨"],//单位
                "price":Mock.Random.integer(5000,50000),//运费
                "from|1":["移动端","pc端"],
                "pay|1":[1,2],//是否支付 1 已支付 2未支付     
            }],
            "total": 47
        })
    }
})
//订单管理-新建订单
Mock.mock('http://localhost:8080/addOrder',"post",(req)=>{
    const  {name,start,end,cargo,count,unit,price,from,pay} =JSON.parse(req.body);
    console.log("新建订单接口收到参数:",name,start,end,cargo,count,unit,price,from,pay)
    return{
        code:200,
        success:true,
        message:"新建成功", 
    }
})
//运单管理-运单列表
Mock.mock('http://localhost:8080/waybillList', 'post', (req) => {
     const { page, pageSize,waybillNo,name,startDate,endDate,status } = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,waybillNo,name,startDate,endDate,status)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'no|+1': 10000,//订单号
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'cargo': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                "price":Mock.Random.integer(5000,50000),//运费
                "needRecive|1":[1,2],//需要接货 1需要 2不需要
                'plateNumber|1': ["京A12345","苏C66666","鲁B45678"],//车牌号
                 "driver":Mock.Random.cname(),
                 "tel|1":[18888888888,15577896554,15789654785,13698745269],
                 "percent|1":[37,22,89,65,80,74,56]
   
            }],
            "total": 47
        })
    }
})
//根据token获取权限名字
Mock.mock('http://localhost:8080/getRole',"get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        role:"boss"
    }
})

//发车管理-发车数据单
Mock.mock('http://localhost:8080/depart/data', 'post', (req) => {
     const { page, pageSize,departNo,name,startDate,endDate,status } = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,departNo,name,startDate,endDate,status)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'no|+1': 10000,//订单号
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'cargo': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                "price":Mock.Random.integer(5000,50000),//运费
                "needRecive|1":[1,2],//需要接货 1需要 2不需要
                'plateNumber|1': ["京A12345","苏C66666","鲁B45678"],//车牌号
                 "driver":Mock.Random.cname(),
                 "tel|1":[18888888888,15577896554,15789654785,13698745269],
                 "percent|1":[37,22,89,65,80,74,56]
   
            }],
            "total": 47
        })
    }
})


//发车管理-发车数据单
Mock.mock('http://localhost:8080/carrier/driverlist', 'post', (req) => {
     const { page, pageSize,dataNo,name} = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,dataNo,name)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'no|+1': 10000,//编号id
                "shortName|1": ["诺来科技","辉华股份","川聚物流","成越材料","聚博纺织"],//简称
                "roadLicence|1":["D65489791231","A6456879723","B4568971231","C5465798321"],//道路许可证
                "personTel|1":["张三/18888888888","李四/15577896554","王五/15789654785"],//联系人电话
                "type|1":["自由车","公司车"],//车辆类型
                'date': Mock.Random.date(),//注册时间
                "name|1": ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//承运商名称
                'code':"无",//信用代码
                "address|1": ["江苏南京","浙江杭州","广东广州","北京","上海"],//注册地址
                "commit|1": ["是","否"],//是否上报
                "creditMark|1": ["80","85","90"],//信用分
   
            }],
            "total": 47
        })
    }
})

//客户管理
Mock.mock('http://localhost:8080/customer', 'post', (req) => {
     const { page, pageSize,id,name} = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,id,name)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'id|+1': 10000,//编号id
                "nickName":"山运集团",//用户昵称
                "company": "山东运输集团",//所属公司
                "business":"纺织物出口",//主营业务
                "account":10086,//账户余额
                "status":"已认证",//认证状态
                "distance":"25000公里",//运输里程数
                "name":"李晓华",//联系人
                "tel":"18888888888",//联系电话
                "address":"北京朝阳区",//公司地址
                "cardNum":65487983134654987//银行卡号
            }],
            "total": 47
        })
    }
})


//财务管理-客户对账单
Mock.mock('http://localhost:8080/finance', 'post', (req) => {
     const { page, pageSize} = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'num': 49846846132,//对账单号
                "accountTime":"2023-8-13",//账单时间
                "pay": "张三",//付款对象
                "billStatus|1":[1,2],//账单状态
                "receiptStatus|1":[1,2],//开票状态
                "sum":"20000",//总支出金额
                "wrongStatus":"否",//异常状态
                "buildTime":"2023-6-1",//创建时间
                "person":"王五",//创建人
            }],
            "total": 47
        })
    }
})

