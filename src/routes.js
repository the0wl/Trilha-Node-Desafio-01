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

            if (!title) {
                res.writeHead(400).
                    end(JSON.stringify({ 
                        status: "Fail", 
                        message: 'The \'title\' param was not provided.' }
                    ))
            } else if (!description) {
                res.writeHead(400).
                    end(JSON.stringify({ 
                        status: "Fail", 
                        message: 'The \'description\' param was not provided.' }
                    ))
            } else {
                const data = { title, description }
                database.insert('tasks', data)
                res.writeHead(201).end()
            }
        } 
    },
    {
        method: 'PUT',
        path: buildRoutePath('/task/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body

            if (!title) {
                res.writeHead(400).
                    end(JSON.stringify({ 
                        status: "Fail", 
                        message: 'The \'title\' param was not provided.' }
                    ))
            } else if (!description) {
                res.writeHead(400).
                    end(JSON.stringify({ 
                        status: "Fail", 
                        message: 'The \'description\' param was not provided.' }
                    ))
            } else {
                const data = { title, description, "completed" : false }
                const response = database.update('tasks', id, data)
                res.writeHead(response.status === "Success" ? 200 : 404).
                    end(JSON.stringify(response))
            }
        } 
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/task/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params
            const data = { "title" : null, "description" : null, "completed" : true }
            const response = database.update('tasks', id, data)

            res.writeHead(response.status === "Success" ? 200 : 404).
                end(JSON.stringify(response))
        } 
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/task/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const response = database.delete('tasks', id)  

            res.writeHead(response.status === "Success" ? 200 : 404).
                end(JSON.stringify(response))
        } 
    }
]