// 汇合所有的请求接口
import ajax from './ajax.js'

// 线上线下基路径
import {PATH} from '../common/OTO.js'

// 1. 基础路径
const BASE_URL = PATH  // 向主机请求
// const BASE_URL = '/api'  // 采用服务器欺骗时的基路径


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



// 请求分类
// 一级分类
export const getPrimaryClassify = () => ajax(BASE_URL + '/api/primaryclassify')
// 二级分类		await getSecondaryClassify('a')
export const getSecondaryClassify  = (param) => ajax(BASE_URL + '/api/secondaryclassify' + param)
// 搜索商品
export const searchGoods = (data) => ajax(BASE_URL + '/api/searchGoods', data, 'POST')



// 用户登陆验证
export const loginVerify = (data) => ajax(BASE_URL + '/api/login',data, 'POST')
// 用户注册验证
export const registerVerify = (name, phone, pwd) => ajax(BASE_URL + '/api/register',{name, phone, pwd}, 'POST')
// 自动登陆
export const getUserInfo = () => ajax(BASE_URL + '/api/auto_login')
// 退出登录
export const logout = () => ajax(BASE_URL + '/api/logout')
// 修改用户信息
export const changUserInfo = (data) => ajax(BASE_URL + '/api/change_user_info', data, 'POST')

// 加入购物车
export const addShopCart = (data) => ajax(BASE_URL + '/api/add_shop_cart', data, 'POST')
// 购物车商品增减
export const addShopCounter = (data) => ajax(BASE_URL + '/api/add_shop_counter', data, 'POST')
// 清空购物车
export const emptyCart = (data) => ajax(BASE_URL + '/api/empty_cart', data, 'POST')
// 收货地址
export const harvestAddress = (data) => ajax(BASE_URL + '/api/harvest_address', data, 'POST')
// 提交订单
export const settlement = (data) => ajax(BASE_URL + '/api/settlement', data, 'POST')
// 确认收货
export const confirmReceipt = (data) => ajax(BASE_URL + '/api/confirm_receipt', data, 'POST')