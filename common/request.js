// 引入 Request
import Request from '@/mypUI/myp-request/index.js'
import {
	baseUrl
} from '@/common/env.js'

// 设置 通用的 baseUrl 以及 header
const config = {
	baseUrl: baseUrl,
	header: {
		"content-type": "application/json"
	}
}

// 设置自己的请求拦截器，必须加上 `async`
// 请求前的拦截，比如是否登录/过期/刷新token/...
const reqInterceptor = async (options) => {
	// 必须返回一个 Object
	// 拦截请求：return {mypReqToCancel: true, ...}
	// TODO: 添加任意拦截逻辑
	//设置请求头cookie，若无cookie跳转登录
	// if (!options.header.cookie) {
	// 	uni.showToast({
	// 		title: '请先登录',
	// 		icon: 'none'
	// 	});
	// 	return uni.navigateTo({
	// 		url: '/pages/login/login',
	// 	});
	// }
	//console.log('cookie:' +uni.getStorageSync('cookie'))
	options.header.cookie = uni.getStorageSync('cookie')
	_requestLog(options, "成功通过")
	return options
}

// 设置自己的响应拦截器
// 统一对返回的数据进行整理，方便接口统一使用
// conf是您api的options信息，一般情况下您只需要用到您自定义的标记字段
const resInterceptor = (response, conf = {}) => {
	// 必须返回你需要处理的数据，将会进入resolve（then中处理）
	// 如果需要reject，需要设置mypReqToReject:true，还可以携带自己定义的任何提示内容（catch中处理）
	// uni.request进入fail也会进入该拦截器（为了统一处理逻辑），这个时候的response参数为{mypFail: true, response: fail info}。fail时不管返回啥，都进入reject(catch)
	if (response.mypFail) {
		return response.response
	}
	// 请求被拦截时也会进入该回掉（为了统一处理逻辑），这个时候的response参数为{mypCancel: true, response: cancel info}。cancel时不管返回啥，都进入reject(catch)
	if (response.mypCancel) {
		return response.response
	}
	//console.log(response.cookies[0])
	//未登录
	if (response.data.code == 401) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login',
		});
	}
	//console.log(response)
	//如果cookie不为空，就表示登录返回了cookie
	if(response.cookies.length>0){
		uni.setStorageSync("cookie", response.cookies[0])
	}
	
	_responseLog(response, conf, "response 300-499")
	return response.data
}

// 实例化请求器
// 您可以根据需要实例化多个请求器
const req = new Request(config, reqInterceptor, resInterceptor)

// request log
function _requestLog(req, describe = null) {
	if (process.env.NODE_ENV === 'development') {
		console.log("地址：" + req.url)
		if (describe) {
			console.log("描述：" + describe)
		}
		console.log("详细：" + JSON.stringify(req))
	}
	//TODO into log server
}

// response log
function _responseLog(res, conf = {}, describe = null) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		console.log("地址: " + conf.url)
		if (describe) {
			console.log("描述：" + describe)
		}
		console.log("结果: " + JSON.stringify(res))
	}
}

export default req
