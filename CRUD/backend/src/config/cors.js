
// exportando uma função anônima
// configura o cabeçalho da resposta (res) -> indica que iremos aceitá-lo
// servidor de APIS aceita requisição de qualquer origem (IP) - *
// servidor de APIs aceita as requisições por método GET, POST, PUT, DELETE
// servidor de APIs aceita cabeçalho com content-type accept
module.exports = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
    }