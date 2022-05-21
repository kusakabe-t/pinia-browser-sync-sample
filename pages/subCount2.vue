<script setup lang="ts">
import { useCountStore } from '../store/count'
const countStore = useCountStore()

const plus = () => {
  countStore.countPlus()
}
const reset = () => {
  countStore.$reset()
}
</script>

<template>
  <div class="m-[32px]">
    <div class="rounded border border-black p-[16px]" @click="plus">
      カウントアップ
    </div>
    <div class="mt-[16px] rounded border border-[red] p-[16px]" @click="reset">
      リセット
    </div>
    <div class="mt-[32px]">カウント: {{ countStore.count }}</div>
  </div>
</template>
