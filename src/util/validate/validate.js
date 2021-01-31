/**
 * 验证字符是否是数字
 * @param val
 * @returns {boolean}
 */
function isNumber(val) {
  let regPos = /^\d+(\.\d+)?$/; //非负浮点数
  let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}
/**
 * 验证手机号
 * @param phone
 */
export function isValidPhone(phone) {
  let regPos = /^1[3456789]\d{9}$/; //非负浮点数
  if (regPos.test(phone)) {
    return true;
  } else {
    return false;
  }
}
/*
 * 密码
 */
export function isValidPwd(str) {
  // 密码正则（只能输入6-20个字母、数字、下划线）
  const uregex = /^[0-9a-zA-Z_]{6,20}$/;
  // 密码同时包含数字和字母
  // const uregex = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
  if (uregex.test(str)) {
    return true;
  } else {
    return false;
  }
}
/*
* 验证18统一信用码
* */
export function isvalidCriditcode(str) {
  //正则（字母，数字，下划线）
  const uregex = /^[0-9a-zA-Z]{18}$/;
  if (uregex.test(str)) {
    return true;
  } else {
    return false;
  }

}
/*
* 验证邮箱
* */
export function isValidEmail(email) {
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(email);
}
/**
 * 验证邮政编码
 */
export function isValidZipCode(val, n) {
  let regNeg = /^[0-9]{6}$/;
  if (regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}
/*
* 字母，数字，下划线
* */
export function isvalidUsername(str) {
  //用户名正则（字母，数字，下划线）
  const uregex = /^[0-9a-zA-Z_]+$/;
  const result = uregex.test(str);
  // console.log('正则匹配',result);
  return result;

}
/*
* 普通字符，没有特殊符号
* */
export function isContainerSpecifyKey(value) {
  const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
  if (!pattern.test(value)) {
    return true;
  }
  return false;
}
/**
 * 是否包含数字
 */
export function isContainerNumber(val) {
  let regNeg = /[0-9]/; //数字
  if (regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}
/**
 * 验证网址
 * @param val
 * @returns {boolean}
 */
export function isValidateUrl(urlName) {

  var urlP = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  return urlP.test(urlName);
}
/**
 * 验证身份证是否合法
 * @param idCard 身份证号
 */
export function isValidIdCardlegal(idCard) {

  // 1. 是否是字符串类型
  if (typeof idCard !== 'string')
    return false;

  // 2.是否有数据
  if (idCard == null || idCard == undefined || idCard.length == 0) {
    return false;
  }

  // 3.长度
  // 3. 模拟数据信息
  let info = {
    y: '1900',
    m: '01',
    d: '01',
    sex: 'male',
    valid: false,
    length: 0
  }
  let isValid = false;
  // 18
  if (/^\d{17}[0-9x]$/i.test(idCard)) {
    if (!p_initDate(18, info, idCard)) {
      return isValid;
    }
    idCard = idCard.toLowerCase().split('');
    let wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let y = '10x98765432'.split('');
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += wi[i] * idCard[i];
    }
    if (y[sum % 11] === idCard.pop().toLowerCase()) {
      isValid = true;
    }
    return isValid;

    // 15
  } else if (/^\d{15}$/.test(idCard)) {
    if (p_initDate(15, info, idCard)) {
      isValid = true;
    }
    return isValid;
  } else {

    return isValid;
  }
}


//====================================pravite=========================================//
/**
 *   私有方法 - 验证身份证有效
 * @param length
 * @param info
 * @param id
 * @returns {boolean}
 */
function p_initDate(length, info, id) {
  info.length = length
  let a
  a = (length === 15) ? 0 : 2 // 15:18
  let temp
  info.y = (a ? '' : '19') + id.substring(6, 8 + a)
  info.m = id.substring(8 + a, 10 + a)
  info.d = id.substring(10 + a, 12 + a)
  info.sex = id.substring(14, 15 + a) % 2 === 0 ? 'female' : 'male'
  temp = new Date(info.y, info.m - 1, info.d)
  return (temp.getFullYear() === info.y * 1) &&
    (temp.getMonth() + 1 === info.m * 1) &&
    (temp.getDate() === info.d * 1)
}
