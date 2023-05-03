import { buildRoutePath } from './utils/build-route-path.js'
import { Database } from './database.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.query
            const applyFilters = title || description

            const tasks = database.select('tasks', applyFilters ? {
                "title": title ?? null,
                "description": description ?? null
            } : null)

            res.writeHead(200).end(JSON.stringify(tasks))
        } 
    },
    {
        method: 'POST',
        path: buildRoutePath('/task'),
        handler: (req, res) => {
            const { title, description } = req.body
            database.insert('tasks', { title, description })
            res.writeHead(201).end()
        } 
    },
    {
        method: 'PUT',
        path: buildRoutePath('/task/:id'),
        handler: (req, res) => {
            res.writeHead(204).end()
        } 
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/task/:id/complete'),
        handler: (req, res) => {
            res.writeHead(204).end()
        } 
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/task/:id'),
        handler: (req, res) => {
            res.writeHead(204).end()
        } 
    }
]