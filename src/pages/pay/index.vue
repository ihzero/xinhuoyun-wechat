<template>
  <view class="h-screen flex flex-col">
    <uv-navbar title="支付" placeholder bgColor="#f2f2f2">
      <template #left>
        <view></view>
      </template>
    </uv-navbar>
    <view class="text-center bg-white px-base flex-1">
      <view class="pt-120rpx">
        <view class="text-32rpx text-hex-979797">星火云</view>
        <view class="text-hex-333 price text-80rpx font-semibold">300</view>
      </view>
      <view class="mt-100rpx">
        <uv-button
          customStyle="background: #16ad17; color: #fff"
          type="cu-primary"
          @click="onSubmit"
          >立即支付</uv-button
        >
        <uv-button
          hover-class="none"
          open-type="launchApp"
          app-parameter="fial"
          binderror="launchAppError"
          :custom-style="{
            background: 'transparent',
            borderColor: '#979797',
            border: 'none',
            color: '#979797',
          }"
          >取消</uv-button
        >
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { payMentApi } from '@/api/index'
import { useUserStore } from '../../store/modules/user';
import { ref } from 'vue'
const token = ref('')
const orderId = ref('')
const userStore = useUserStore()

onLoad((opt) => {
  token.value = opt.token
  orderId.value = opt.orderId
  userStore.setToken(token.value)
  getPayMent()
})

const getWxCode = () => {
  return new Promise((res, rej) => {
    uni.login({
      provider: 'weixin',
      success: (e) => {
        res(e.code)
      },
      fail: (e) => {
        rej(e)
      },
    })
  })
}

const getPayMent = async () => {
  try {
    const code = await getWxCode()
console.log({
      payType: 'T_MINIAPP',
      code: code,
      uuid: orderId.value,
      type: 3,
    });

    return
    const resData = await payMentApi({
      payType: 'T_MINIAPP',
      code: code,
      uuid: orderId.value,
      type: 3,
    })
    console.log(resData);
    
  } catch (error) {

  }
}

const onSubmit = () => {
  uni.redirectTo({
    url: '/pages/pay/result',
  })
}
</script>
<style lang="scss" scoped>
.price {
  &::before {
    content: '¥';
    font-size: 60%;
    margin-right: 10rpx;
  }
}
</style>
