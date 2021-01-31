import router from "@/router/index.js";
import store from "@/store";
import * as R from "ramda";
export default {
  // 公共路由跳转方法
  toRouter: (url, para) => {
    if (!para) {
      para = {};
    }
    let path = router.history.current.path;

    let name = url.replace(/\//g, "");
    if (path != url) {
      router.push({
        name: name,
        path: url,
        query: para
      });
    }
  },
  // 跳转新页面
  nextRouter: (path, para) => {
    if (!para) {
      para = {};
    }
    let uri = `${window.location.origin + process.env.VUE_APP_SRC}${process.env.VUE_APP_MODE == "hash" ? "#/" : ""}${path}`;
    window.open(uri);
  },
  // 获取用户信息
  getUserInfo: () => {
    let userInfo = store.state.userInfo;
    if (userInfo) {
      return userInfo;
    } else {
      return false;
    }
  },
  // 格式化时间方法type=1 YY-MM-DD hh:mm:ss type=null YY-MM-DD
  dateFormat(date, type) {
    if (date) {
      let year = date.getFullYear().toString(); // 年
      let month = (date.getMonth() + 1).toString(); // 月
      month = month.length >= 2 ? month : "0" + month;
      let day = date.getDate().toString(); // 日
      day = day.length >= 2 ? day : "0" + day;
      let hours = date.getHours().toString(); // 时
      hours = hours.length >= 2 ? hours : "0" + hours;
      let minutes = date.getMinutes().toString(); // 分
      minutes = minutes.length >= 2 ? minutes : "0" + minutes;
      let seconds = date.getSeconds().toString(); // 秒
      seconds = seconds.length >= 2 ? seconds : "0" + seconds;
      if (type == 1) {
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
      } else {
        return year + "-" + month + "-" + day;
      }
    }
  },
  /**
   * Parse the time to string
   * @param {(Object|string|number)} time
   * @param {string} cFormat
   * @returns {string}
   */
  parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date;
    if (typeof time === "object") {
      date = time;
    } else {
      if (typeof time === "string" && /^[0-9]+$/.test(time)) {
        time = parseInt(time);
      }
      if (typeof time === "number" && time.toString().length === 10) {
        time = time * 1000;
      }
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
      t: date
        .getFullYear()
        .toString()
        .substr(2, 4)
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a|t)+}/g, (result, key) => {
      let value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === "a") {
        return ["日", "一", "二", "三", "四", "五", "六"][value];
      }
      if (result.length > 0 && value < 10) {
        value = "0" + value;
      }
      return value || 0;
    });
    return time_str;
  },
  // 文件类型转Base64
  fileToBase64(file) {
    let p = new Promise((rs, rj) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ev => {
        let dataUrl = ev.target.result;
        rs(dataUrl);
      };
    });
    return p;
  },
  // Base64转换成blob
  base64ToBlob(Base64) {
    // console.log(12, Base64);
    let arr = Base64.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  },
  // blob转换为file
  blobToFile(theBlob, fileName) {
    if (this.ieVersion() != -1) {
      // IE浏览器
      let formData = new FormData();
      // data 为二进制的blob图片数据,//fileName 文件名
      formData.append("files", theBlob, fileName);
      return formData.get("files");
      // theBlob.lastModifiedDate = new Date();
      // theBlob.name = fileName;
      // return theBlob;
    } else {
      let imgFile = new File([theBlob], fileName, { type: File, lastModified: Date.now() });
      return imgFile;
    }
  },

  // 图片转Base64
  getImageBase64(img, ext = "jpg") {
    img.crossOrigin = "*";
    var canvas = document.createElement("canvas"); // 创建canvas DOM元素，并设置其宽高和图片一样
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height); // 使用画布画图
    var dataURL = canvas.toDataURL("image/" + ext); // 返回的是一串Base64编码的URL并指定格式
    canvas = null; // 释放
    // console.log(1, dataURL)
    return dataURL;
  },
  ieVersion() {
    var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; // 判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; // 判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        return 7;
      } else if (fIEVersion == 8) {
        return 8;
      } else if (fIEVersion == 9) {
        return 9;
      } else if (fIEVersion == 10) {
        return 10;
      } else {
        return 6; // IE版本<=7
      }
    } else if (isEdge) {
      return "edge"; // edge
    } else if (isIE11) {
      return 11; // IE11
    } else {
      return -1; // 不是ie浏览器
    }
  },
  // 利用canvas压缩图片，根据画布大小和图像质量压缩
  canvasDataURL(Base64) {
    let p = new Promise((rs, rj) => {
      var img = new Image();
      img.src = Base64;
      let that = this;
      img.onload = function() {
        // 默认按照比例压缩
        var scale = this.width / this.height;
        // 规定压缩后的大小
        var canvasWidth = 550;
        var canvasHeight = canvasWidth / scale;
        // 生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        // 创建节点属性
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        var anw = document.createAttribute("width");
        anw.nodeValue = canvasWidth;
        var anh = document.createAttribute("height");
        anh.nodeValue = canvasHeight;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(this, 0, 0, canvasWidth, canvasHeight);
        // 图像质量,值越小，所绘制出的图像越模糊
        var quality = 0.92;
        var Base64String = canvas.toDataURL("img/png", quality);
        var blob = that.base64ToBlob(Base64String);
        // 通过Base64获取二进制文件
        var files = that.blobToFile(blob, "new.png");
        rs(files);
      };
    });
    return p;
  },
  urlTofile(url, filename = "default.jpeg", contentType = "image/jpeg") {
    return new Promise((resolve, reject) => {
      try {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var img = new Image();
        img.crossOrigin = "*";
        img.src = url;
        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          var URLData = canvas.toDataURL("image/png");
          canvas = null;
          var arr = URLData.split(","); // 去掉Base64格式图片的头部
          var bstr = atob(arr[1]); // atob()方法将数据解码
          var leng = bstr.length;
          var u8arr = new Uint8Array(leng);
          while (leng--) {
            u8arr[leng] = bstr.charCodeAt(leng); // 返回指定位置的字符的 Unicode 编码
          }
          resolve(new File([u8arr], filename, { type: contentType }));
        };
      } catch (error) {
        console.log("Turbo: urlTofile -> error", error);
        reject(new Error(error));
      }
    });
  },
  isEmpty(inType) {
    return R.isEmpty(inType);
  }
};
