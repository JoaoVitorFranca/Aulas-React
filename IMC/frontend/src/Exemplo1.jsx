import React, {useState} from 'react'

export default function Exemplo1(){
    // vamos declarar uma variável que já possui o seu setter
    const [contador, setContador] = useState(0)

    return (

        <div>
            Valor do contador {contador}

            <button type="button" onClick={ () => setContador(contador+1)}> 
                Aumenta contador 
            </button>
        </div>

    )

}