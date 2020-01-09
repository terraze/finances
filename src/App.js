import React from 'react';

import './App.css';

import Navbar from './components/navbar.js'
import Login from './components/login.js'
import Resumo from './components/resumo.js'
import Extrato from './components/extrato.js'
import Cadastro from './components/cadastro.js'
import Footer from './components/footer.js'
import Saldo from './components/saldo.js'
import Relatorios from './components/relatorios.js'
import { 
    Container,
    Row,
    Col
 } from 'reactstrap';
import ApiService from './services/ApiService.js';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Moment from 'moment'

Moment.locale('pt-br');

class App extends React.Component {
    state = {
        data: [],
        loggedin: ApiService.isAuth()
    };

    constructor(props){
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(){
        this.setState({
            loggedin: true
        })
    }

    render(){
        return (
            <>
            {!this.state.loggedin && 
                <Login onLogin={this.onLogin}/>
            }
            {this.state.loggedin && 
                <BrowserRouter>
                    <div>
                        <Container>
                            <Navbar/>
                            <Switch>
                                <Route path="/" exact={true} component={Resumo} />
                                <Route path="/resumo" component={Resumo} />
                                <Route path="/extrato" component={Extrato}/>
                                <Route path="/saldo" component={Saldo} />
                                <Route path="/relatorios" component={Relatorios} />
                                <Route path="/cadastro" component={Cadastro} />
                            </Switch>
                            <Footer/>
                        </Container>
                    </div>
                </BrowserRouter>
            }
            </>
        );
    }
}

export default App;
