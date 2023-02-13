// 通用模块请求
import { Post } from './http';

/**
 * 获取微信配置信息
 * @param {String} url 配置链接
 */
export function GetWxConfigInfo(url: string) {
  return Post('/get_weixin_configs', {
    current_url: url,
  });
}