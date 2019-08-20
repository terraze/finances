import React from 'react';
import './App.css';

import Header from './components/header.js'
import Resumo from './components/resumo.js'
import Extrato from './components/extrato.js'
import Configuracao from './components/configuracao.js'
import Footer from './components/footer.js'
import Saldo from './components/saldo.js'
import Relatorios from './components/teste.js'
import { Container } from 'reactstrap';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends React.Component {
    state = {
        data: []
    };

    render(){
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Container>
                    <Switch>
                        <Route path="/" exact={true} component={Resumo} />
                        <Route path="/extrato" component={Extrato} />
                        <Route path="/saldo" component={Saldo} />
                        <Route path="/teste" component={Relatorios} />
                        <Route path="/configuracao" component={Configuracao} />
                    </Switch>
                    </Container>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
