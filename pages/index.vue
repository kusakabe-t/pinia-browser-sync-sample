<script setup lang="ts">
import { useCountStore } from '../store/count'
const countStore = useCountStore()

const openSubCount1Window = () => {
  window.open('/subCount1', '', 'width=400,height=400')
}
const openSubCount2Window = () => {
  window.open('/subCount2', '', 'width=400,height=400')
}

const plus = () => {
  countStore.countPlus()
}
const reset = () => {
  countStore.$reset()
}
</script>

<template>
  <div>
    <div class="mt-[32px] flex justify-center">
      <div
        class="ml-[48px] h-fit w-fit rounded border border-black p-[8px] hover:cursor-pointer"
        @click="openSubCount1Window"
      >
        open count 1
      </div>
      <div
        class="ml-[48px] h-fit w-fit rounded border border-black p-[8px] hover:cursor-pointer"
        @click="openSubCount2Window"
      >
        open count 2
      </div>
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
