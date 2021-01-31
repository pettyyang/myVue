export default {
  /**
   * 点击下载方法
   */
  downWithUrl(url){
    if(url == null || url.length == 0){
      return;
    }
    window.open(url, "_blank").location;
  },
  /**
   * 打开新的网页
   */
  openWithUrl(url){
    if(url == null || url.length == 0){
      return;
    }
    window.open(url, "_blank").location;
  },
  /**
   * 关闭窗口
   */
  closeWindowEvent(){
    let userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
      window.location.href="about:blank";
      window.opener = null;
      window.open(" ", "_self").location;
      window.close();
    } else {
      window.opener = null;
      window.open(" ", "_self").location;
      window.close();
    }
  },
}
