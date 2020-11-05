
// importa biblioteca mongoose
const mongoose = require ('mongoose')
// configuração mongodb para requisição/resposta Promise
mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb://localhost/tarefas')