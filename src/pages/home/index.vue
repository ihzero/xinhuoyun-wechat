<template>
  <view class="px-base">
    <uv-navbar title="云智" placeholder>
      <template #left>
        <view></view>
      </template>
    </uv-navbar>
    <view class="grid grid-cols-4 gap-3 mt-5">
      <view
        class="h-8 flex-center bg-[#010101] text-white text-xs"
        v-for="item in list"
        :key="item"
        >{{ item }}</view
      >
    </view>
    <view class="mt-2 text-0">
      <image class="w-full" mode="widthFix" src="/static/img-0.png"></image>
    </view>
    <view class="text-2xl mt-12 text-center"> 礼遇双节·会员福利 </view>
    <view class="mt-5 text-0">
      <image class="w-full" mode="widthFix" src="/static/img-2.png"></image>
    </view>
    <view class="text-2xl mt-12 text-center"> 精品推荐 </view>
    <view class="mt-5 text-0">
      <image class="w-full" mode="widthFix" src="/static/img-1.png"></image>
    </view>
    <view class="mt-1 grid grid-cols-4 gap-1">
      <view v-for="item in imgList" :key="item">
        <image class="w-full text-0" mode="widthFix" :src="item"></image>
      </view>
    </view>
  </view>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import img0 from '@/static/0.png'
import img1 from '@/static/1.png'
import img2 from '@/static/2.png'
import img3 from '@/static/3.png'

const list = ['爆品推荐', '高效利器', '智能优选', '科技先锋']
const imgList = [img0, img1, img2, img3]
onLoad(() => {})
</script>
