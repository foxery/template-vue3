import { useIdentityStore, useUserStateStore } from '@/stores/modules/userState';
import './typing.d';

const nowWindow = window as any;
/**
 * 判断当前客户端是安卓还是ios
 */
export function Client() {
  if ('webView' in nowWindow) {
    return 'android';
  } else if ('getInfo' in nowWindow) {
    return 'ios';
  }
}

/**
 * 判断当前环境是否在公司app内
 * @returns {Boolean}
 */
export function InApp() {
  return Client() == 'android' || Client() == 'ios';
}

/**
 * 获取用户相关信息
 */
export function GetUserInfo() {
  let data;

  if ('webView' in nowWindow && 'getInfo' in nowWindow.webView) {
    //android的方式获取值
    data = JSON.parse(nowWindow.webView.getInfo());
  } else if ('getInfo' in nowWindow) {
    //ios的方式获取值
    data = nowWindow.getInfo;
  } else {
    const userState = useUserStateStore();
    // 微信授权
    if (userState.userInfo && Object.keys(userState.userInfo).length > 0) {
      // @ts-ignore
      let { nickname, openid, phone, token, unionid, id, identity, audit } = userState.userInfo;
      data = {
        did: id,
        uid: id,
        token: token,
        phone: phone,
        app_client: identity,
        version: '',
        audit: audit,
        nickname: nickname,
        d_nickname: nickname,
        openid: openid,
        unionid: unionid,
      };
    }
  }
  return (
    data || {
      did: '',
      uid: 0,
      token: '',
      phone: '',
      app_client: '',
      version: '',
      audit: 1,
      nickname: '',
      d_nickname: '',
      openid: '',
      unionid: '',
    }
  );
}

/**
 * 是否隐藏app原生导航栏
 * @param {Boolean} status true-隐藏 false-显示
 */
export function HiddenAppNavBar(status: boolean) {
  if (Client() == 'android') {
    if ('webView' in nowWindow && 'hiddenNavBar' in nowWindow.webView) {
      let temp = status.toString();
      nowWindow.webView.hiddenNavBar(temp);
    }
  } else {
    if (
      nowWindow.webkit &&
      nowWindow.webkit.messageHandlers &&
      nowWindow.webkit.messageHandlers.hiddenNavBar
    ) {
      nowWindow.webkit.messageHandlers.hiddenNavBar.postMessage(status);
    }
  }
}

/**
 * 通过app分享
 * @param {Object} data 分享内容
 */
export function ShareByApp(data: any) {
  if (Client() == 'android') {
    if ('webView' in nowWindow && 'share' in nowWindow.webView) {
      let jsonTemp = JSON.stringify(data);
      nowWindow.webView.share(jsonTemp);
    }
  } else {
    if (
      nowWindow.webkit &&
      nowWindow.webkit.messageHandlers &&
      nowWindow.webkit.messageHandlers.share
    ) {
      nowWindow.webkit.messageHandlers.share.postMessage(JSON.stringify(data));
    }
  }
}

/**
 * 设置app状态栏背景颜色
 * @param {String} color 色值
 */
export function SetPhoneTopStatusBarColor(color: string) {
  if (Client() == 'android') {
    if ('webView' in nowWindow && 'setTopStatusBarColor' in nowWindow.webView) {
      nowWindow.webView.setTopStatusBarColor(color);
    }
  } else {
    if (
      nowWindow.webkit &&
      nowWindow.webkit.messageHandlers &&
      nowWindow.webkit.messageHandlers.setTopStatusBarColor
    ) {
      nowWindow.webkit.messageHandlers.setTopStatusBarColor.postMessage(color);
    }
  }
}

/**
 * 跳转到app登录页
 */
export function ToAppLogin() {
  nowWindow.location.href = `igancao://needUser`;
}

/**
 * 回到app的上一界面
 */
export function ToAppBack() {
  nowWindow.location.href = `igancao://back`;
}

/**
 * 发送支付链接到患者的微信
 */
export function AppWxLinkPay() {
  nowWindow.location.href = `igancao://send2wx/`;
}

/**
 * 医生代付
 */
export function AppDoctorHelpPay() {
  nowWindow.location.href = `igancao://doctorPay/`;
}

/**
 * 医生帮助患者填写收货地址
 */
export function AppDoctorHelpAddress() {
  nowWindow.location.href = `igancao://doctorHelpAddress`;
}

/**
 * 邀请患者
 */
export function InvitePatient() {
  nowWindow.location.href = `igancao://turn2myqrcode`;
}

/**
 * 进入医生端公告栏
 */
export function toAnnounce() {
  nowWindow.location.href = `igancao://announce`;
}

/**
 * 进入医生端系统文章库
 */
export function toSystemArticle() {
  if (Client() == 'ios') {
    nowWindow.location.href = `igancao://turnToGaofangArticleList`;
  } else {
    nowWindow.location.href = `igancao://systemArticleList`;
  }
}

/**
 * 进入医生端审核页
 */
export function toCertification() {
  nowWindow.location.href = `igancao://announce`;
}

/**
 * 前往医生端开膏方页面
 * @param {Object} data 开膏方需要的数据
 */
export function toGaofangPrescription(data: any) {
  nowWindow.location.href = `igancao://gotogaofang#${JSON.stringify(data)}`;
}

/**
 * 前往app端咨询页面
 * @param {Object} data
 */
export function toChat(data: any) {
  nowWindow.location.href = `igancao://toChat#${JSON.stringify(data)}`;
}

/**
 * 前往app端系统文章详情页
 * @param {Object} data
 */
export function toArticleDetail(data: any) {
  nowWindow.location.href = `igancao://articleDetail#${JSON.stringify(data)}`;
}

// 跳去认证
export function toAuthentication() {
  nowWindow.location.href = `igancao://certification`;
}

/**
 * 分享图片给微信好友
 * @param {string} url 分享图片链接
 */
export function AppShareImageToWX(url: string) {
  nowWindow.location.href = `igancao://sharefriend#${url}`;
}

/**
 * 分享图片到微信朋友圈
 * @param {string} url 分享图片链接
 */
export function AppShareImageToWXCircle(url: string) {
  nowWindow.location.href = `igancao://sharewxfriendcircle#${url}`;
}

/**
 * 保存图片到手机本地
 * @param {string} url 分享图片链接
 */
export function AppSaveImageToLocal(url: string) {
  nowWindow.location.href = `igancao://saveToPhotoAlbum#${url}`;
}

/**
 * 更新app端的医生信息
 */
export function AppUpdateDocotorData() {
  if (Client() == 'android') {
    if ('webView' in nowWindow && 'refreshAccountInfo' in nowWindow.webView) {
      nowWindow.webView.refreshAccountInfo('');
    }
  } else {
    if (
      nowWindow.webkit &&
      nowWindow.webkit.messageHandlers &&
      nowWindow.webkit.messageHandlers.refreshAccountInfo
    ) {
      nowWindow.webkit.messageHandlers.refreshAccountInfo.postMessage('');
    }
  }
}
