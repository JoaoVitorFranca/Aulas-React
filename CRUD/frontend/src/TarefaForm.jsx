// importa o React
import React, { Component } from 'react'
// vamos importar a biblioteca para chamada de APIs em Rest
import axios from 'axios'

export default class TarefaForm extends Component {
  // construtor
  constructor() {
    // chama construtor da classe Component
    super()
    // criação e inicialização das variáveis da classe
    this.state = {
      descricao: "",
      realizada: false,
      criadaEm: Date.now(),
      quem: "",
      onde: "",
      prioridade: 0,
      lista: [] // lista de tarefas cadastradas
    }
    // chama função que busca as taregas
    this.buscaTarefas()
  }
  // chama o GET - ordenar as tarefas por ordem de criação
  buscaTarefas() {
    axios.get(`http://localhost:3003/api/tarefas?sort=-createdAt`).then(
      /* atualiza o valor da lista com os dados do GET */
      resp => this.setState({ lista: resp.data })
    )
  }

  // remove a terefa do MONGODB
  remover(tarefa) {
    axios.delete(`http://localhost:3003/api/tarefas/${tarefa._id}`)
      .then(resp => this.buscaTarefas())
  }

  marcaComoFeita(tarefa) {
    axios.put(`http://localhost:3003/api/tarefas/${tarefa._id}`, { ...tarefa, realizada: true })
      .then(resp => this.buscaTarefas()) // atualiza a lista
  }

  marcaComoDesfeita(tarefa) {
    axios.put(`http://localhost:3003/api/tarefas/${tarefa._id}`, { ...tarefa, realizada: false })
      .then(resp => this.buscaTarefas()) // atualiza a lista
  }

  criaLinhasTabela() {
    // vamos percorrer a lista de tarefas
    // vamos retornar as linhas da tabela 
    return (
      // para cada tarefa do banco
      this.state.lista.map(cadaTarefa => (
        <tr key={cadaTarefa._id}>
          <td> {cadaTarefa.descricao} </td>
          <td> {cadaTarefa.criadaEm} </td>
          <td> {cadaTarefa.quem} </td>
          <td> {cadaTarefa.onde} </td>
          <td> {cadaTarefa.prioridade} </td>
          <td>
            <button onClick={e => this.remover(cadaTarefa)} type="button" className="btn btn-danger"> Remover </button>
            <button style={cadaTarefa.realizada ? { display: "none" } : null} onClick={e => this.marcaComoFeita(cadaTarefa)} type="button" className="btn btn-success"> Feita </button>
            <button style={!cadaTarefa.realizada ? { display: "none" } : null} onClick={e => this.marcaComoDesfeita(cadaTarefa)} type="button" className="btn btn-warning"> Desfeita </button>
          </td>
        </tr>
      ))
    )
  }

  // setters
  setDescricao(e) {
    this.setState({
      descricao: e.target.value
    })
  }
  setQuem(e) {
    this.setState({
      quem: e.target.value
    })
  }
  setOnde(e) {
    this.setState({
      onde: e.target.value
    })
  }
  setPrioridade(e) {
    this.setState({
      prioridade: e.target.value
    })
  }
  // cadastrar
  cadastrar() {
    // conteúdo para inserção
    const newTask = {
      descricao: this.state.descricao,
      realizada: this.state.realizada, // usuário não informa (false)
      criadaEm: this.state.criadaEm, // usuário não informa (data atual)
      quem: this.state.quem,
      onde: this.state.onde,
      prioridade: this.state.prioridade
    }

    // vamos executar o método POST na URL da API inserindo newTask
    // then -> quando a resposta do POST vier, vai executar ...
    axios.post(`http://localhost:3003/api/tarefas`, newTask).then
      (resposta => console.log(`Funcionou ${resposta.data}`))

    // atualiza a lista de tarefas
    this.buscaTarefas()
  }

  // o que será mostrado ao usuário
  render() {
    return (
      <div className="form">
        <div className="form-group">
          <label htmlFor="descricao"> Descrição </label>
          <input className="form-control" type="text" id="descricao" onChange={e => this.setDescricao(e)} value={this.state.descricao} />
        </div>
        <div className="form-group">
          <label htmlFor="quem"> Quem </label>
          <input className="form-control" type="text" id="quem" onChange={e => this.setQuem(e)} value={this.state.quem} />
        </div>
        <div className="form-group">
          <label htmlFor="onde"> Onde </label>
          <input className="form-control" type="text" id="onde" onChange={e => this.setOnde(e)} value={this.state.onde} />
        </div>
        <div className="form-group">
          <label htmlFor="prioridade"> Prioridade </label>
          <input className="form-control" type="number" id="prioridade" onChange={e => this.setPrioridade(e)} value={this.state.prioridade} />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="button" onClick={e => this.cadastrar()}> Cadastra </button>
        </div>
        {/* Aqui iremos mostrar a lista de tarefas */}
        <div className="container">
          Lista de Tarefas
                    <table className="table">
            <thead>
              <tr>
                <th> Descrição </th>
                <th> Criada Em </th>
                <th> Quem </th>
                <th> Onde </th>
                <th> Prioridade </th>
                <th> Ações </th>
              </tr>
            </thead>
            <tbody>
              {this.criaLinhasTabela()} {/* cria as linhas com as tarefas */}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}