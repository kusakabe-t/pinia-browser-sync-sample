import { defineStore } from 'pinia'

export const useCountStore = defineStore('countStore', {
  state: (): { count: number } => ({
    count: 0,
  }),
  actions: {
    countPlus() {
      this.count++
    },
  },
  sharedGlobalStates: ['count'],
})
