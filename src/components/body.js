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
                    <Alert color="success">
                        <Row>
                            <Col>
                                <strong className={"terra-textalert terra-left"}>Salário Previsto</strong>
                            </Col>
                            <Col>
                                <span className={"terra-textalert terra.right"}> R$ xxx</span>
                            </Col>
                        </Row>
                    </Alert>
                    <Alert color="danger">
                        <Row>
                            <Col>
                                <strong className={"terra-textalert terra-left"}>Despesas Previstas</strong>
                            </Col>
                            <Col>
                                <span className={"terra-textalert terra.right"}> R$ xxx</span>
                            </Col>
                        </Row>
                    </Alert>
                    <Alert color="warning">
                        <Row>
                            <Col>
                                <strong className={"terra-textalert terra-left"}>Saldo Previsto</strong>
                            </Col>
                            <Col>
                                <span className={"terra-textalert terra.right"}> R$ xxx</span>
                            </Col>
                        </Row>
                    </Alert>
                </Col>
            </div>
        );
    }
}

export default Body;