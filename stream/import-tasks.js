import { parse } from 'csv-parse'
import fs from 'node:fs'

const filePath = new URL('./tasks.csv', import.meta.url)

const stream = fs.createReadStream(filePath)

const parser = parse({
    delimiter: ',',
    fromLine: 2
})

async function main() {
    const linesParse = stream.pipe(parser)

    for await (const line of linesParse) {
        const [ title, description ] = line

        await fetch('http://localhost:3333/task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        })

        await new Promise((resolve) => setTimeout(resolve, 100))
    }
}

main()