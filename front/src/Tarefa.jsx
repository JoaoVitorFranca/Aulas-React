
import React from 'react'
import {Component} from 'react'
// vamos importar o PageHeader
import PageHeader from './template/PageHeader'
// vamos importar o TarefaForm
import TarefaForm from './TarefaForm'

export default class Tarefa extends Component {

    render(){
        return (
            <div>
                <PageHeader titulo="Tarefas" subtitulo="Cadastro"/>
                <TarefaForm/>
          </div>
        )
    }
     
}