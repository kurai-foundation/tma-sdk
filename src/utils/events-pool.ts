import { v4 } from "uuid"

export default class EventsPool<E extends Record<string, Function> = Record<string, Function>> {
  private _eventsMap: Map<keyof E, { id: string, callback: Function, once: boolean }[]>

  constructor() {
    this._eventsMap = new Map()
  }

  public get<EV extends keyof E>(event: EV): { id: string, callback: E[EV], once: boolean }[] {
    return (this._eventsMap.get(event) ?? []) as { id: string, callback: E[EV], once: boolean }[]
  }

  public find(event: keyof E, callback: Function | string) {
    const eventCallbacks = this._eventsMap.get(event)

    if (!eventCallbacks || eventCallbacks.length === 0) return null

    let item: { id: string, callback: Function, once: boolean } | undefined

    if (typeof callback === "string") {
      item = eventCallbacks.find(i => i.id === callback)
    } else {
      item = eventCallbacks.find(e => e.callback.toString() === callback.toString())
    }

    if (!item) return null

    return item
  }

  public on<EV extends keyof E>(event: EV, callback: E[EV], once = false) {
    const currentItem = this.find(event, callback)

    if (currentItem) return currentItem.id

    if (!this._eventsMap.has(event)) this._eventsMap.set(event, [])

    const eventId = v4()

    this._eventsMap.set(event, [...this._eventsMap.get(event) ?? [], { id: eventId, callback, once }])

    return eventId
  }

  public once<EV extends keyof E>(event: EV, callback: E[EV]) {
    this.on(event, callback, true)
  }

  public off(event: keyof E, callback: Function | string) {
    const currentEvents = this._eventsMap.get(event)
    if (!currentEvents || currentEvents.length === 0) return false

    if (typeof callback === "string") {
      this._eventsMap.set(event, currentEvents.filter(i => i.id !== callback))
      return true
    } else {
      const currentItem = this.find(event, callback)

      if (!currentItem) return false

      this._eventsMap.set(event, currentEvents.filter(i => i.id !== currentItem.id))

      return true
    }
  }

  public clear(event?: keyof E) {
    if (event) this._eventsMap.delete(event)
    else this._eventsMap.clear()

    return true
  }
}
