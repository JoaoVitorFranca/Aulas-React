// importa o React
import React, {Component} from 'react'
// vamos importar a biblioteca para chamada de APIs em Rest
import axios from 'axios'

export default class TarefaForm extends Component {
    // construtor
    constructor(){
        // chama construtor da classe Component
        super()
        // criação e inicialização das variáveis da classe
        this.state = {
            descricao: "",
            quem: "",
            onde: "",
            prioridade: 0
        }
    }
    // setters
    setDescricao(e){
        this.setState({
            descricao: e.target.value
        })
    }
    setQuem(e){
        this.setState({
            quem: e.target.value
        })
    }
    setOnde(e){
        this.setState({
            onde: e.target.value
        })
    }
    setPrioridade(e){
        this.setState({
            prioridade: e.target.value
        })
    }
    // cadastrar
    cadastrar(){
        // conteúdo para inserção
        const newTask = {
            descricao: this.state.descricao,
            quem: this.state.quem,
            onde: this.state.onde,
            prioridade: this.state.prioridade
        }

        // vamos executar o método POST na URL da API inserindo newTask
        // then -> quando a resposta do POST vier, vai executar ...
        axios.post(`http://localhost:3003/api/tarefas`, newTask ).then
            (resposta => console.log(`Funcionou ${resposta.data}`))
    
    }

    // o que será mostrado ao usuário
    render(){
        return (
            <form className="form">  
                <div className="form-group">
                    <label for="descricao"> Descrição </label>
                    <input type="text" id="descricao" onChange={e => this.setDescricao(e)} value={this.state.descricao}/>
                </div>
                <div className="form-group">
                    <label for="quem"> Quem </label>
                    <input type="text" id="quem" onChange={e => this.setQuem(e)} value={this.state.quem}/>
                </div>
                <div className="form-group">
                    <label for="onde"> Onde </label>
                    <input type="text" id="onde" onChange={e => this.setOnde(e)} value={this.state.onde}/>
                </div>
                <div className="form-group">
                    <label for="prioridade"> Prioridade </label>
                    <input type="number" id="prioridade" onChange={e => this.setPrioridade(e)} value={this.state.prioridade}/>
                </div>
                <div className="form-group">
                    <button type="button" onClick={ e => this.cadastrar()}> Cadastra </button> 
                </div>
            </form>
        )
    }
}