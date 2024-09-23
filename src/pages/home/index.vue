<template>
  <view class="text-red-300">主页1</view>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app';


onLoad(()=>{
  uni.login({
    provider:'weixin',
    success:(e)=>{
      console.log(e);
    }
  })
})
</script>