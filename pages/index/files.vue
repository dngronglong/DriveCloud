<template>
	<view>
		<myp-list ref="myp-list" :autoUpdate="true" @down="toLoadData" @up="toLoadData">
			<myp-list-cell v-for="(item,idx) in fileList" :key="idx">
			  <myp-cell icon="book" :title="item.name" boxStyle="padding-left:32rpx;"></myp-cell>
			</myp-list-cell>
		</myp-list>
	</view>
</template>

<script>
	import {directory} from '@/common/api.js'
	
	export default {
		data() {
			return {
				fileList: []
			}
		},
		onLoad() {
			console.log(11111)
			directory().then(res =>{
				this.fileList=res.data.objects
			}).catch(err=>{
				
			})
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
