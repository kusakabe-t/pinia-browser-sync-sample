import { watch } from 'vue'
import type { PiniaPluginContext, Store } from 'pinia'
import { BroadcastChannel } from 'broadcast-channel'

const PiniaSharedState = () => {
  return ({ store, options }: PiniaPluginContext) => {
    const sharedGlobalStates = options?.sharedGlobalStates ?? []
    // store.$stateでstore内のstateを取得する
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
  // ブラウザ間で共有するstateに対しBroadcastChannelを設定
  const globalStoreName = `${store.$id}-${state.toString()}`
  const globalStoreChannel = new BroadcastChannel(globalStoreName)

  let timestamp = 0

  globalStoreChannel.onmessage = (message) => {
    // 新しく開いたウィンドウに対し、現在のstateを渡す
    if (!message) {
      return globalStoreChannel.postMessage({ timestamp, state: store[state] })
    }

    // stateを更新
    timestamp = message.timestamp
    store[state] = message.state
  }

  // stateが更新されるたびに発火
  watch(
    () => store[state],
    (state) => {
      timestamp = Date.now()
      globalStoreChannel.postMessage({ timestamp, state })
    },
    { deep: true }
  )

	// ウィンドウ作成時に発火。現在のウィンドウ間で共有しているstateを取得する
	globalStoreChannel.postMessage(undefined)
}

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    sharedGlobalStates?: Array<keyof S>
  }
}

export default PiniaSharedState
