import Mock from "mockjs";

function setmock(path, method = "get", data = {}, state = { success: false }) {
  // path=> mock-url method=> get/post data=>return data state =>back status
  function reg(strings) {
    // RegExp
    return new RegExp(strings.replace(/\//g, `\\/`));
  }
  let { success } = state;
  path = path.indexOf("\\") > -1 ? path : reg(path);
  let datas = {
    success: !success,
    status: 200
  };
  datas = Object.assign(datas, data);
  Mock.mock(path, method, option => {
    return datas;
  });
}
let regUsr = "/api/user/index";
// setmock(regUsr, "get", { get: "" });

const setPrice = "/api/user/setPrice";
setmock(setPrice, "post", { res: 1, meg: "设置成功" });

const isUser = "/User/isUser";
setmock(isUser, "post", { res: 1, meg: "设置成功" });

const services = "/api/user/services";
setmock(services, "get", {
  res: 1,
  msg: "成功",
  data: {
    total_page: 1,
    total_num: "5",
    data: [
      { serial_no: "SPL_JA30499142655897", pay_date: "2020-10-30 17:25:15", total_amount: 20, receiver_card_no: "630950793", bank_name: "中国民生银行股份有限公司", poundage: 0, pay_time: null, status: 3 },
      { serial_no: "SPL_JA30498866723961", pay_date: "2020-10-30 17:24:48", total_amount: 20, receiver_card_no: "630950793", bank_name: "中国民生银行股份有限公司", poundage: 0, pay_time: null, status: 2 },
      { serial_no: "SPL_J707050053044341", pay_date: "2020-07-07 14:56:45", total_amount: 1, receiver_card_no: "630950793", bank_name: "中国民生银行股份有限公司", poundage: 0, pay_time: null, status: 2 },
      { serial_no: "SPL_J707049273428437", pay_date: "2020-07-07 14:55:29", total_amount: 1, receiver_card_no: "630950793", bank_name: "中国民生银行股份有限公司", poundage: 0, pay_time: null, status: 3 },
      { serial_no: "SPL_J707048471192204", pay_date: "2020-07-07 14:54:08", total_amount: 1, receiver_card_no: "630950793", bank_name: "中国民生银行股份有限公司", poundage: 0, pay_time: null, status: 3 }
    ]
  }
});

// const enquiry = "/api/get/enquiry";

// setmock(enquiry, "post", {"res":1,"msg":"成功","data":{"FUMIN":{"transMsg":"处理成功","requestId":2647022423085520898,"transStatus":"SUCCESS","serialNo":"202011032647022436884835332","code":1},"ZBANK":{"code":"UFM-DIS-100007","msg":"未查询到企业开户成功记录，请开户成功后操作","traceId":"UFM--11-9A397-2ED"},"ZHENX":{"code":"UFM-DIS-100007","msg":"未查询到企业开户成功记录，请开户成功后操作","traceId":"UFM--21-9A397-418"},"param":[{"faceAmt":"500000","bankNo":"313651070075","draftNo":"131365107015520200922728037907","bankName":"四川天府银行股份有限公司成都锦江支行","expiryDate":"2021-09-22"}],"preDiscountOrderList":[{"discountRate":"4.4400%","subOrderNo":"2647022423479839748","returnMsg":"可以贴现","discountAmt":480081.67,"orderNo":"2647022423479839747","preDiscountResult":"ALLOW_DISCOUNT","bankChannelType":"FUMIN","interest":19918.33,"draftNo":"131365107015520200922728037907","bankName":"重庆富民银行","channel":"兴业数金","bankDesc":"单张限额：0万-500万"},{"bankName":"富民银行","discountRate":"4.5%","discountAmt":479812.5,"jdFeeAmount":0,"interest":20187.5,"draftNo":"131365107015520200922728037907","bankChannelType":"FM","bankDesc":"单张限额：0万-500万","channel":"京东秒贴"},{"bankName":"蓝海银行","discountRate":"4.5%","discountAmt":479812.5,"jdFeeAmount":0,"interest":20187.5,"draftNo":"131365107015520200922728037907","bankChannelType":"WHLH","bankDesc":"单张限额：0万-500万","channel":"京东秒贴"}]}});
