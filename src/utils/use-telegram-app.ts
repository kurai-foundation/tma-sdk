import TelegramMiniapp from "../telegram-miniapp"

let instance: TelegramMiniapp

export default function useTelegramApp() {
  if (!instance) {
    instance = new TelegramMiniapp()

    return instance
  }

  return instance
}
