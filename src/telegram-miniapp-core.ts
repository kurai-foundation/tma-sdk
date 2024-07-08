import { ICleanableComponents, TmaSdkCompat } from "./utils/tma-sdk-compat"

/**
 * Core SDK functionality
 */
export default class TelegramMiniappCore extends TmaSdkCompat {
  /**
   * Core SDK functionality
   *
   * @param onInitialize function that will be called after SDK initialization
   * @protected
   */
  protected constructor(onInitialize?: () => void) {
    super(onInitialize)

    if (this._isMiniApp) {
      // Add event listener to the back button (executes every event from pool)
      const backButtonListener = () => {
        this._backButtonEventsPool.get("click").forEach(event => {
          if (event.once) this._backButtonEventsPool.off("click", event.id)
          event.callback()
        })
      }

      // Add event listener to the main button (executes every event from pool)
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

  /**
   * A promise that completes only after all SDK components have been initialized
   * @param pollingInterval interval in milliseconds for which the initialization status is checked
   */
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

  /**
   * A function, which performs cleanup removing all created elements and listeners for specific component
   * @param component name of the component to destroy
   * @protected
   */
  protected cleanupComponent(component: ICleanableComponents): boolean {
    if (!this._componentCleanupFunctions.has(component)) return false

    this._componentCleanupFunctions.get(component)?.()

    return true
  }

  /**
   * A function that performs a cleanup, deleting all created items and listeners.
   * Call it only if you know what you are doing.
   * @protected
   */
  protected cleanupAllComponents() {
    Array.from(this._componentCleanupFunctions.values()).forEach(cleanupFunction => cleanupFunction?.())
  }
}
