
// importa o express pois as rotas são definidas no servidor web
const express = require('express')

// programação funcional

module.exports = function (server){ // o parâmetro representa o servidor

    // cria um objeto de roteamento de rotas
    const router = express.Router()

    server.use('/api', router) // o servidor web vai rotear a partir da rota /api

    // rota específica para a tarefa
    const tarefaService = require('../api/tarefas/tarefasService') // sistema de arquivos

    // rota específica para o cliente
    const clienteService = require('../api/clientes/clientesService')

    // registra a rota de tarefas
    tarefaService.register(router, '/tarefas') // da rota

    clienteService.register(router, '/clientes')

}
