const porta = 3003

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const bancoDeDados = require('./bancoDeDados')

app.use(bodyParser.urlencoded({ extended: true }))

//req: request res: response next: vai para a proxima chamada
app.get('/produtos', (req, res, next) => { //função middleware
    res.send(bancoDeDados.getProdutos()) //Converte um objeto em JSON
})

//pegando por parametro
app.get('/produtos/:id', (req, res, next) => {
    res.send(bancoDeDados.getProduto(req.params.id))
})

//salvando os dados 
//obs: o post que vem de um formulario é pego dessa maneira apartir da requisição
app.post('/produtos', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto) //Saida gerada é um JSON
})
app.put('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto) //Saida gerada é um JSON
})

app.delete('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.deleteProduto(req.params.id)
    res.send(produto) //Saida gerada é um JSON
})

app.listen(porta, () => {
    console.log(`servidor está executando na porta ${porta}.`)
})