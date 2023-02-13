import Vue from 'vue';
import { Browser } from './utils';
import { GetWxConfigInfo } from '@/services/api';

import { Toast } from 'vant';
import 'vant/es/toast/style';

declare const wx: any;

/**
 * 跳转到微信医生授权页面
 * @param {String} url [可选]过授权页后需要跳转回的页面地址
 */
export function ToDoctorWxAuth(url: string) {
  localStorage.setItem('d_url', url || window.location.href);
  window.location.href = `${import.meta.env.VUE_APP_SERVER_URL}/wxdoctor/index`;
}

/**
 * 跳转到微信患者授权页面
 * @param {String} url [可选]过授权页后需要跳转回的页面地址
 */
export function ToUserWxAuth(url: string) {
  localStorage.setItem('_url', url || window.location.href);
  window.location.href = `${import.meta.env.VUE_APP_SERVER_URL}/wxuser/index`;
}

/**
 * 微信配置
 */
export function WxConfig(url: string) {
  return new Promise<void>((resolve, reject) => {
    if (Browser().weixin) {
      // 兼容ios端在微信浏览器内url跳转不变化导致签名验证失败问题
      let _href = encodeURIComponent(url || location.href);
      GetWxConfigInfo(_href)
        .then((res: any) => {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appid, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.noncestr, // 必填，生成签名的随机串
            signature: res.sign, // 必填，签名，见附录1
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'chooseWXPay',
              'showMenuItems',
              'checkJsApi',
              'hideAllNonBaseMenuItem',
              'showOptionMenu',
              'updateAppMessageShareData',
              'updateTimelineShareData',
              'chooseImage',
              'uploadImage',
              'getLocation',
              'startRecord',
              'onVoiceRecordEnd',
              'uploadVoice',
              'stopRecord',
              'closeWindow',
            ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(() => {
            // 隐藏所有非基础按钮
            wx.hideAllNonBaseMenuItem();
            resolve();
          });
          wx.error((err: any) => {
            // Toast(JSON.stringify(err));
            Toast(`微信验证失败，请右上角刷新重试(${JSON.stringify(err)})`);
            reject();
          });
        })
        .catch(() => {
          Toast('微信验证失败，请刷新重试');
          reject();
        });
    } else {
      resolve();
    }
  });
}

/**
 * 关闭微信窗口
 */
export function WxCloseWindow() {
  wx.ready(function () {
    wx.closeWindow();
  });
}

/**
 * 分享给微信好友
 * @param {*} shareInfo
 */
export function WxShareToFriend(shareInfo: any) {
  wx.ready(function () {
    //需在用户可能点击分享按钮前就先调用
    wx.showMenuItems({
      menuList: ['menuItem:share:appMessage'], // 要显示的菜单项，所有menu项见附录3
    });
    // 自定义“分享给朋友”的分享内容
    wx.updateAppMessageShareData({
      title: shareInfo.title, // 分享标题
      desc: shareInfo.desc, // 分享描述
      link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareInfo.imgUrl, // 分享图标
      success: function () {
        // 设置成功
      },
    });
  });
}

/**
 * 分享到微信朋友圈
 * @param {*} shareInfo
 */
export function WxShareToTimeline(shareInfo: any) {
  wx.ready(function () {
    //需在用户可能点击分享按钮前就先调用
    wx.showMenuItems({
      menuList: ['menuItem:share:timeline'], // 要显示的菜单项，所有menu项见附录3
    });
    // 自定义“分享到朋友圈”的分享内容
    wx.updateTimelineShareData({
      title: shareInfo.title, // 分享标题
      link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareInfo.imgUrl, // 分享图标
      success: function () {
        // 设置成功
      },
    });
  });
}
