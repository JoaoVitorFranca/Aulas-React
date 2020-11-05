import React, {useState} from 'react';

import axios from 'axios';

export default function Exemplo4() {

    // inicializando do formulário
    const camposIniciais = {nome: "", peso: 0, altura: 1, imc: 0}
    
    // definir os setters dos campos 
    // campos representa todas as variáveis
    const [campos, setCampos] = useState(camposIniciais)

    // pode ser chamado pelos input nome, peso ou altura
    const handleChange = (e) => {
        // recupera nome e valor do componente que sofreu o evento
        // e.target.name (nome, peso, altura) 
        // e.target.value (valor digitado pelo usuário)
        const name = e.target.name
        const value = e.target.value
        // altera o campo definido por name com o valor definido por value
        // campos[nome]
        // campos[peso]
        // campos[altura]
        setCampos({...campos, [name]: value})
    }

    // vamos fazer o calcula
    const calculaImc = () =>{
        // chama a api
        let url = 'http://localhost:3003/imc';
        axios.post(url, campos)
        .then(resposta => {
            console.log(resposta.data.imc)
            // define o campo da estrutura campos que será alterado
            let campo = 'imc'
            // altera o estado das variáveis campos, mudando o campo imc para o novo valor vindo do servidor
            setCampos({...campos, [campo]: resposta.data.imc})
        });
    }

    return (
        <div className="container">
            <form>
                <div className="form-group">
                    <label> Nome </label>
                    <input type="text" className="form-control" name="nome" value={campos.nome} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label> Peso </label>
                    <input type="number" className="form-control" name="peso" value={campos.peso} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label> Altura </label>
                    <input type="number" className="form-control" name="altura" value={campos.altura} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" onClick={calculaImc}> Calcula</button>
                </div>
                <div className="form-group">
                    IMC: {campos.imc.toFixed(2)}
                </div>
            </form>
        </div>
    )

    

}