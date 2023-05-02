import http from 'node:http'
import { routes } from './routes.js'

const server = http.createServer((req, res) => {
    const { method, url } = req

    console.log(`${method} REQUEST AT ${url}`)

    const route = routes.find(route => {
        return route.method === method
    })

    if (route) {
        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)