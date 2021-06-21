import LRU from 'lru-cache'
import { DistributedService } from '../distributed/service'

export class ServerCache2D<V> {
  private lru: LRU<string, V>

  constructor(private id: string, private distributed: DistributedService, options: LRU.Options<string, V>) {
    this.lru = new LRU(options)
    void this.distributed.listen(this.id, this.process)
  }

  async process(event: ServerCacheEvent<string, V>) {
    const { key, value } = event

    if (!key || !this.lru.has(key)) {
      return
    }

    if (value) {
      this.lru.set(key, value)
    } else {
      this.lru.del(key)
    }
  }

  invalidate(keyX: string, keyY: string) {
    void this.distributed.send(this.id, { key: this.getKey(keyX, keyY) })
  }

  set(keyX: string, keyY: string, value: V, maxAge?: number): boolean {
    return this.lru.set(this.getKey(keyX, keyY), value, maxAge)
  }

  get(keyX: string, keyY: string): V | undefined {
    return this.lru.get(this.getKey(keyX, keyY))
  }

  peek(keyX: string, keyY: string): V | undefined {
    return this.lru.peek(this.getKey(keyX, keyY))
  }

  has(keyX: string, keyY: string): boolean {
    return this.lru.has(this.getKey(keyX, keyY))
  }

  del(keyX: string, keyY: string): void {
    this.lru.del(this.getKey(keyX, keyY))
  }

  private getKey(keyX: string, keyY: string) {
    return `${keyX}~\`${keyY}`
  }
}

interface ServerCacheEvent<K, V> {
  key?: K
  value?: V
}
