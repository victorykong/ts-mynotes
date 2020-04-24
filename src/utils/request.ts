/**
 * 统一请求方法
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import errmsg from './errmsg';
import { message } from 'antd';

const instance = axios.create({
  baseURL: '/',
  timeout: 30 * 1000,
  responseType: 'json', // 服务器响应的数据类型
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'victorykong',
  },
  // maxContentLength: 2000, // 定义允许的响应内容的最大尺寸
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  function (req) {
    // 在发送请求之前做些什么
    if (window.localStorage.getItem('authorization')) {
      // if (document.cookie.length > 0) {

      // 方式1:
      req.headers['authorization'] = window.localStorage.getItem(
        'authorization'
      );

      // 方式2:
      // req.headers['v-token'] = utils.getCookie('token');
    }

    return req;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  function (res) {
    // 对响应数据做点什么
    if (res && res.headers && res.headers['authorization']) {
      // 存储 token

      // 方式1:
      window.localStorage.setItem(
        'authorization',
        res.headers['authorization']
      );

      // 方式2:
      // document.cookie = `token=${res.headers['v-token']}`;
    }

    return res;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

/**
 * 统一请求方法
 *
 * (1) 外部使用 try catch
 * (2) 因为 return 的 Promise 的参数是立即执行的,所以需要使用 resolve / reject 将结果吐出
 *
 * @param {*} url         地址
 * @param {*} method      方式
 * @param {*} data        参数
 */
export default function request(url: string, method: string, data = {}) {
  let currentMethod = method.toLocaleLowerCase();
  let options: AxiosRequestConfig = {};

  if (currentMethod === 'get') {
    options['params'] = data;
  } else {
    options['data'] = data;
  }

  return new Promise((resolve, reject) => {
    instance
      .request(
        Object.assign(options, {
          url,
          method,
        })
      )
      .then((res: AxiosResponse) => {
        // 对点赞特殊处理
        if (
          res &&
          res.config &&
          res.config.url &&
          res.config.url.includes('/api/setlike')
        )
          message.success('您的点赞是我努力的动力!');
        else if (res && res.data && res.data.code !== 0)
          return reject(res.data.message);
        else message.success('加载成功!');
        resolve(res.data);
      })
      .catch(({ config, code, request, response, isAxiosError }) => {
        // console.log(config)
        // console.log(code)
        // console.log(request)
        // console.log(response)
        // console.log(isAxiosError)

        // 无权限的错误
        if (response && response.status && response.status === 401) {
          reject(response);
          message.error(errmsg[response.status]);
        } else if (
          ![
            '/get_wx_access_token',
            '/get_wx_ticket_and_create_signature',
          ].some((x) => config.url.includes(x))
        ) {
          message.error('服务器出了点小问题！');
        }
      });
  });
}
