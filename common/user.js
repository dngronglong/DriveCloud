import req from '@/common/request.js'

export function login(data) {
	return req.request({
		url: 'api/v3/user/session',
		method: 'POST',
		data: data
	})
}
