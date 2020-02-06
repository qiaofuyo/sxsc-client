// 汇合所有的请求接口
import ajax from './ajax.js'
// 1. 基础路径
const BASE_URL = 'http://127.0.0.1:3000'
// 2. 请求方法——b站,分批请求
// 2.1 请求首页轮播图
export const getHomeSlide = () => ajax(BASE_URL + '/api/homeslide') // 赋值getHomeSlide一个方法
// 2.2 请求首页导航
export const getHomeNav = () => ajax(BASE_URL + '/api/homenav')
// 2.3 请求首页商品列表
export const getHomeShopList = () => ajax(BASE_URL + '/api/homeshoplist')

// // 2 请求方法——一次性请求
// // 首页
// export const getHomeData = () => ajax(BASE_URL + '/api/home')