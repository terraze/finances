import React from "react";
import { Row, Col , Alert, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

class Resumo extends React.Component {
    render() {
        return (
            <div className={"row terra-body"}>
                <Col lg={{size:10, offset:4}}>
                    <Row>
                        <Col lg="1">
                            <Button className={"terra-button-background terra-icone-background terra-icone-black"}>
                                <FontAwesomeIcon  icon={faArrowLeft} />
                            </Button>
                        </Col>
                        <Col lg="3">
                            <h1>Semana X</h1>
                            <h4>de dd/mm a dd/mm</h4>
                        </Col>
                        <Col lg="2">
                            <Button className={"terra-button-background terra-icone-background terra-icone-black"}>
                                <FontAwesomeIcon  icon={faArrowRight} />
                            </Button>

                        </Col>
                    </Row>
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

export default Resumo;