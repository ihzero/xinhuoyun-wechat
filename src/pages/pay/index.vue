<template>
  <view class="h-screen flex flex-col">
    <uv-navbar title="支付" placeholder bgColor="#f2f2f2">
      <template #left>
        <view></view>
      </template>
    </uv-navbar>
    <view class="text-center bg-white px-base flex-1">
      <view class="pt-120rpx">
        <view class="text-32rpx text-hex-979797">云智</view>
        <view class="text-hex-333 price text-80rpx font-semibold">{{
          info?.quantity
        }}</view>
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
import { useUserStore } from '../../store/modules/user'
import { ref, computed } from 'vue'
const token = ref('')
const orderId = ref('')
const price = ref(0)
const userStore = useUserStore()
const isLoading = ref(false)
const detail = ref({})

onLoad((opt) => {
  token.value = opt.token
  orderId.value = opt.orderId
  price.value = opt.price
  userStore.setToken(token.value)
  getDetail()
})

const payMentOpt = computed(() => detail.value?.payInfo ?? {})
const info = computed(() => detail.value?.result ?? {})

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

const getDetail = async () => {
  uni.showLoading({})
  try {
    const code = await getWxCode()

    const resData = await payMentApi({
      payType: 'T_MINIAPP',
      code: code,
      uuid: orderId.value,
      type: 3,
    })
    detail.value = resData
  } catch (e) {
    console.log(e)
  } finally {
    uni.hideLoading()
  }
}

const onSubmit = async () => {
  if (isLoading.value) return

  isLoading.value = true
  try {
    uni.requestPayment({
      provider: 'wxpay',
      ...payMentOpt.value,
      success: (e) => {
        uni.redirectTo({
          url: `/pages/pay/result?type=success`,
        })
      },
      fail: (e) => {
        uni.redirectTo({
          url: `/pages/pay/result?type=fail`,
        })
      },
    })
  } catch (error) {
  } finally {
    isLoading.value = false
  }
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
