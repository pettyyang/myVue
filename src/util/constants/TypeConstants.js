export default {
  /**
   * 短信验证码类型
   */
  smsCodeType: {
    sms: 1, // 短信验证码
    changeTel: 2, // 更换手机号
    forgetPwd: 3 // 忘记密码 修改密码
  },
  /**
   * 证件类型
   */
  certType: [
    {
      id: 1,
      val: 'ID',
      lab: '身份证'
    },
    {
      id: 2,
      val: 'TAX_REG_CERT',
      lab: '税务登记证'
    },
    {
      id: 3,
      val: 'ORG_CODE',
      lab: '组织机构代码证'
    },
    {
      id: 4,
      val: 'BUSINESS_LICENSE',
      lab: '营业执照'
    },
    {
      id: 5,
      val: 'UNIFIED_SOCIAL_CREDIT_CODE',
      lab: '统一社会信用代码证'
    }
  ],
  certType1: [
    {
      id: 0,
      val: 0,
      lab: '中国大陆居民身份证'
    },
    {
      id: 1,
      val: 1,
      lab: '港澳居民来往内地通行证'
    },
    {
      id: 2,
      val: 2,
      lab: '台湾居民来往大陆通行证'
    },
    {
      id: 3,
      val: 3,
      lab: '护照'
    }
  ],
  /**
   * 客户状态
   */

  customerStatus: [
    {
      id: 1,
      lab: '已注册未实名'
    },
    {
      id: 2,
      lab: '已实名未开通'
    },
    {
      id: 5,
      lab: '已实名已开通已完成'
    },
    {
      id: 11,
      lab: '已开通未交易'
    },
    {
      id: 12,
      lab: '已交易未发展'
    }
  ],
  /**
   * 票据贴现状态
  */
  tradeStatus: {
    tradeStatus_SUCCESS: {
      val: 'SUCCESS',
      lab: '成功',
      class: 'green'
    },
    tradeStatus_FAIL: {
      val: 'FAIL',
      lab: '失败',
      class: 'red'
    },
    tradeStatus_NO_DRAFT_INFO: {
      val: 'NO_DRAFT_INFO',
      lab: '无此票据信息',
      class: ''
    }
  },
  /**
   * 票据类型
   */
  paperType: [
    {
      val: '1',
      lab: '兴业'
    },
    {
      val: '2',
      lab: '京东'
    }
  ],
  /**
   * 银行渠道类型
   */
  bankChannelType: {
    bankChannelType_FUMIN: {
      val: 'FUMIN',
      lab: '重庆富民银行'
    },
    bankChannelType_ZBANK: {
      val: 'ZBANK',
      lab: '武汉众邦银行'
    },
    bankChannelType_ZHENX: {
      val: 'ZHENX',
      lab: '辽宁振兴银行'
    }
  },
  /**
   * 机构类型
   */
  orgType: [
    {
      val: 'CORPORATION',
      lab: '法人企业'
    },
    {
      val: 'NOT_CORPORATION',
      lab: '非法人企业'
    }
  ],
  /**
   * 机构类型类型
   */
  subInstTp: [
    {
      val: 'BUSINESS_ENTERPRISE',
      lab: '法人企业'
    },
    {
      val: 'UNINCORPORATED_ENTERPRISE_11',
      lab: '其他企业'
    },
    {
      val: 'UNINCORPORATED_ENTERPRISE_12',
      lab: '农民专业合作社'
    },
    {
      val: 'UNINCORPORATED_ENTERPRISE_13',
      lab: '个人独资、合伙企业'
    },
    {
      val: 'UNINCORPORATED_ENTERPRISE_14',
      lab: '企业的分支机构'
    }
  ],
  /**
   * 企业所有制类型
   */
  orgOwnershipType: [
    {
      val: 'STATE',
      lab: '国有控股企业'
    },
    {
      val: 'COLLECTIVITY',
      lab: '集体控股企业'
    },
    {
      val: 'PRIVATE',
      lab: '私人控股企业'
    },
    {
      val: 'HONGKONG_MACAO_TAIWAN',
      lab: '港澳台商控股企业'
    },
    {
      val: 'FOREIGN',
      lab: '外商控股企业'
    }
  ],
  /**
   * 出资方式
   */
  investmentForm: [
    {
      val: 'CURRENCY',
      lab: '资金'
    },
    {
      val: 'ENTITY',
      lab: '实物'
    },
    {
      val: 'TECHNOLOGY',
      lab: '技术'
    },
    {
      val: 'RIGHT',
      lab: '权利'
    },
    {
      val: 'OTHER',
      lab: '其他'
    }
  ],
  /**
   * 币种
   */
  currencyType: [
    {
      val: 'CNY',
      lab: '人民币'
    },
    {
      val: 'HKD',
      lab: '港币'
    },
    {
      val: 'TWD',
      lab: '台币'
    },
    {
      val: 'EUR',
      lab: '欧元'
    },
    {
      val: 'USD',
      lab: '美元'
    },
    {
      val: 'GBP',
      lab: '英镑'
    },
    {
      val: 'JPY',
      lab: '日元'
    }
  ],
  /**
   * 上市公司类型
   */
  lstdCoTp: [
    {
      val: 'LISTED_A',
      lab: 'A股上市'
    },
    {
      val: 'LISTED_B',
      lab: 'B股上市'
    },
    {
      val: 'LISTED_H',
      lab: '香港上市'
    },
    {
      val: 'LISTED_F',
      lab: '海外上市'
    },
    {
      val: 'LISTED_2',
      lab: '非上市'
    }
  ],
  /**
   * 有无进出口经营权
   */
  importExportFlg: [
    {
      val: '1',
      lab: '是'
    },
    {
      val: '2',
      lab: '否'
    }
  ],
  /**
   * 地址区域选择
   */
  regsAddrArea: [
    {
      val: '1',
      lab: '城市'
    },
    {
      val: '2',
      lab: '农村'
    }
  ],
  /**
   * 职务类型
   */
  positionType: {
    positionType_LEGAL_REPRESENTATIVE: {
      val: 'LEGAL_REPRESENTATIVE',
      lab: '法人代表'
    },
    positionType_CHAIRMAN: {
      val: 'CHAIRMAN',
      lab: '公司董事长'
    },
    positionType_CEO: {
      val: 'CEO',
      lab: '公司总经理/厂长/CEO'
    },
    positionType_CFO: {
      val: 'CFO',
      lab: '财务主管/CFO'
    },
    positionType_AUTHORIZER: {
      val: 'AUTHORIZER',
      lab: '授权经办人'
    },
    positionType_DEPT_MANAGER: {
      val: 'DEPT_MANAGER',
      lab: '部门经理'
    },
    positionType_DIRECTOR: {
      val: 'DIRECTOR',
      lab: '董事'
    },
    positionType_SUPERVISOR: {
      val: 'SUPERVISOR',
      lab: '监事'
    },
    positionType_OWER: {
      val: 'OWER',
      lab: '实际控制人'
    }
  }
}
