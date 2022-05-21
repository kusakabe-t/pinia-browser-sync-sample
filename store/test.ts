import { defineStore } from 'pinia'

export const useTestStore = defineStore('testStore', {
  state: (): { test: string; notShared: string } => ({
    test: 'test!!!',
    notShared: 'hoge!!!',
  }),
  actions: {
    helloWorld() {
      this.test = 'hello world!!!'
    },
  },
  // notSharedGlobalStates: ['notShared']
})
