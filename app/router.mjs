import express from 'express'

export const router = express.Router()
/**
 * @swagger
 * /:
 *   get:
 *     summary: Проверка работоспособности API
 *     tags:
 *       - Info
 *     responses:
 *       200:
 *         description: Возвращает сообщение о работоспособности API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Добро пожаловать в наше REST API!"
 */
router.get('/', (req, res) => {
    res.json({ message: 'Добро пожаловать в наше REST API!' })
})

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
    res.json({ items: [] })
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
    res.json({ item: { id: req.params.id } })
})

/**
 * @swagger
 *
 * /items:
 *   post:
 *     summary: Создать новый элемент
 *     tags:
 *       - Items
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *           example: {
 *             "id": 1
 *           }
 *     responses:
 *       201:
 *         description: Созданная запись
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
router.post('/items', (req, res) => {
    res.status(201).json({ item: req.body })
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
    res.json({ item: { id: req.params.id, ...req.body } })
    const limit = parseInt(req.query.limit)
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
    res.json({ message: 'Successful clean cache' })
})

/**
 * @swagger
 *
 * /items/{id}:
 *   delete:
 *     summary: Удалить элемент по ID
 *     tags:
 *       - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Успешное удаление записи
 */
router.delete('/items/:id', (req, res) => {
    res.status(204).end()
})
