import axios from 'axios'
import CacheService from '../memory-cache-module/service.mjs'
export default class ApiService {
    constructor() {
        this.items = []
        this.item = {}
        this.cacheService = new CacheService()
    }
    async getItemByParam(param) {
        const { data } = await axios.get(
            `https://api.apilayer.com/bank_data/iban_validate?iban_number=${param}`,
            {
                headers: `apikey: ${process.env.API_KEY}`,
            }
        )
        this.cacheService.cache[param] = data
        this.items.push(data)
    }
}
