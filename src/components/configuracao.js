import React  from 'react';
import Sidebar  from './sidebar.js'


class Configuracao extends React.Component {
    render() {
      return (        
        <div  className={"terra-body"}>          
          <Sidebar/>
        </div>
      )
    }
}

export default Configuracao;