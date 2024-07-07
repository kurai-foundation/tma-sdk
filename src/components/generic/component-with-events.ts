import EventsPool from "../../utils/events-pool"

export default class ComponentWithEvents<E extends Record<string, any> = Record<string, any>> {
  constructor(private _eventsPool: EventsPool<E>) {
  }

  on<EV extends keyof E>(event: EV, callback: E[EV]) {
    return this._eventsPool.on(event, callback)
  }

  once<EV extends keyof E>(event: EV, callback: E[EV]) {
    return this._eventsPool.once(event, callback)
  }

  off<EV extends keyof E>(event: EV, callback: E[EV] | string) {
    return this._eventsPool.off(event, callback)
  }

  clearEvent(event: keyof E) {
    return this._eventsPool.clear(event)
  }

  clearAllListeners() {
    return this._eventsPool.clear()
  }
}
