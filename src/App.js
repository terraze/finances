import React from 'react';
import './App.css';

import Header from './components/header.js'
import Resumo from './components/resumo.js'
import Balanco from './components/balanco.js'
import Configuracao from './components/configuracao.js'
import Footer from './components/footer.js'

import { Container } from 'reactstrap';
import FirebaseService from './services/FirebaseService.js';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends React.Component {
    state = {
        data: []
    };


    componentDidMount() {
        /*
        FirebaseService.getDataList(
            'bills',
            (dataReceived) => this.setState({data: dataReceived})
        );
        */
    }

    render(){
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Container>
                    <Switch>
                        <Route path="/" exact={true} component={Resumo} />
                        <Route path="/balanco" component={Balanco} />
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
