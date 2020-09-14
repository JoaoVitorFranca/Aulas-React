// importa a biblioteca do react
import React from 'react'
// componente do tipo função

// este componente será utilizado tanto na classe Tarefa como na classe About
export default props => (
    /* className é bootstrap */
    <header className>
            <h2> {props.titulo} <small> {props.subtitulo} </small></h2>
    </header>
)   