import EventsPool from "../utils/events-pool"
import { MainButtonEvents } from "../utils/events"

export default function generateEventControlFunctions<E extends Record<string, any> = Record<string, any>>(
  eventsPool: EventsPool<E>,
) {
  return {
    on: <EV extends keyof MainButtonEvents>(event: EV, callback: E[EV]) => {
      return eventsPool.on(event, callback)
    },

    off: <EV extends keyof MainButtonEvents>(event: EV, callback: E[EV] | string) => {
      return eventsPool.off(event, callback)
    },

    clearEvent: (event: keyof E) => {
      return eventsPool.clear(event)
    },

    clearAllListeners: () => {
      return eventsPool.clear()
    }
  }
}
