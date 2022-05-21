<script setup lang="ts">
import { useCountStore } from '../store/count'
const countStore = useCountStore()

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
    <div>カウント: {{ countStore.count }}</div>
  </div>
</template>
