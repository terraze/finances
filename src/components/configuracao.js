import React  from 'react';
import Sidebar  from './sidebar.js'


class Configuracao extends React.Component {
    render() {
      return (        
        <div>          
          <br/>
          <br/>
          <br/>
          <ul>
            <li>Inicio da semana</li>
            <li>Entradas fixas semanais</li>
            <li>Entradas fixas mensais</li>
            <li>Saídas fixas semanais</li>
            <li>Saídas fixas mensais</li>
          </ul>
          <Sidebar/>
        </div>
      )
    }
}

export default Configuracao;