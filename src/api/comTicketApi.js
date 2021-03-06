
/**
 *商票秒融接口
 *
 */

import { download_get, get, post } from '../../request.js'

export const getTicketSwiper = params => post('/Business/index', params) // 首页轮播图

export const getTicketBillinfo = params => get('/ocr/billinfo', params) // 上传票据，票据识别

export const getTicketwhileList = params => post('/Business/while_list', params) // 获取商票秒融首页最低利率&承兑人名单

export const getTicketFinance = params => post('/Business/finance', params) // 商票秒融首页提交试算/开始计算

export const getTicketBankLists = params => post('/Business/lists', params) // 获取商票秒融首页列表

export const getTicketCommercialPaperList = params => get('/business/commercialPaperList', params) // 获取商票秒融票据列表

export const getTicketOperateCommercialPaper = params => post('/business/operateCommercialPaper', params) // 获取商票秒融新增/修改票据

export const ticketShowCommercialPaperInfo = params => post('/business/showCommercialPaperInfo', params) // 获取商票,票据详情

export const ticketDelCommercialPaper = params => post('/business/delCommercialPaper', params) // 获取商票秒融新增/修改票据

export const getTicketBankInfo = params => get('/business/bankInfo', params) // 获取银行卡信息

export const operateCommercialPaperInfo = params => post('/business/operateCommercialPaperInfo', params) // 完善票据信息

export const getEwmInfo = params => get('/Business/getEwmInfo', params) // 申请融资二维码信息

export const getTicketUserInfo = params => get('/Business/userInfo', params) // 查询用户和企业信息
