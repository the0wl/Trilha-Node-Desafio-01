import fs from 'node:fs/promises'
import { randomUUID } from 'node:crypto'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data)
            }).catch(() => {
                this.#persist()   
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, filters) {
        let data = this.#database[table] ?? []

        if (filters) {
            data = data.filter(row => {
                return Object.entries(filters).some(([key, value]) => {
                    return value ? row[key].toLowerCase().includes(value.toLowerCase()) : false
                })
            })
        }

        return data
    }

    insert(table, data) {
        const created_at = new Date()

        data = { "id" : randomUUID(), 
            ... data,
            created_at,
            "updated_at" : created_at,
            "completed_at" : null
        }

        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()
        return data
    }

    delete(table, id) {
        if (!this.#database[table])
            return { status: "Fail", message: 'The specified record does not exist.' }

        const rowIndex = this.#database[table].findIndex(row => row.id === id) 

        if (rowIndex < 0)
            return { status: "Fail", message: 'The specified record does not exist.' }

        this.#database[table].splice(rowIndex, 1)
        this.#persist()

        return { status: "Success", message: 'The record has been successfully deleted.' }
    }
}