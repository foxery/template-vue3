import axios from 'axios';
import qs from 'qs';
import { Md5 } from 'ts-md5/dist/md5';
import router from '@/router';

import { ToDoctorWxAuth } from '@/utils/auth';
import { GetUserInfo, ToAppLogin } from '@/utils/appBridge';
import { Browser } from '@/utils/utils';

import { Toast } from 'vant';
import 'vant/es/toast/style';

import { useRouteStateStore } from '@/stores/modules/routeState';
import { useIdentityStore } from '@/stores/modules/userState';


// import Logan from 'logan-web';

/**
 * post请求
 * @param {String} url 请求接口
 * @param {Object} data 请求参数
 * @param {String} prefix [可选]请求前缀
 * @param {String} errStatus [可选]需要特殊处理的异常状态值,例：'-99'
 * @param {String} redirectUrl [可选]跳转授权页后需要跳转回的页面，默认是当前页面
 * @param {Number} level [可选]解析返回值层级
 */
export function Post(
  url: string,
  data: any = {},
  prefix?: string,
  errStatus?: string,
  redirectUrl?: string,
  level?: number
) {
  console.log(import.meta.env);
  return new Promise<any>((resolve, reject) => {
    axios
      .post(
        `${prefix || import.meta.env.VUE_APP_API_URL}${url}`,
        qs.stringify(data),
        {
          headers: _headers(url, data),
        }
      )
      .then(res => {
        _success(res, resolve, reject, errStatus, redirectUrl, level);
        _saveLog(
          `请求成功：${prefix || import.meta.env.VUE_APP_API_URL
          }${url}；入参：${qs.stringify(data)}；请求头：${JSON.stringify(
            _headers(url, data)
          )};出参：${JSON.stringify(res)}`
        );
      })
      .catch(error => {
        Toast('网络不稳定，请切换网络再试试');
        reject(error);
        _saveLog(
          `请求失败：${prefix || import.meta.env.VUE_APP_API_URL
          }${url}；入参：${qs.stringify(data)}；请求头：${JSON.stringify(
            _headers(url, data)
          )};出参：${JSON.stringify(error)}`
        );
      });
  });
}

export function PostFlie(url: string, key: string, data: any, level: number) {
  return new Promise((resolve, reject) => {
    //根据data对象生成FormData对象
    var temp = new FormData();
    temp.append(key, data);
    let headers = _headersFile(url, data);
    headers['Content-Type'] = 'multipart/form-data';
    axios
      .post(`${import.meta.env.VUE_APP_API_URL}${url}`, temp, {
        headers: headers,
      })
      .then(res => {
        _success(res, resolve, reject, '', '', level);
        _saveLog(
          `请求成功：${import.meta.env.VUE_APP_API_URL}${url}；入参：${qs.stringify(
            temp
          )}；请求头：${JSON.stringify(
            _headers(url, data)
          )};出参：${JSON.stringify(res)}`
        );
      })
      .catch(error => {
        Toast('网络不稳定，请切换网络再试试');
        reject(error);
        _saveLog(
          `请求失败：${import.meta.env.VUE_APP_API_URL}${url}；入参：${qs.stringify(
            temp
          )}；请求头：${JSON.stringify(
            _headers(url, data)
          )};出参：${JSON.stringify(error)}`
        );
      });
  });
}

/**
 * get请求
 * @param {String} url 请求接口
 * @param {Object} data 请求参数
 * @param {String} prefix [可选]请求前缀
 * @param {String} errStatus [可选]需要特殊处理的异常状态值,例：'-99'
 * @param {String} redirectUrl [可选]跳转授权页后需要跳转回的页面，默认是当前页面
 * @param {Number} level [可选]解析返回值层级
 */
export function Get(
  url: string,
  data?: any,
  prefix?: string,
  errStatus?: string,
  redirectUrl?: string,
  level?: number
) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${prefix || import.meta.env.VUE_APP_API_URL}${url}`, {
        data: qs.stringify(data),
        headers: _headers(url, data),
      })
      .then(res => {
        _success(res, resolve, reject, errStatus, redirectUrl, level);
      })
      .catch(error => {
        Toast('网络不稳定，请切换网络再试试');
        reject(error);
      });
  });
}

function _headers(url: string, data: any) {
  let timeline = parseInt((new Date().getTime() / 1000).toString());
  //删除引号 斜杠 反斜杠特殊字符
  let paramsTemp = Md5.hashStr(JSON.stringify(data).replace(/"|\/|\\/g, ''));
  let urlTemp = url.replace(import.meta.env.VUE_APP_API_URL + '/', '');
  let md5Temp = `${urlTemp}#${paramsTemp}#${timeline}#123456`;
  const identityStore = useIdentityStore();
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    token: GetUserInfo().token || '',
    version: `frontend,${identityStore.identity},9.9.9`,
    'x-timeline': timeline,
    'x-g': Md5.hashStr(md5Temp),
  };
}

function _headersFile(url: string, data: any) {
  let timeline = parseInt((new Date().getTime() / 1000).toString());
  //删除引号 斜杠 反斜杠特殊字符
  let paramsTemp = Md5.hashStr(JSON.stringify(data).replace(/"|\/|\\/g, ''));
  let urlTemp = url.replace(import.meta.env.VUE_APP_API_URL + '/', '');
  let md5Temp = `${urlTemp}#${paramsTemp}#${timeline}#123456`;
  const identityStore = useIdentityStore();
  return {
    'Content-Type': 'multipart/form-data',
    token: GetUserInfo().token || '',
    version: `frontend,${identityStore.identity},9.9.9`,
    'x-timeline': timeline,
    'x-g': Md5.hashStr(md5Temp),
  };
}

function _success(
  res: any,
  resolve: any,
  reject: any,
  errStatus?: string,
  redirectUrl?: string,
  level = 1
) {
  if (res.status == 200) {
    if (res.data.status == 1) {
      if (level == 1) {
        resolve(res.data.data);
      } else if (level == 2) {
        resolve(res.data);
      } else if (level == 3) {
        resolve(res);
      }
    } else if (res.data.status == -99) {
      // sessionStorage.clear();
      // localStorage.clear();
      if (Browser().weixin) {
        // const routeStore = useRouteStateStore();
        // // @ts-ignore
        // routeStore.setLastRoute(router.history.current.fullPath);
        // ToDoctorWxAuth(redirectUrl || '');
        router.push({ name: 'LoginAuth' });
      } else {
        ToAppLogin();
      }
    } else {
      if (errStatus != res.data.status) {
        Toast(res.data.msg || '抱歉，服务器异常');
        reject(res);
      } else {
        reject(res);
      }
    }
  } else {
    reject(res);
  }
}

/**
 * Logan日志存储
 */
function _saveLog(content: unknown) {
  let logType = 'Network';
  //   Logan.log(content, logType);
}
