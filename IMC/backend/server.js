// importa a dependência do express
let express = require('express');
// cria o servidor express
server = express();

// importa dependência cors
let cors = require('cors');
// configura o servidor para usar cors - torna as rotas públicas
server.use(cors());

// importa dependência body-parser
let bodyParser = require('body-parser');
// configura o servidor para usar o body-parser
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
server.use(bodyParser.json());


// importar dependência mongoose
let mongoose = require('mongoose');
// vamos conectar no BD
mongoose.connect('mongodb://localhost/imc', {useNewUrlParser: true, useUnifiedTopology: true})

// criar o esquema do banco de dados
let Schema = mongoose.Schema
let imcSchema = new Schema({
    nome: {type: string, required: true},
    peso: {type:number, required: true},
    imc: {type: number, requrired: true}
});

// cria o modelo de dados
let IMC = mongoose.model('ImcData', imcSchema)

server.post('/imc', (req, resp) => {
    let nome = req.body.nome
    let peso = req.body.peso
    let altura = req.body.altura 
    let imc = peso/ (altura * altura)

    let resposta = {
        nome: nome,
        peso: peso,
        altura: altura,
        imc: imc
    }

    // vamos inserir o IMC calculado no banco de dados
    var novo = IMC(resposta) // cria um objeto do tipo IMC
    novo.save() // salva no banco de dados
    
    // envia o resultado para o usuario
    resp.json(resposta)
});


server.get('/imc', (req, resp) => {
    IMC.find().then(todosimcs => {
        resp.json(todosimcs)
    })
});

server.listen(3003, () =>{
    console.log(`Servidor ouvindo na porta 3003`)
})