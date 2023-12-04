import { Actor } from 'rabbi'
const express = require("express")

const app = express()

app.get('/', (req, res) => {
	res.send(`<!DOCTYPE html><html><body><h1>Hello SSE!</h1></body></html>`);
});

app.get('/bsv/mempool', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		Connection: 'keep-alive',
		'Cache-Control': 'no-cache',
	});
    res.write('event: connected')
    Actor.create({
        exchange: 'sapience',
        routingkey: 'bsv.spv.mempool',
        queue:"bsv.spv.mempool.processed"
    })
    .start(async (channel, msg, json) => {
        const { transaction, size } = json
        res.write(`data: ${JSON.stringify({ transaction, size })}`)
    })
    req.on('close', () => res.end('OK'))
});

app.get('/btc/mempool', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		Connection: 'keep-alive',
		'Cache-Control': 'no-cache',
	});
    res.write('event: connected')
    Actor.create({
        exchange: 'sapience',
        routingkey: 'btc.spv.mempool',
        queue:"btc.spv.mempool.processed"
    })
    .start(async (channel, msg, json) => {
        const { transaction, size } = json
        res.write(`data: ${JSON.stringify({ transaction, size })}`)
    })
    req.on('close', () => res.end('OK'))
});

app.get('/bsv/block', (req,res) => {
    res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		Connection: 'keep-alive',
		'Cache-Control': 'no-cache',
	});
    res.write('event: connected')
    Actor.create({
        exchange: 'sapience',
        routingkey: 'bsv.spv.block',
        queue: 'bsv.spv.block.processed'
    })
    .start(async (channel, msg, json) => {
        const {
            header,
            started,
            finished,
            size,
            height,
            txCount,
            transactions,
            startDate,
        } = json
        res.write(`data: ${JSON.stringify({
            header,
            started,
            finished,
            size,
            height,
            txCount,
            transactions,
            startDate,
        })}`)
    })
    req.on('close', () => res.end('OK'))
})

app.get('/btc/block', (req,res) => {
    res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		Connection: 'keep-alive',
		'Cache-Control': 'no-cache',
	});
    res.write('event: connected')
    Actor.create({
        exchange: 'sapience',
        routingkey: 'btc.spv.block',
        queue: 'btc.spv.block.processed'
    })
    .start(async (channel, msg, json) => {
        const {
            header,
            started,
            finished,
            size,
            height,
            txCount,
            transactions,
            startDate,
        } = json
        res.write(`data: ${JSON.stringify({
            header,
            started,
            finished,
            size,
            height,
            txCount,
            transactions,
            startDate,
        })}`)
    })
    req.on('close', () => res.end('OK'))
})

app.get('/bsv/reorg', (req,res) => {
    res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		Connection: 'keep-alive',
		'Cache-Control': 'no-cache',
	});
    res.write('event: connected')
    Actor.create({
        exchange: 'sapience',
        routingkey: 'bsv.spv.reorg',
        queue:"bsv.spv.reorg.processed"
    })
    .start(async (channel, msg, json) => {
        const { height, hash } = json
        res.write(`data: ${JSON.stringify({ height, hash })}`)
    })
    req.on('close', () => res.end('OK'))
})

app.get('/btc/reorg', (req,res) => {
    res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		Connection: 'keep-alive',
		'Cache-Control': 'no-cache',
	});
    res.write('event: connected')
    Actor.create({
        exchange: 'sapience',
        routingkey: 'btc.spv.reorg',
        queue:"btc.spv.reorg.processed"
    })
    .start(async (channel, msg, json) => {
        const { height, hash } = json
        res.write(`data: ${JSON.stringify({ height, hash })}`)
    })
    req.on('close', () => res.end('OK'))
})

app.listen(5200, () => console.log('App listening: http://localhost:5200'));