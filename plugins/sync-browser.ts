import { watch } from 'vue'
import { BroadcastChannel as BroadcastChannelImpl } from 'broadcast-channel'
import type { PiniaPluginContext, Store } from 'pinia'

export const PiniaSharedState = () => {
  return ({ store, options }: PiniaPluginContext) => {
    const notSharedGlobalStates = options?.notSharedGlobalStates ?? []
		  // store.$stateをストアを取得する。ここで取得できるストアはフロント側でインポートしているストアの1つ。ストアは1つずつ読み込まれる。
    Object.keys(store.$state).forEach((key) => {
      if (notSharedGlobalStates.includes(key)) return

      share(key, store)
    })
  }
}

/**
 * @param key - A property of a store state.
 * @param store - The store the plugin will augment.
 */
export function share<T extends Store, K extends keyof T['$state']>(key: K, store: T) {
  // ストアの各ステートをchannelに登録
  const channelName = `${store.$id}-${key.toString()}`
  const channel = new BroadcastChannelImpl(channelName, { type: 'localstorage' })

  let externalUpdate = false
  let timestamp = 0

  channel.onmessage = (evt) => {
    // メイン画面のストア更新
    if (evt === undefined) return channel.postMessage({ timestamp, state: store[key] })

    externalUpdate = true
    timestamp = evt.timestamp
    store[key] = evt.state
  }

  watch(
    () => store[key],
    (state) => {
      if (!externalUpdate) {
        timestamp = Date.now()
        channel.postMessage({
          timestamp,
          state,
        })
      }
      externalUpdate = false
    },
    { deep: true }
  )

  // fetches any available state
  const sync = () => channel.postMessage(undefined)
  sync()
}

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    notSharedGlobalStates?: Array<keyof S>
  }
}

export default PiniaSharedState
