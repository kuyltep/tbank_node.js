export default class CacheService {
    constructor() {
        this.cacheLength = 5
        this.cache = {}
    }

    addItemInCache(item) {
        if (
            !this.cache[item.id] &&
            Object.keys(this.cache) <= this.cacheLength
        ) {
            this.cache[item.id] = item
            return true
        }
    }
    returnItemFromCache(id) {
        return this.cache[id] || null
    }

    cleanCache() {
        this.cache = {}
        return true
    }

    updateCacheLength(length) {
        if (typeof length === 'number') {
            this.cacheLength = length
            return true
        }
    }
}
