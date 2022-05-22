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
  <div>
    <div class="m-[32px] flex">
      <div
        class="ml-[48px] h-fit w-fit rounded border border-[blue] p-[8px] hover:cursor-pointer"
        @click="plus"
      >
        カウントアップ
      </div>
      <div
        class="ml-[48px] h-fit w-fit rounded border border-[red] p-[8px] hover:cursor-pointer"
        @click="reset"
      >
        リセット
      </div>
    </div>
    <div class="mt-[32px] text-center text-[32px]">
      カウント: {{ countStore.count }}
    </div>
  </div>
</template>
