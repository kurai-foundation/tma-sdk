import { v4 } from "uuid"

/**
 * Utility class for creating a pool of events
 * Necessary for normal work with application's native buttons
 */
export default class EventsPool<E extends Record<string, Function> = Record<string, Function>> {
  /* Map that contains every callback entity **/
  private _eventsMap: Map<keyof E, { id: string, callback: Function, once: boolean }[]>

  /**
   * Utility class for creating a pool of events
   * Necessary for normal work with application's native buttons
   */
  constructor() {
    this._eventsMap = new Map()
  }

  /**
   * Get list of callbacks for specific event
   *
   * @param event event name
   *
   * @returns list of the callback entities
   */
  public get<EV extends keyof E>(event: EV): { id: string, callback: E[EV], once: boolean }[] {
    return (this._eventsMap.get(event) ?? []) as { id: string, callback: E[EV], once: boolean }[]
  }

  /**
   * Finds a specific callback entity for an event by identifier or callback function
   *
   * @param event name of the event
   * @param callback callback function or id
   *
   * @returns found callback entity or null
   */
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

  /**
   * Adds a listener for a specific event
   *
   * @param event name of the event
   * @param callback function that will be called when the event emitted
   * @param once if true, the callback will be deleted after the first event emit (default is false)
   *
   * @returns callback identifier
   */
  public on<EV extends keyof E>(event: EV, callback: E[EV], once = false) {
    const currentItem = this.find(event, callback)

    if (currentItem) return currentItem.id

    if (!this._eventsMap.has(event)) this._eventsMap.set(event, [])

    const eventId = v4()

    this._eventsMap.set(event, [...this._eventsMap.get(event) ?? [], { id: eventId, callback, once }])

    return eventId
  }

  /**
   * A wrapper for the `on` method that always creates self-destructing callback entities
   *
   * @param event name of the event
   * @param callback function that will be called when the event emitted
   *
   * @returns callback identifier
   */
  public once<EV extends keyof E>(event: EV, callback: E[EV]) {
    return this.on(event, callback, true)
  }

  /**
   * Removes a listener for a specific event by callback function or id
   *
   * @param event name of the event
   * @param callback callback function or id
   *
   * @returns true if callback entity was removed or false if not found
   */
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

  /**
   * Removes all listeners of a particular event or clears the pool completely
   *
   * @param event name of the event
   *
   * @returns always true
   */
  public clear(event?: keyof E) {
    if (event) this._eventsMap.delete(event)
    else this._eventsMap.clear()

    return true
  }
}
