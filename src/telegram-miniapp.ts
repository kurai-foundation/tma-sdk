import TelegramMiniappCore from "./telegram-miniapp-core"
import MainButtonComponent from "./components/main-button-component"
import BackButtonComponent from "./components/back-button-component"
import CloudStorageComponent from "./components/cloud-storage-component"
import { IMiniAppComponents } from "./utils/tma-sdk-compat"

export default class TelegramMiniapp extends TelegramMiniappCore {
  constructor(onInitialized?: (miniApp: TelegramMiniapp) => void) {
    super(() => {
      onInitialized?.(this)
    })
  }

  public get isMiniApp() {
    return this._isMiniApp
  }

  public get mainButton() {
    return new MainButtonComponent(this._mainButtonEventsPool, this._miniAppComponents.mainButton)
  }

  public get backButton() {
    return new BackButtonComponent(this._backButtonEventsPool, this._miniAppComponents.backButton)
  }

  public get cloudStorage() {
    return new CloudStorageComponent(this._miniAppComponents.cloudStorage)
  }

  public getUserName(preferFirstName = false): string {
    if (!this.initData?.user) return ""

    if (preferFirstName) return this.initData.user.firstName ?? this.initData.user.username

    return this.initData.user.username ?? this.initData.user.firstName
  }

  public getFullUserName() {
    if (!this.initData?.user) return ""

    return (this.initData.user.firstName + " " + this.initData.user.lastName).trim()
  }

  public withComponent<C extends keyof IMiniAppComponents, R = any>(component: C, callback: (component: NonNullable<IMiniAppComponents[C]>) => R): R | null {
    const _component = this._miniAppComponents[component]

    if (_component) return callback(_component)

    return null
  }

  public async initDataString() {
    return (window as any)?.Telegram?.WebApp?.initData ?? ""
  }
}
