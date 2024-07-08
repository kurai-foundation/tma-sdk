import {
  BackButton,
  BiometryManager,
  ClosingBehavior,
  CloudStorage,
  HapticFeedback,
  initBackButton,
  initBiometryManager,
  initClosingBehavior,
  initCloudStorage,
  InitData,
  initHapticFeedback,
  initInitData,
  initInvoice,
  initMainButton,
  initMiniApp,
  initPopup,
  initQRScanner,
  initSettingsButton,
  initThemeParams,
  initUtils,
  initViewport,
  Invoice,
  MainButton,
  MiniApp,
  Popup,
  QRScanner,
  SettingsButton,
  ThemeParams,
  Utils,
  Viewport
} from "@tma.js/sdk"
import EventsPool from "./events-pool"
import { BackButtonEvents, MainButtonEvents } from "./events"

export interface IMiniAppComponents {
  miniApp?: MiniApp
  themeParams?: ThemeParams
  initData?: InitData
  settingsButton?: SettingsButton
  cloudStorage?: CloudStorage
  biometryManager?: BiometryManager
  hapticFeedback?: HapticFeedback
  popup?: Popup
  qrScanner?: QRScanner
  utils?: Utils
  viewport?: Viewport
  backButton?: BackButton
  mainButton?: MainButton
  closingBehavior?: ClosingBehavior
  invoice?: Invoice
}

export type ICleanableComponents =
  "miniApp"
  | "themeParams"
  | "settingsButton"
  | "biometryManager"
  | "viewport"
  | "backButton"
  | "mainButton"
  | "closingBehavior"

/** Compatibility layer with @tma.js/sdk */
export class TmaSdkCompat {
  protected _miniAppComponents: IMiniAppComponents = {}
  protected _componentCleanupFunctions: Map<string, Function> = new Map()
  protected _isMiniApp = false
  protected _initialized = false
  protected _mainButtonEventsPool = new EventsPool<MainButtonEvents>()
  protected _backButtonEventsPool = new EventsPool<BackButtonEvents>()

  /** Compatibility layer with @tma.js/sdk */
  protected constructor(onInitialize?: () => void) {
    try {
      this.performComponentsInit(onInitialize)
      this._isMiniApp = true
    } catch {
    }
  }

  public get hapticFeedback() {
    return this._miniAppComponents.hapticFeedback
  }

  public get biometryManager() {
    return this._miniAppComponents.biometryManager
  }

  public get miniApp() {
    return this._miniAppComponents.miniApp
  }

  public get themeParams() {
    return this._miniAppComponents.themeParams
  }

  public get initData() {
    return this._miniAppComponents.initData
  }

  public get settingsButton() {
    return this._miniAppComponents.settingsButton
  }

  public get popup() {
    return this._miniAppComponents.popup
  }

  public get qrScanner() {
    return this._miniAppComponents.qrScanner
  }

  public get utils() {
    return this._miniAppComponents.utils
  }

  public get viewport() {
    return this._miniAppComponents.viewport
  }

  public get closingBehavior() {
    return this._miniAppComponents.closingBehavior
  }

  public get invoice() {
    return this._miniAppComponents.invoice
  }

  private performComponentsInit(onInitialize?: () => void) {
    const miniApp = initMiniApp()
    const initData = initInitData()
    const themeParams = initThemeParams()

    const settingsButton = initSettingsButton()
    const cloudStorage = initCloudStorage()
    const biometryManager = initBiometryManager()
    const hapticFeedback = initHapticFeedback()
    const popup = initPopup()
    const qrScanner = initQRScanner()
    const utils = initUtils()
    const viewport = initViewport()
    const backButton = initBackButton()
    const mainButton = initMainButton()
    const closingBehavior = initClosingBehavior()
    const invoice = initInvoice()

    this._miniAppComponents = {
      miniApp: miniApp[0],
      initData,
      themeParams: themeParams[0],
      settingsButton: settingsButton[0],
      cloudStorage,
      hapticFeedback,
      popup,
      qrScanner,
      utils,
      backButton: backButton[0],
      mainButton: mainButton[0],
      closingBehavior: closingBehavior[0],
      invoice
    }

    this._componentCleanupFunctions
      .set("miniApp", miniApp[1])
      .set("themeParams", themeParams[1])
      .set("settingsButton", settingsButton[1])
      .set("biometryManager", biometryManager[1])
      .set("viewport", viewport[1])
      .set("backButton", backButton[1])
      .set("mainButton", mainButton[1])
      .set("closingBehavior", closingBehavior[1])

    Promise.all([
      viewport[0],
      biometryManager[0].catch(() => undefined)
    ]).then(([viewport, biometryManager]) => {
      this._miniAppComponents = {
        ...this._miniAppComponents,
        viewport,
        biometryManager
      }
    }).finally(() => {
      this._initialized = true
      onInitialize?.()
    })
  }
}
