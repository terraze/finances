import React from 'react';
import './App.css';

import Header from './components/header.js'
import Body from './components/inicio.js'
import Footer from './components/footer.js'

import { Container, Row, Col } from 'reactstrap';
import FirebaseService from './services/FirebaseService.js';

class App extends React.Component {
    state = {
        data: []
    };


    componentDidMount() {
        FirebaseService.getDataList(
            'bills',
            (dataReceived) => this.setState({data: dataReceived})
        );
    }

    render(){
        return (
            <div>
                <Header/>
                <Container>
                    <Body data={this.state.data}/>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default App;
