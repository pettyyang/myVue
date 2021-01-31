export default {
  /**
   * 求和
   */
  sum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    return sum;
  },
  /**
   * 分 转化  元
   */
  regFenToYuan(feng) {
    if (feng == null || feng == 0) {
      return 0;
    }
    let num = feng;
    num = feng * 0.01;
    num += "";
    const reg =
      num.indexOf(".") > -1
        ? /(\d{1,3})(?=(?:\d{3})+\.)/g
        : /(\d{1,3})(?=(?:\d{3})+$)/g;
    num = num.replace(reg, "$1");
    num = this.toDecimal2(num);
    return num;
  },
  /**
   * 强制保留2位小数，如：2，会在2后面补上00.即2.00
   */
  toDecimal2(x) {
    const floatx = parseFloat(x);
    if (isNaN(floatx)) {
      return 0;
    }
    const f = Math.round(x * 100) / 100;
    let s = f.toString();
    let rs = s.indexOf(".");
    if (rs < 0) {
      rs = s.length;
      s += ".";
    }
    while (s.length <= rs + 2) {
      s += "0";
    }
    return s;
  },
  /**
   * 传入字符串/int --> 输入int
   */
  toInt(sourse) {
    if (sourse == null) {
      return 0;
    }
    if (typeof sourse == "string") {
      return parseInt(sourse);
    } else if (typeof sourse == "number") {
      return sourse;
    } else {
      return sourse;
    }
  },
  /**
   * 保留一位小数
   */
  keepOneDecimal(num) {
    let result = 0;
    if (typeof num == "string") {
      result = parseFloat(num);
    } else {
      result = num;
    }
    if (isNaN(result)) {
      console.log("函数参数格式错误");
      return 0;
    }
    const f = Math.round(result * 10) / 10;
    let s = f.toString();
    let rs = s.indexOf(".");
    if (rs < 0) {
      rs = s.length;
      s += ".";
    }
    while (s.length <= rs + 1) {
      s += "0";
    }
    return s;
  }
};
