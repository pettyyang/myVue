const numm = (num) => {
  var obj = { "1": "一", "2": "二", "3": "三", "4": "四", "5": "五", "6": "六", "7": "七", "8": "八", "9": "九", "0": "十" }
  var num = num + "";
  if (num.length == 1) {
    return obj[num]
  }
  if (num.length == 2) {
    var a = num.split('')[0]
    var b = num.split('')[1]
    if (a == "1" && b == "0") {
      return "十"
    } else if (a == "1" && b != "0") {
      return "十" + obj[b];
    } else if (a != "1" && b == "0") {

      return obj[a] + "十";
    } else {
      return obj[a] + "十" + obj[b];

    }
  }
  if (num.length == 3) {
    var a = num.split('')[0]
    var b = num.split('')[1]
    var c = num.split('')[2]
    if (b == "0" && c == "0") {
      return obj[a] + "百";
    }
    if (b == "0" && c != "0") {
      return obj[a] + "百" + "零" + obj[c];
    }
    if (b != "0" && c == "0") {
      return obj[a] + "百" + obj[b] + "十";
    }
    return obj[a] + "百" + obj[b] + "十" + obj[c];
  }
}

export {
  numm
}