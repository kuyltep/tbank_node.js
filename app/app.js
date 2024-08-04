import express from 'express'
import swaggerUiExpress from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { router } from './router.mjs'
export const app = express()
const PORT = process.env.PORT || 3000

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'REST API пример',
            version: '1.0.0',
            description:
                'Пример REST API с CRUD-операциями для ресурса "items"',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: `Локальный сервер, использующий порт ${PORT}`,
            },
        ],
    },
    apis: ['./router.mjs'],
}

const specs = swaggerJsdoc(options)

app.use(express.json())
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`)
})
