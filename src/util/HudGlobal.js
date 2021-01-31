import Vue from 'vue';
const currentVue = null;
export default {
  /*
      *  显示 -确定 -弹框
      * */
  showAlertMessage: function (message, func) {
    const msg = message.length > 0 ? message : '您确定要做此操作吗!';
    this.getVue().$alert(msg, '温馨提示', {
      confirmButtonText: '确定',
      callback: func
    });

  },
  /**
   * 显示-操作-confirm-确定弹框
   * @param message   弹框内容
   * @param cancleMsg 消失弹框信息
   *
   */
  showAlertConfirmMessage: function (message, cancleMsg) {
    return this.showAlertConfirmMessages(message, cancleMsg, "温馨提示");
  },
  /**
   * 显示-操作-confirm-确定弹框
   * @param message   弹框内容
   * @param cancleMsg 消失弹框信息
   *
   */
  showAlertConfirmMessages: function (message, cancleMsg, title) {
    const that = this;
    const msg = message.length > 0 ? message : "您确定要做这个操作吗?";

    if (cancleMsg == null || cancleMsg == undefined) {
      cancleMsg = "取消成功";
    } else {
      cancleMsg = cancleMsg.length > 0 ? cancleMsg : "取消成功";
    }

    // 点击确定之后 -回调
    return new Promise((resolve, reject) => {
      that.getVue().$confirm(msg, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定之后执行方法
        if (resolve) {
          resolve();
        }
      }).catch(() => {
        // 取消之后
        // that.showInfoWithMessage(cancleMsg);
      });

    });
  },
  /*
  *   显示操作成功-hud
  **/
  showSuccessWithMessage: function (message) {
    if (message == null || message == undefined) {
      message = "操作成功";
    }
    const msg = message.length > 0 ? message : '操作成功!';
    this.getVue().$message({
      type: 'success',
      message: msg
    });
  },
  /*
  *  显示操作信息
  * */
  showInfoWithMessage: function (message) {
    if (message == null || message == undefined) {
      message = "取消成功";
    }
    const msg = message.length > 0 ? message : '取消成功';
    this.getVue().$message({
      type: 'info',
      message: msg,
    });
  },
  /*
  *   显示操作失败-hud
  **/
  showErrorWithMessage: function (message) {
    if (message == null || message == undefined) {
      message = "操作失败!";
    }
    const msg = message.length > 0 ? message : '操作失败!';
    this.getVue().$notify.error({
      title: '失败',
      message: msg
    });
  },
  /*
  *   显示信息
  **/
  showMessage: function (message) {
    const msg = message.length > 0 ? message : '执行操作';
    this.getVue().$message({
      type: 'info',
      message: msg,
    });
  },
  /*
  *
  *  显示警告信息
  * */
  showWarningWithMessage: function (message) {
    const msg = message.length > 0 ? message : '取消成功';
    this.getVue().$message({
      type: 'warning',
      message: msg,
    });
  },

  /**
   * 获取当前vue
   * @returns {Vue | Vue}
   */
  getVue: function () {
    if (this.currentVue == null) {
      this.currentVue = new Vue();
    }
    return this.currentVue;
  },

}
