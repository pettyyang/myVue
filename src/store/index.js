import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ],
  state: {
    baseicp: '',
    baseLogo: '',
    LoginInfo: {},
    beforOss: 'dOttAufD49w91S1Ewt6DptY9Mtvm7wEFgua4SM',
    ossInfo: {},
    baseServiceTel: '',
    userInfo: {},
    $dataBilInfo: {},
    $businessLicense: {}, // 营业执照信息
    $companyMsg: {}, // 企业信息填写
    $openFUMIN: {}, // 富明开户
    notifications: [],
    commercialApplyParams: {} // 商票速融首页点击申请融资后，传至票据列表页参数
  },
  mutations: {
    setbaseLogo (state, data) {
      state.baseLogo = data
    },
    setLoginInfo (state, data) {
      state.LoginInfo = data
    },
    setOssInfo (state, data) {
      state.ossInfo = data
    },
    setbaseicp (state, data) {
      state.baseicp = data
    },
    setbaseServiceTel (state, data) {
      state.baseServiceTel = data
    },
    setNotifications (state, data) {
      state.notifications = data
    },
    setUserInfo (state, data) {
      state.userInfo = data
    },
    setDataBilInfo (state, data) {
      state.$dataBilInfo = data
    },
    setCompanyMsg (state, data) {
      state.$companyMsg = data
      localStorage.setItem('$openFUMIN', JSON.stringify(state.$openFUMIN))
      console.log('企业信息填写缓存****', state.$companyMsg)
    },
    setCompanyLicence (state, data) {
      state.$businessLicense = data
      localStorage.setItem('$businessLicense', JSON.stringify(state.$openFUMIN))
      console.log('营业执照信息缓存*****', JSON.stringify(state.$businessLicense))
    },
    setOpenFUMIN (state, data) {
      state.$openFUMIN = data
      localStorage.setItem('$openFUMIN', JSON.stringify(state.$openFUMIN))
      console.log('富民开户缓存*****', localStorage.getItem('$openFUMIN'))
    },
    setCommercialApplyParams (state, data) {
      state.commercialApplyParams = data
    }
  },
  actions: {},
  modules: {}
})
