// 函数式编程  tree-shaking 只对使用 export 导出的变量生效

/**
 * 浏览器类型
 */
export function Browser() {
  let u = window.navigator.userAgent;
  return {
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
    iPad: u.indexOf('iPad') > -1, //是否为iPad
    webApp: u.indexOf('Safari') == -1, //是否为web应用程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, //是否为微信浏览器
  };
}

/**
 * HidePartPhone 隐藏中间部分手机号码
 * @param {String} phone 手机号
 */
export function HidePartPhone(phone: string) {
  let temp = `${phone.slice(0, 3)}****${phone.slice(
    phone.length - 4,
    phone.length
  )}`;
  return temp;
}

/**
 * FormatDate 格式化日期
 * @param { Date } date
 * @param {String} fmt 'yyyy-MM-dd hh:mm:ss'
 * @param {boolean} isTimeline 是否是时间戳格式，精确到秒
 */
export function FormatDate(
  date: any,
  fmt = 'yyyy-MM-dd hh:mm:ss',
  isTimeline = false
) {
  if (isTimeline) {
    if (date.length < 13) {
      date = date * 1000;
    }
    date = new Date(date);
  }
  let padLeftZero = (str: string) => ('00' + str).substr(str.length);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k of Object.keys(o) as Array<keyof typeof o>) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

/**
 * @description 格式化金额
 * @param number：要格式化的数字
 * @param decimals：保留几位小数 默认0位
 * @param decPoint：小数点符号 默认.
 * @param thousandsSep：千分位符号 默认为,
 */
export const FormatMoney = (
  number: number | string,
  decimals = 2,
  decPoint = '.',
  thousandsSep = ','
) => {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  let n = !isFinite(+number) ? 0 : +number;
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  let sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
  let dec = typeof decPoint === 'undefined' ? '.' : decPoint;
  let s: any = '';
  let toFixedFix = function (n: number, prec: number) {
    let k = Math.pow(10, prec);
    return '' + Math.round(n * k) / k;
  };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (thousandsSep) {
    let re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2');
    }
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
};

/**
 * 将大额数字化作带有中文单位的简短数字
 * @param {number} n 转换的数字
 * @returns
 */
export function TransferIntUnitToCh(n: any) {
  if (typeof n == 'number') {
    n = String(n);
  }
  const units = [
    {
      value: 1000,
      unit: '千',
    },
    {
      value: 10000,
      unit: '万',
    },
  ];
  let result = n;
  for (let i = units.length - 1; i >= 0; i--) {
    if (n >= units[i].value) {
      let k = n / units[i].value;
      result = k + units[i].unit;
      break;
    }
  }
  return result;
}

/**
 * 补齐个位数字+0
 * @param val 
 * @returns 
 */
export function TransferNumberZero(val: string) {
  return val.length <= 1 ? '0' + val : val;
}