import { TmaSdkCompat } from "./utils/tma-sdk-compat"

export default class TelegramMiniappCore extends TmaSdkCompat {
  protected constructor(onInitialize?: () => void) {
    super(onInitialize)

    if (this._isMiniApp) {
      const backButtonListener = () => {
        this._backButtonEventsPool.get("click").forEach(event => {
          if (event.once) this._backButtonEventsPool.off("click", event.id)
          event.callback()
        })
      }

      const mainButtonListener = () => {
        this._mainButtonEventsPool.get("click").forEach(event => {
          if (event.once) this._mainButtonEventsPool.off("click", event.id)
          event.callback()
        })
      }

      this._miniAppComponents.backButton?.on("click", backButtonListener)
      this._miniAppComponents.mainButton?.on("click", mainButtonListener)

      this._componentCleanupFunctions.set("internal.eventsPool.listeners", () => {
        this._miniAppComponents.backButton?.off("click", backButtonListener)
        this._miniAppComponents.mainButton?.off("click", mainButtonListener)
      })
    }
  }

  public async waitForInitialization(pollingInterval = 50): Promise<void> {
    if (this._initialized) return

    return new Promise<void>(resolve => {
      const interval = setInterval(() => {
        if (!this._initialized) return

        clearInterval(interval)
        resolve()
      }, pollingInterval)
    })
  }

  protected cleanupComponent(component: string): boolean {
    if (!this._componentCleanupFunctions.has(component)) return false

    this._componentCleanupFunctions.get(component)?.()

    return true
  }

  protected cleanupAllComponents() {
    Array.from(this._componentCleanupFunctions.values()).forEach(cleanupFunction => cleanupFunction?.())
  }
}
