// 基于axios封装 get 和 post 请求
import axios from 'axios' // 爱可sei斯

export default function ajax(url = '', params = {}, type = 'get') {
	// 1. 定义promise对象
	let promise // 接收返回值
	return new Promise((resolve, reject) => {
		// 2. 判断请求的方式 并 发送请求
		if ('get' === type) { // get请求操作
			let paramsStr = ''
			// 2.1 拼接请求的url参数部分
			Object.keys(params).forEach(key => { // ES6新增方法：Object.keys(params)以数组形式返回参数中所有的键值对
				paramsStr += key + '=' + params[key] + '&'
			})
			// 2.2 过滤最后的&
			if (Object.keys(params).length !== 0) { // params不为空才进行拼接
				paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
				// 2.3 拼接请求的完整url
				url += '?' + paramsStr
			}
			// 2.4 发送 get 请求
			promise = axios.get(url)
		} else if ('post' === type) { // post请求操作
			promise = axios.post(url, params)
		}
		// 3. 处理服务器响应,返回请求的结果
		promise.then((response) => {
			resolve(response.data)
		}).catch(error => {
			console.log('失败')
			reject(error)
		})
	})
}
