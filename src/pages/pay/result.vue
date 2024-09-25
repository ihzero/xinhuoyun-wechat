<template>
  <view>
    <view class="h-screen flex flex-col">
      <uv-navbar title="支付结果" placeholder bgColor="#f2f2f2">
        <template #left>
          <view></view>
        </template>
      </uv-navbar>
      <view class="text-center bg-white px-base flex-1 pt-120rpx">
        <template v-if="isSuccess">
          <view class="flex-center">
            <uv-icon
              name="checkbox-mark"
              :color="`#16ad17`"
              :size="100"
            ></uv-icon>
          </view>
          <view class="text-32rpx text-hex-979797 mt-32rpx">支付成功</view>
        </template>
        <template v-else>
          <view class="flex-center">
            <uv-icon name="close" :color="`#ff0000`" :size="100"></uv-icon>
          </view>
          <view class="text-32rpx text-hex-979797">支付失败</view>
        </template>
        <view class="mt-100rpx">
          <uv-button
            hover-class="none"
            open-type="launchApp"
            :app-parameter="type"
            binderror="launchAppError"
            customStyle="background: #16ad17; color: #fff"
            >返回APP</uv-button
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
const type = ref('')

onLoad((options) => {
  type.value = options.type
})

const isSuccess = computed(() => type.value === 'success')
</script>
