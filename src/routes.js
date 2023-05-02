import { buildRoutePath } from './utils/build-route-path.js'

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { url } = req

            console.log(`GET REQUEST AT ${url} = OK`)
            res.writeHead(200).end()
        } 
    },
    {
        method: 'POST',
        path: buildRoutePath('/task'),
        handler: (req, res) => {
            const { url } = req

            console.log(`POST REQUEST AT ${url} = OK`)
            res.writeHead(201).end()
        } 
    },
    {
        method: 'PUT',
        path: buildRoutePath('/task/:id'),
        handler: (req, res) => {
            const { url } = req

            console.log(`PUT REQUEST AT ${url} = OK`)
            res.writeHead(204).end()
        } 
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/task/:id/complete'),
        handler: (req, res) => {
            const { url } = req

            console.log(`PATCH REQUEST AT ${url} = OK`)
            res.writeHead(204).end()
        } 
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/task/:id'),
        handler: (req, res) => {
            const { url } = req

            console.log(`DELETE REQUEST AT ${url} = OK`)
            res.writeHead(204).end()
        } 
    }
]