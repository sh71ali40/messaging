import LRU from 'lru-cache'
import ms from 'ms'
import { Service } from '../base/service'
import { DistributedService } from '../distributed/service'
import { ServerCache } from './cache'
import { ServerCache2D } from './cache2D'

export class CachingService extends Service {
  private caches: { [cacheId: string]: any } = {}

  constructor(private distributedService: DistributedService) {
    super()
  }

  async setup() {}

  newLRU<K, V>() {
    return new LRU<K, V>({ max: 50000, maxAge: ms('5min') })
  }

  async newServerCache<K, V>(id: string, options?: LRU.Options<K, V>) {
    const cache = new ServerCache<K, V>(
      id,
      this.distributedService,
      options ?? {
        max: 50000,
        maxAge: ms('5min')
      }
    )

    this.caches[id] = cache

    return cache
  }

  async newServerCache2D<V>(id: string, options?: LRU.Options<string, V>) {
    const cache = new ServerCache2D<V>(
      id,
      this.distributedService,
      options ?? {
        max: 50000,
        maxAge: ms('5min')
      }
    )

    this.caches[id] = cache

    return cache
  }
}
