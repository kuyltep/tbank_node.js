import express from 'express'
import CacheService from './memory-cache-module/service.mjs'
import ApiService from './api-module/service.mjs'
const cacheService = new CacheService()
const apiService = new ApiService()
export const router = express.Router()
/**
 * @swagger
 *
 * tags:
 *   name: Items
 *   description: Операции с ресурсом "items"
 */

/**
 * @swagger
 *
 * /items:
 *   get:
 *     summary: Получить список всех элементов
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: Список всех элементов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 */
router.get('/items', (req, res) => {
    res.json(apiService.items)
})

/**
 * @swagger
 *
 * /items/{id}:
 *   get:
 *     summary: Получить элемент по ID
 *     tags:
 *       - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Запрашиваемый элемент
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 */
router.get('/items/:id', (req, res) => {
    const id = req.params.id
    const itemInMemory = cacheService.returnItemFromCache(id)
    if (itemInMemory) {
        res.json(itemInMemory)
    } else {
        const item = apiService.getItemByParam(id)
        res.json(item)
    }
})

/**
 * @swagger
 * /cache:
 *   patch:
 *     summary: Обновить размер кэша
 *     tags:
 *       - cache
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Новый размер кэша
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful update cache limit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successful update cache limit"
 *       400:
 *         description: Некорректный запрос
 */

router.patch('cache?limit', (req, res) => {
    const limit = parseInt(req.query.limit)
    cacheService.updateCacheLength(limit)
    res.json({ message: 'Successful update cache limit' })
})

/**
 * @swagger
 * /cache:
 *   patch:
 *     summary: Очистить кэш
 *     tags:
 *       - cache
 *     responses:
 *       200:
 *         description: "Successful clean cache"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successful clean cache"
 *       400:
 *         description: Error request
 */

router.put('cache/clean', (req, res) => {
    cacheService.cleanCache()
    res.json({ message: 'Successful clean cache' })
})
