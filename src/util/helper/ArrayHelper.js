export default {
  /**
   * 数组去重
   */
  filterRepetitionArray(arrList){
    if(arrList == null || arrList.length == 0){
      return arrList;
    }
    const resultList = [];
    for (let i = 0; i < arrList.length; i++) {
      const item = arrList[i];
      if(resultList.indexOf(item) == -1){
        resultList.push(item);
      }
    }
    return resultList;

  }, /**
   * 数组 - 属性去重
   * prop 属性名称字符串  e,g filterRepetitionArrayByProperty(list, 'name')
   */
  filterRepetitionArrayByProperty(arrList, prop){
    if(arrList == null || arrList.length == 0){
      return arrList;
    }
    return arrList.filter(function(element,index,self){
      return self.findIndex(el=>el[prop]==element[prop])===index
    });
  }
}
