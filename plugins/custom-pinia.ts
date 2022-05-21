import { Pinia } from "pinia";
import PiniaSharedState from './pinia-sync-browser'

export default function ({ $pinia }: { $pinia: Pinia }) {
		console.warn('pinia!!!')
		$pinia.use(PiniaSharedState())
}
