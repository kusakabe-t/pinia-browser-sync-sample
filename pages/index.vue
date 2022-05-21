<script setup lang="ts">
import { useCountStore } from '../store/count'
import { useTestStore } from '../store/test'
const countStore = useCountStore()
const testStore = useTestStore()

const openSubCount1Window = () => {
  window.open(
    '/subCount1',
    '',
    'width=350,height=250,scrollbars=yes,resizable=yes,status=yes'
  )
}
const openSubCount2Window = () => {
  window.open(
    '/subCount2',
    '',
    'width=350,height=250,scrollbars=yes,resizable=yes,status=yes'
  )
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
        class="w-fit cursor-pointer border p-[8px] hover:bg-[gray]"
        @click="openSubCount1Window"
      >
        open count 1
      </div>
      <div
        class="ml-[24px] w-fit cursor-pointer border border-[red] p-[8px] hover:bg-[gray]"
        @click="openSubCount2Window"
      >
        open count 2
      </div>
    </div>
    <div class="rounded border border-black p-[16px]" @click="plus">
      カウントアップ
    </div>
    <div class="mt-[16px] rounded border border-[red] p-[16px]" @click="reset">
      リセット
    </div>
    <div>カウント: {{ countStore.count }}</div>
  </div>
</template>
