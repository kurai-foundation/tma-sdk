import { CloudStorage } from "@tma.js/sdk"

interface ExecuteWithTimeout {
  timeout?: number;
}

export default class CloudStorageComponent {
  constructor(private component: CloudStorage | undefined) {
  }

  get<K extends string>(keys: K[], options?: ExecuteWithTimeout): Promise<Record<K, string>>

  get(key: string, options?: ExecuteWithTimeout): Promise<string>

  async get<K extends string>(key: string | K[], options?: ExecuteWithTimeout): Promise<string | Record<K, string>> {
    if (Array.isArray(key)) {
      const result = await this.component?.get(key, options)

      if (!result) return Object.fromEntries(key.map(k => [k, ""])) as Record<string, string>

      return result
    }

    return (await this.component?.get(key, options) ?? "")
  }

  async set(key: string, value: string, options?: ExecuteWithTimeout): Promise<boolean> {
    if (this.component) {
      await this.component.set(key, value, options)
      return true
    }

    return false
  }

  async delete(keyOrKeys: string | string[], options?: ExecuteWithTimeout): Promise<boolean> {
    if (this.component) {
      await this.component.delete(keyOrKeys, options)
      return true
    }

    return false
  }

  async getKeys(options?: ExecuteWithTimeout): Promise<string[]> {
    return (await this.component?.getKeys(options)) ?? []
  }
}
