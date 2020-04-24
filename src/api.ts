/**
 * 接口文件
 */

import request from './utils/request';

// 首页点赞数
const getLike = () => request('/api/getlike', 'GET');

// 为我点赞
const setLike = () => request('/api/setlike', 'GET');

export { getLike, setLike };
