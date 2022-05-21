import { PiniaSharedState } from 'pinia-shared-state'
import { Pinia } from 'pinia'

export default function ({ $pinia }: { $pinia: Pinia }) {
  $pinia.use(
    PiniaSharedState({
      enable: true,
      initialize: false,
      type: 'localstorage',
    })
  )
}
