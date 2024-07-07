import { MainButton } from "@tma.js/sdk"
import ComponentWithVisibilityState from "./generic/component-with-visibility-state"
import { MainButtonEvents } from "../utils/events"
import EventsPool from "../utils/events-pool"

export default class MainButtonComponent extends ComponentWithVisibilityState<MainButtonEvents> {
  constructor(eventsPool: EventsPool<MainButtonEvents>, private component: MainButton | undefined) {
    super(eventsPool, component)
  }

  get backgroundColor() {
    return this.component?.bgColor ?? ""
  }

  get textColor() {
    return this.component?.textColor ?? ""
  }

  get text() {
    return this.component?.text ?? ""
  }

  get isEnabled() {
    return this.component?.isEnabled ?? false
  }

  get isLoaderVisible() {
    return this.component?.isLoaderVisible ?? false
  }

  enable() {
    this.component?.enable()
    return this
  }

  disable() {
    this.component?.disable()
    return this
  }

  showLoader() {
    this.component?.showLoader()
    return this
  }

  hideLoader() {
    this.component?.hideLoader()
    return this
  }

  setBackgroundColor(color: string) {
    this.component?.setBgColor(color as any)
    return this
  }

  setTextColor(color: string) {
    this.component?.setTextColor(color as any)
    return this
  }

  setText(text: string) {
    this.component?.setText(text)
    return this
  }
}
