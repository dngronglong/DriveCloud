import req from '@/common/request.js'

//获取用户文件列表
export function directory() {
	return req.request({
		url: 'api/v3/directory/',
		method: 'GET'
	})
}

//获取用户空间容量
export function storage(){
	return req.request({
		url: 'api/v3/user/storage',
		method: 'GET'
	})
}

export function config(){
	return req.request({
		url: 'api/v3/site/config',
		method: 'GET'
	})
}