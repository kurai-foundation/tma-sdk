import TelegramMiniappCore from "./telegram-miniapp-core"
import MainButtonComponent from "./components/main-button-component"
import BackButtonComponent from "./components/back-button-component"
import CloudStorageComponent from "./components/cloud-storage-component"
import { IMiniAppComponents } from "./utils/tma-sdk-compat"

/**
 * Telegram app instance
 */
export default class TelegramMiniapp extends TelegramMiniappCore {
  /**
   * Telegram app instance
   *
   * @param onInitialized function that will be called if miniapp successfully initialized
   */
  constructor(onInitialized?: (miniApp: TelegramMiniapp) => void) {
    super(() => {
      onInitialized?.(this)
    })
  }

  /** Returns `true` if miniapp sdk is available in current environment */
  public get isMiniApp() {
    return this._isMiniApp
  }

  /**
   * Always returns an instance of `MainButtonComponent` to interact with the application's main button.
   * Does not throw errors if the SDK is not available in the current environment
   */
  public get mainButton() {
    return new MainButtonComponent(this._mainButtonEventsPool, this._miniAppComponents.mainButton)
  }

  /**
   * Always returns an instance of `BackButtonComponent` to interact with the application's back button.
   * Does not throw errors if the SDK is not available in the current environment
   */
  public get backButton() {
    return new BackButtonComponent(this._backButtonEventsPool, this._miniAppComponents.backButton)
  }

  /**
   * Always returns an instance of `CloudStorageComponent` to interact with the application's back button.
   * Does not throw errors if the SDK is not available in the current environment
   */
  public get cloudStorage() {
    return new CloudStorageComponent(this._miniAppComponents.cloudStorage)
  }

  /**
   * Tries to get a readable username from available sources.
   * @param preferFirstName if true, the method will try to get the first name instead of the username
   *
   * @returns readable username or empty string
   */
  public getUserName(preferFirstName = false): string {
    if (!this.initData?.user) return ""

    if (preferFirstName) return this.initData.user.firstName ?? this.initData.user.username

    return this.initData.user.username ?? this.initData.user.firstName
  }

  /**
   * Tries to get user's full name
   *
   * @returns full user's name or empty string
   */
  public getFullUserName() {
    if (!this.initData?.user) return ""

    return (this.initData.user.firstName + " " + this.initData.user.lastName).trim()
  }

  /**
   * Method to seamlessly interact with components provided by @tma.js/sdk that may be undefined.
   * It can also be used with `mainButton`, `backButton`, and `cloudStorage`, but that doesn't make sense since those components are always defined
   *
   * @param component component name
   * @param callback function to be called if the component is available
   */
  public withComponent<C extends keyof IMiniAppComponents, R = any>(component: C, callback: (component: NonNullable<IMiniAppComponents[C]>) => R): R | null {
    const _component = this._miniAppComponents[component]

    if (_component) return callback(_component)

    return null
  }

  /**
   * Application init data string for backend authentication
   */
  public async initDataString() {
    return (window as any)?.Telegram?.WebApp?.initData ?? ""
  }
}
