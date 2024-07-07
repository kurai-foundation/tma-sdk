import EventsPool from "../../utils/events-pool"
import ComponentWithEvents from "./component-with-events"

interface IComponent {
  show: () => void
  hide: () => void
  isVisible: boolean
}

export default class ComponentWithVisibilityState<E extends Record<string, any> = Record<string, any>> extends ComponentWithEvents<E> {
  constructor(eventsPool: EventsPool<E>, private _component: IComponent | undefined) {
    super(eventsPool)
  }

  show() {
    this._component?.show()
    return this
  }

  hide() {
    this._component?.hide()
    return this
  }

  get isVisible() {
    return this._component?.isVisible ?? false
  }
}
