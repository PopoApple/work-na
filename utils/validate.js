export function isvalidUsername(str) {
  return str.length > 0
}

export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export const vaildatePc = function () {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod']
  let flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

/**
 * 判断身份证号码
 */
export function cardid(code) {
  const list = []
  let result = true
  let msg = ''
  var city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  }
  if (!validatenull(code)) {
    if (code.length === 18) {
      if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
        msg = '证件号码格式错误'
      } else if (!city[code.substr(0, 2)]) {
        msg = '地址编码错误'
      } else {
        code = code.split('')
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x']
        var sum = 0
        var ai = 0
        var wi = 0
        for (var i = 0; i < 17; i++) {
          ai = code[i]
          wi = factor[i]
          sum += ai * wi
        }
        if (parity[sum % 11] !== code[17]) {
          msg = '证件号码校验位错误'
        } else {
          result = false
        }
      }
    } else {
      msg = '证件号码长度不为18位'
    }
  } else {
    msg = '证件号码不能为空'
  }
  list.push(result)
  list.push(msg)
  return list
}

/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile(phone) {
  const list = []
  let result = true
  let msg = ''
  // 主要意思是匹配一个0开头后跟2到3位的数字加个-再跟上 7到8位的数字；已经过时了,暂时用一个简陋的正则代替
  var isPhone = /^0\d{2,3}-?\d{7,8}$/
  if (!validatenull(phone)) {
    if (phone.length === 11) {
      if (isPhone.test(phone)) {
        msg = '手机号码格式不正确'
      } else {
        result = false
      }
    } else {
      msg = '手机号码长度不为11位'
    }
  } else {
    msg = '手机号码不能为空'
  }
  list.push(result)
  list.push(msg)
  return list
}

/**
 * elementui表单校验手机号
 */
export function validatorPhone(rule, value, callback) {
  if (value === '') {
    callback(new Error('手机号不能为空'))
  } else if (!/^1\d{10}$/.test(value)) {
    callback(new Error('手机号格式错误'))
  } else {
    callback()
  }
}


/**
 * 判断姓名是否正确
 */
export function validatename(name) {
  var regName = /^[\u4e00-\u9fa5]{2,4}$/
  if (!regName.test(name)) {
    return false
  }
  return true
}

/**
 * 判断是否为整数
 */
export function validatenum(num, type) {
  let regName = /[^\d.]/g
  if (type === 1) {
    if (!regName.test(num)) {
      return false
    }
  } else if (type === 2) {
    regName = /[^\d]/g
    if (!regName.test(num)) {
      return false
    }
  }
  return true
}

/**
 * 判断是否为小数
 */
export function validatenumord(num, type) {
  let regName = /[^\d.]/g
  if (type === 1) {
    if (!regName.test(num)) {
      return false
    }
  } else if (type === 2) {
    regName = /[^\d.]/g
    if (!regName.test(num)) {
      return false
    }
  }
  return true
}

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (val instanceof Array) {
    if (val.length === 0) {
      return true
    }
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') {
      return true
    }
  } else {
    if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') {
      return true
    }
    return false
  }
  return false
}

/**
 * 校验整数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const checkInt = (rule, value, callback) => {
  if (value && !(/^-?[1-9]\d*$/.test(value))) {
    return callback(new Error('只能输入整数'))
  } else {
    callback()
  }
}

/**
 * 校验数字
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const checkNumber = (rule, value, callback) => {
  if (value && !(/^-?(0|[1-9]\d*)\.*\d*$/.test(value))) {
    return callback(new Error('只能输入数字'))
  } else {
    callback()
  }
}


/**
 * 校验金额
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const checkPrice = (rule, value, callback) => {
  let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
  if (value && !(reg.test(value))) {
    return callback(new Error('请输入整数或保留两位小数'))
  } else {
    callback()
  }
}


/**
 * 去除字符串空格
 * @param {*} str 
 */
export const stringTrim = (str) => {
  return !validatenull(str) ? str.replace(/\s+/g, "") : ''
}

/**
 * 校验数据是否为数组
 * @param {*} arr 
 */
export const isArray = (arr) => {
  return Object.prototype.toString.call(arr) == '[object Array]';
}

// 手机号校验
export function isPhoneNumber(phoneNum) {
  // let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  /*
    * 移动号码包括的号段：134/135/136/137,138,139；
  *                     147/148(物联卡号)；
  *                     150/151/152/157/158/159；
  *                     165（虚拟运营商）；
  *                     1703/1705/1706（虚拟运营商）、178；
  *                     182/183/184/187/188
  *                     198

  * 联通号段包括：130/131
  *               145
  *               155/156
  *               166/167(虚拟运营商)
  *               1704/1707/1708/1709、171
  *               186/186
  *
  * 电信号段包括： 133
  *                153
  *                162(虚拟运营商)
  *                1700/1701/1702(虚拟运营商)
  *                180/181/189
  *                191/199
  * */
  let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
  return reg.test(phoneNum);
}