import { watch } from 'vue'
import type { PiniaPluginContext, Store } from 'pinia'
import { BroadcastChannel } from 'broadcast-channel'

const PiniaSharedState = () => {
  return ({ store, options }: PiniaPluginContext) => {
    const sharedGlobalStates = options?.sharedGlobalStates ?? []
    // store.$stateをストアを取得する。ここで取得できるストアはフロント側でインポートしているストアの1つ。ストアは1つずつ読み込まれる。
    Object.keys(store.$state).forEach((state) => {
      if (!sharedGlobalStates.includes(state)) return

      share(state, store)
    })
  }
}

function share<T extends Store, K extends keyof T['$state']>(
  state: K,
  store: T
) {
  // storeのステートごとにBroadcastChannelを設定
  const globalStoreName = `${store.$id}-${state.toString()}`
  const globalStoreChannel = new BroadcastChannel(globalStoreName)

  // 異なるウィンドウ間でストアを更新するために、ウィンドウ作成時にメッセージを送り、今のストアの値を共有する
  // (postMessageが実行されると、onmessageでメッセージを受け取り、ストアが親窓から渡される)
  globalStoreChannel.postMessage(undefined)

  let timestamp = 0

  globalStoreChannel.onmessage = (message) => {
    // 親窓が新しくウィンドウを開くときは、evtがundefinedになり、新しく開いたウィンドウにステートを渡す
    if (!message) {
      return globalStoreChannel.postMessage({ timestamp, state: store[state] })
    }

    // 親窓や小窓から渡されるストアの値を保存
    timestamp = message.timestamp
    store[state] = message.state
  }

  // ストアを更新すると発火される
  watch(
    () => store[state],
    (state) => {
      timestamp = Date.now()
      globalStoreChannel.postMessage({ timestamp, state })
    },
    { deep: true }
  )
}

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    sharedGlobalStates?: Array<keyof S>
  }
}

export default PiniaSharedState
