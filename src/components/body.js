import React from "react";
import { Row, Col } from 'reactstrap';

import Sidebar from './sidebar.js'

class Body extends React.Component {
    render() {
        return (
            <Row>
                <Col>
                    <h1>Semana X</h1>
                    <p>de dd/mm a dd/mm</p>

                    <p>Salário Previsto</p>
                    <p>Despesas Previsto</p>
                    <p>Saldo Previsto</p>
                </Col>
            </Row>
        );
    }
}

export default Body;