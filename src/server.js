import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res);

    console.log(`${method} REQUEST AT ${url}`)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
        const { query, ...params } = routeParams.groups
        
        req.params = params
        req.query = extractQueryParams(query)

        console.log('REQUEST ACCEPTED')
        console.log('---')
        console.log('Body ', req.body)
        console.log('Route', req.params)
        console.log('Query', req.query)
        console.log('---\n')

        return route.handler(req, res)
    }

    console.log('REQUEST REJECTED\n')
    return res.writeHead(404).end()
})

server.listen(3333)