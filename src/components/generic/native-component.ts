export default class NativeComponent {
  constructor(private readonly targetOrigin = "https://web.telegram.org") {
  }

  protected postEvent(event: string, data: Record<string, any>) {
    const w = window as any

    const webMessage = JSON.stringify({
      eventType: event,
      eventData: data
    })

    try {
      if (w.TelegramWebviewProxy?.postEvent) {
        w.TelegramWebviewProxy.postEvent(event, JSON.stringify(data))
        return true
      }

      if (this.isIframe()) {
        w.parent.postMessage(webMessage, this.targetOrigin)
        return true
      }

      if (w.external?.notify) {
        w.external.notify(webMessage)
        return true
      }
    } catch {
      return false
    }

    return false
  }

  private isIframe(): boolean {
    try {
      return window.self !== window.top
    } catch {
      return true
    }
  }
}
