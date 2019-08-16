import React from "react";
import { Row, Col , Alert} from 'reactstrap';
import Sidebar from './sidebar.js'

class Body extends React.Component {
    render() {
        return (
            <div className={"row terra-body"}>
                <Col lg="12">
                <h1>Semana X</h1>
                <p style={{textAlign: "center"}}>de dd/mm a dd/mm</p>
                <br/>
                </Col>
                <Col lg={{size:4, offset:4}}>
                    <Alert className={"terra-home terra-recebido"}>
                        <Row>
                            <Col>
                                <strong>Salário</strong>
                            </Col>
                            <Col>
                                <span> R$ 00,00</span>
                            </Col>
                        </Row>
                    </Alert>
                    <Alert className={"terra-home terra-vencido"}>
                        <Row>
                            <Col>
                                <strong>Despesas</strong>
                            </Col>
                            <Col>
                                <span> R$ 00,00</span>
                            </Col>
                        </Row>
                    </Alert>
                    <Alert className={"terra-home terra-pago"}>
                        <Row>
                            <Col>
                                <strong>Saldo</strong>
                            </Col>
                            <Col>
                                <span> R$ 00,00</span>
                            </Col>
                        </Row>
                    </Alert>
                </Col>
            </div>
        );
    }
}

export default Body;