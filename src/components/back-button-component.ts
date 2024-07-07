import { BackButton } from "@tma.js/sdk"
import ComponentWithVisibilityState from "./generic/component-with-visibility-state"
import { BackButtonEvents } from "../utils/events"
import EventsPool from "../utils/events-pool"

export default class BackButtonComponent extends ComponentWithVisibilityState<BackButtonEvents> {
  constructor(eventsPool: EventsPool<BackButtonEvents>, component: BackButton | undefined) {
    super(eventsPool, component)
  }
}
