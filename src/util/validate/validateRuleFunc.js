import {
  isValidPhone,
  isValidPwd,
  isvalidCriditcode,
  isValidZipCode,
  isValidNumber18,
  isValidIdCardlegal,
  isvalidUsername,
  isValidEmail
} from "./validate.js";
/*
 *
 *  验证手机号
 * */
const validPhone = function(rule, value, callback) {
  if (value === "") {
    return callback(new Error("请输入手机号"));
  } else if (value.toString().length !== 11) {
    return callback(new Error("手机号必须是11位数字"));
  } else if (!isValidPhone(value)) {
    return callback(new Error("请输入正确的手机号"));
  } else {
    callback();
  }
};
/*
 *
 *  验证密码
 * */
const validPwd = function(rule, value, callback) {
  if (value === "") {
    return callback(new Error("请输入密码"));
  }else if (!isValidPwd(value)) {
    return callback(new Error("只能输入6-20个字母、数字、下划线"));
  } else {
    callback();
  }
};
/*
 *
 *  验证邮政编码
 * */
const validZipCode = function(rule, value, callback) {
    if (value === "") {
      return callback(new Error("请输入邮政编码"));
    } else if (!isValidZipCode(value)) {
      return callback(new Error("请输入6位邮政编码"));
    } else {
      callback();
    }
  };
/*
 *
 *  验证18位统一社会信用码
 * */
const validCreditCode = function(rule, value, callback) {
  if (value === "") {
    return callback(new Error("请输入18位统一社会信用码"));
  } else if (!isvalidCriditcode(value)) {
    return callback(new Error("统一社会信用码只能是数字、字母"));
  } else {
    callback();
  }
};
/*
 *
 *  验证身份证号
 * */
const validIdCard = function(rule, value, callback) {
  if (value == "") {
    return callback(new Error("请输入身份证号"));
  } else if (!isValidIdCardlegal(value)) {
    callback(new Error("请输入正确的身份证号码"));
  } else {
    callback();
  }
};

/*
 *  验证邮箱
 * */
const validEmail = function(rule, value, callback) {
  if (value == "" || value == undefined) {
    return callback();
  } else if (value.length > 30) {
    return callback(new Error("限制不能超过30个字符串"));
  } else if (!isValidEmail(value)) {
    return callback(new Error("请正确输入邮箱格式"));
  } else {
    callback();
  }
};

/*
 *
 *  验证输入框 -数字/字符/下划线
 * */
const validInputCharNumber = function(rule, value, callback) {
  if (value == "" || value == undefined) {
    return callback();
  } else if (value.length > 30) {
    return callback(new Error("限制不能超过30个字符串"));
  } else if (!isvalidUsername(value)) {
    return callback(new Error("只能输入字母、数字、下划线"));
  } else {
    callback();
  }
};

/*
 *
 *  验证输入框 -数字/字符/下划线
 * */
const validIptLen = function(rule, value, callback) {
    if (value == "" || value == undefined) {
      return callback();
    } else if (value.length > 30) {
      return callback(new Error("限制不能超过30个字符串"));
    } else {
      callback();
    }
  };

export default{
    validPhone,
    validPwd,
    validZipCode,
    validCreditCode,
    validIdCard,
    validEmail,
    validInputCharNumber,
    validIptLen,
}
