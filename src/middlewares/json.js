export async function json(req, res) {
    const buffer = []

    res.setHeader('Content-type', 'application/json')

    for await (const chunk of req) {
        buffer.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffer).toString())
    } catch {
        req.body = null
    }
}