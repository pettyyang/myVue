import Vue from 'vue'
import VueRouter from 'vue-router'
// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }
Vue.use(VueRouter)

const routes = [
  {
    // 首页
    path: '/',
    name: 'index',
    component: () => import('../views/Home/index.vue')
  },
  // {
  //   path: '/',
  //   name: 'qqHall',
  //   component: () => import('../views/qqHall/QqHall.vue'), // 企企大厅
  //   meta: { title: '数票-银票商票承兑汇票，专业贴现秒贴交易服务平台' }
  // },
  {
    // 直播
    path: '/addedservices',
    name: 'addedservices',
    component: () => import('../views/addedservices/Addedservices.vue')
  },
  {
    // 直播
    path: '/classroom',
    name: 'classroom',
    component: () => import('../views/classroom/Classroom.vue')
  },
  {
    // 直播
    path: '/classroomdetail',
    name: 'classroomdetail',
    component: () => import('../views/classroom/Classroomdetail.vue')
  },
  {
    // 公告列表
    path: '/news',
    name: 'news',
    component: () => import('../views/Home/news.vue')
  },
  {
    // 公告详情
    path: '/newsDetail',
    name: 'newsDetail',
    component: () => import('../views/Home/newsDetail.vue')
  },
  {
    // 操作指南
    path: '/operation',
    name: 'operation',
    component: () => import('../views/operation/Operation.vue')
  },
  {
    // 操作指南
    path: '/operationDetail',
    name: 'operationDetail',
    component: () => import('../views/operation/OperationDetail.vue')
  },
  {
    // 常见问题
    path: '/ques',
    name: 'ques',
    component: () => import('../views/ques/Ques.vue')
  },
  {
    // 登录
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/login.vue')
  },
  {
    // 找回密码
    path: '/findPass',
    name: 'findPass',
    component: () => import('../views/Login/findPass.vue')
  },
  {
    // 注册
    path: '/register',
    name: 'register',
    component: () => import('../views/Register/register.vue')
  },
  {
    // 协议
    path: '/agreement',
    name: 'agreement',
    component: () => import('../views/Register/agreement.vue')
  },
  {
    // 企业认证1--->改为企业信息填写
    path: '/authRealName1',
    name: 'authRealName1',
    component: () => import('../views/Register/authRealName1.vue')
  },
  {
    // 企业认证2
    path: '/authRealName2',
    name: 'authRealName2',
    component: () => import('../views/Register/authRealName2.vue')
  },
  {
    // 企业对公账户认证
    path: '/auditAccount',
    name: 'auditAccount',
    component: () => import('../views/Register/auditAccount.vue')
  },
  {
    // 企业对公账户认证-审核成功
    path: '/auditAccountState',
    name: 'auditAccountState',
    component: () => import('../views/Register/auditAccountState.vue')
  },
  {
    // 开通实名认证步骤一
    path: '/openRNameStep1',
    name: 'openRNameStep1',
    component: () => import('../views/openRealNameVertify/openRNameStep1.vue')
  },
  {
    // 开通实名认证步骤二
    path: '/openRNameStep2',
    name: 'openRNameStep2',
    component: () => import('../views/openRealNameVertify/openRNameStep2.vue')
  },
  {
    // 开通实名认证步骤三
    path: '/openRNameStep3',
    name: 'openRNameStep3',
    component: () => import('../views/openRealNameVertify/openRNameStep3.vue')
  },
  {
    // 开通实名认证步骤四
    path: '/openRNameStep4',
    name: 'openRNameStep4',
    component: () => import('../views/openRealNameVertify/openRNameStep4.vue')
  },
  {
    // 开通实名认证审核结果（成功 申请打款中）
    path: '/openRNameStepStatus',
    name: 'openRNameStepStatus',
    component: () => import('../views/openRealNameVertify/openRNameStepStatus.vue')
  },
  {
    path: '/my',
    redirect: '/my/myorder',
    component: () => import('../views/my/index.vue'),
    children: [
      {
        // 我的订单
        path: 'myorder',
        name: 'myorder',
        component: () => import('../views/Myorder/myorder.vue')
      },
      {
        // 我的订单 - 详情
        path: 'myorderDetail',
        name: 'myorderDetail',
        component: () => import('../views/Myorder/myorderDetail.vue'),
        meta: { parentPath: '/my/myorder' }
      },
      {
        // 我的订单
        path: 'addorder',
        name: 'addorder',
        component: () => import('../views/addorder/addorder.vue')
      },
      {
        // 我要代理
        path: 'vipAct',
        name: 'vipAct',
        component: () => import('../views/Vip/vipAct.vue')
      },
      {
        // 我要代理 - 经纪
        path: 'vipActBroker',
        name: 'vipActBroker',
        component: () => import('../views/Vip/vipActBroker.vue')
      },
      {
        // 我要代理 - 高级
        path: 'vipActAdvance',
        name: 'vipActAdvance',
        component: () => import('../views/Vip/vipActAdvance.vue')
      },
      {
        // 我的任务
        path: 'vipTask',
        name: 'vipTask',
        component: () => import('../views/Vip/vipTask.vue')
      },
      {
        // 我的信息
        path: 'vipMsg',
        name: 'vipMsg',
        component: () => import('../views/Vip/vipMsg.vue')
      },
      {
        // 我的信息
        path: 'vipdetail',
        name: 'vipdetail',
        component: () => import('../views/Vip/vipdetail.vue'),
        meta: { parentPath: '/my/vipMsg' }
      },
      {
        // 佣金结算
        path: 'vipCommission',
        name: 'vipCommission',
        component: () => import('../views/Vip/vipCommission.vue')
      },
      {
        // 我的客户
        path: 'vipClient',
        name: 'vipClient',
        component: () => import('../views/Vip/vipClient.vue')
      },
      {
        // 推广链接
        path: 'vipLinks',
        name: 'vipLinks',
        component: () => import('../views/Vip/vipLinks.vue')
      },
      {
        path: 'telCenter',
        name: 'telCenter',
        component: () => import('../views/telCenter/index.vue')
      },
      {
        // 账户管理
        path: 'amountManage',
        name: 'amountManage',
        component: () => import('../views/AmountManage/amountManage.vue')
      },
      {
        // 安全中心
        path: 'safeCenter',
        name: 'safeCenter',
        component: () => import('../views/SafeCenter/safeCenter.vue')
      },
      {
        // 发布需求
        path: 'release',
        name: 'release',
        component: () => import('../views/release/Release.vue')
      },
      {
        // 我的订单 卖
        path: 'saleOrder',
        name: 'saleOrder',
        component: () => import('../views/saleOrder/SaleOrder.vue')
      },
      {
        // 我的订单 买
        path: 'buyOrder',
        name: 'buyOrder',
        component: () => import('../views/buyOrder/BuyOrder.vue')
      },
      {
        // 交易违约订单
        path: 'violationOrder',
        name: 'violationOrder',
        component: () => import('../views/violationOrder/ViolationOrder.vue')
      },
      {
        // 交子账户
        path: 'currencyAccount',
        name: 'currencyAccount',
        component: () => import('../views/currencyAccount/CurrencyAccount.vue')
      },
      {
        // 交子账户
        path: 'currencyaccount1',
        name: 'currencyaccount1',
        component: () => import('../views/currencyAccount/CurrencyAccount1.vue'),
        meta: { parentPath: '/my/electronicAccount' }
      },
      {
        // 电子交易 账户
        path: 'electronicAccount',
        name: 'electronicAccount',
        component: () => import('../views/electronicAccount/ElectronicAccount.vue')
      },
      {
        // 电子交易 开通
        path: 'electronicOpen',
        name: 'electronicOpen',
        component: () => import('../views/electronicOpen/ElectronicOpen.vue'),
        meta: { parentPath: '/my/electronicAccount' }
      },
      {
        // 电子交易 开通
        path: 'electronicOpen1',
        name: 'electronicOpen1',
        component: () => import('../views/electronicOpen/ElectronicOpen1.vue'),
        meta: { parentPath: '/my/electronicAccount' }
      },
      {
        // 电子交易 提现
        path: 'withdrawal',
        name: 'withdrawal',
        component: () => import('../views/withdrawal/Withdrawal.vue'),
        meta: { parentPath: '/my/electronicAccount' }
      },
      {
        // 电子交易 提现
        path: 'withdrawal1',
        name: 'withdrawal1',
        component: () => import('../views/withdrawal/Withdrawal1.vue'),
        meta: { parentPath: '/my/electronicAccount' }
      },
      {
        // 电子交易 订单详情
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('../views/orderDetail/OrderDetail.vue'),
        meta: { parentPath: '/my/saleOrder' }
      }
    ]
  },
  {
    // 开通富民银行
    path: '/openFUMIN',
    name: 'openFUMIN',
    component: () => import('../views/openBank/openFUMIN.vue')
  },
  {
    // 开通众邦邦银行
    path: '/openZBANK',
    name: 'openZBANK',
    component: () => import('../views/openBank/openZBANK.vue')
  },
  {
    // 开通振兴银行
    path: '/openZHENX',
    name: 'openZHENX',
    component: () => import('../views/openBank/openZHENX.vue')
  },
  {
    // 开通百信银行
    path: '/openBAIXIN',
    name: 'openBAIXIN',
    component: () => import('../views/openBank/openBAIXIN.vue')
  },
  {
    path: '/uploadImg',
    name: 'uploadImg',
    component: () => import('../views/Home/uploadImg.vue')
  },
  {
    path: '/compute',
    name: 'compute',
    component: () => import('../views/Home/compute.vue')
  },
  {
    path: '/jdVerify',
    name: 'jdVerify',
    component: () => import('../views/Register/jdVerify.vue') // 京东智票，需要企业审核
  },
  {
    path: '/qqHall',
    name: 'qqHall',
    component: () => import('../views/qqHall/QqHall.vue') // 企企大厅
  },
  {
    path: '/release',
    name: 'release',
    component: () => import('../views/release/Release.vue') // 发布需求
  },
  /*
   商票快融
  */
  {
    path: '/commercial-router',
    name: 'commercial-router',
    component: () => import('../views/commercialTicket/commercial-router'), // 商票快融路由页
    children: [
      {
        path: '/commercial-ticket',
        name: 'commercial-ticket',
        component: () => import('../views/commercialTicket/commercial-ticket') // 商票快融首页
      },
      {
        path: '/commercial-submitInfo',
        name: 'commercial-submitInfo',
        component: () => import('../views/commercialTicket/commercial-submitInfo') // 商票快融提交信息页
      }
    ]
  },
  {
    path: '/commercial-stepStatus',
    name: 'commercial-stepStatus',
    component: () => import('../views/commercialTicket/ticketStepStatus') // 商票快融提交信息状态页
  },
  {
    path: '/commercial-apply',
    name: 'commercial-apply',
    component: () => import('../views/commercialTicket/commercial-apply') // 商票快融申请融资
  },
  {
    path: '/commercial-perfectinfo',
    name: 'commercial-perfectinfo',
    component: () => import('../views/commercialTicket/commercial-perfectinfo') // 商票快融申请融资后提交交易，完善信息
  },
  {
    path: '/commercial-QRcode',
    name: 'commercial-QRcode',
    component: () => import('../views/commercialTicket/commercial-QRcode') // 商票快融申请融资页，非自营的，进入融资二维码展示页面
  },
  {
    path: '/commercial-operate',
    name: 'commercial-operate',
    component: () => import('../views/commercialTicket/commercial-operate') // 商票快融申请融资页，新增或修改票据
  }

]

const router = new VueRouter({
  // mode: "history",
  mode: process.env.VUE_APP_MODE,
  base: process.env.VUE_APP_SRC,
  routes
})

router.afterEach(to => {
  document.title = to.meta.title ? to.meta.title : '数票-银票商票承兑汇票，专业贴现秒贴交易服务平台'
})

// router.beforeEach((to,from,next)=>{
//     // let arr=[];
//     // let data=router.options.routes;
//     // data.forEach(item => {
//     //     if(item.meta){
//     //         arr.push(item.meta);
//     //     }
//     // })
//     // sessionStorage.setItem('menuArr',JSON.stringify(arr));
//     next();
// })
export default router
