import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res);

    console.log(`${method} REQUEST AT ${url}`)
    console.log(req.body)

    const route = routes.find(route => {
        return route.method === method
    })

    if (route) {
        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)