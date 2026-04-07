import express from 'express'
import bodyParser from 'body-parser'
import CarroDB from "./conexao.js";
import cors from 'cors'

let app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false })) // Corrigido 'extends' para 'extended'
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send("API dos Carros")
})

// GET em /carros
app.get('/carros', async function(req, res) {
    try {
        let carros = await CarroDB.getCarros()
        res.json(carros)
    } catch (error) {
        res.status(500).send("Erro ao buscar carros")
    }
})

// GET em /carros/:id
app.get('/carros/:id', async function (req, res) {
    try {
        let ids = req.params.id
        let carro = await CarroDB.getCarrosById(ids)
        res.json(carro)
    } catch (error) {
        res.status(500).send("Erro ao buscar o carro")
    }
})

// POST em /carros
app.post('/carros', async function (req, res) {
    try {
        let carros = req.body
        let carroSalvo = await CarroDB.save(carros)
        res.json(carroSalvo)
    } catch (error) {
        res.status(500).send("Erro ao salvar o carro")
    }
})

// PUT em /carros
app.put('/carros', async function (req, res) {
    try {
        let carros = req.body
        let carroAtualizado = await CarroDB.update(carros)
        res.json(carroAtualizado)
    } catch (error) {
        res.status(500).send("Erro ao atualizar o carro")
    }
})

// DELETE em /carros/:id
app.delete('/carros/:id', async function (req, res) {
    try {
        let id = req.params.id
        let linhasAfetadas = await CarroDB.deletebyId(id)
        res.json({ mensagem: "Carro deletado", linhasAfetadas })
    } catch (error) {
        res.status(500).send("Erro ao deletar o carro")
    }
})

// Inicia o servidor
let server = app.listen(3000, function (){
    let host = server.address().address
    let port = server.address().port
    console.log("Servidor iniciado em http://%s:%s", host, port)
})