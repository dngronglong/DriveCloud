<script>
	import {
		initSystemInfo
	} from '@/mypUI/utils/system.js'
	export default {
		globalData: {
			currentTab: 0,
			userInfo: {}
		},
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); //锁定屏幕
			// #endif
			//如果cookie不存在，则跳转登录页面，设置cookie
			if(!uni.getStorageSync('cookie')){
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return uni.navigateTo({
					url: '/pages/login/login',
				});
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	@import '@/mypUI/base.scss';
</style>
