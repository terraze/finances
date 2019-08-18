import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { Row, Col , Card, CardBody, Button } from 'reactstrap';
import moment from 'moment'

class Saldo extends React.Component {
    render () {
        return (
            <div className={"row terra-body"}>
            <Col lg="12">
                        <h1>Contas</h1>
                        <br/>
            </Col>

            <Col lg="6">
                <Card color="link" >
                    <CardBody>
                        <Row>
                            <Col lg="9">
                                <h2>Conta-Corrente</h2>
                                <p>NuBank Zé</p>
                            </Col>
                            <Col lg="3"className={"terra-right"}>
                                <Button className={"terra-button terra-icone terra-icone-black"}>
                                    <FontAwesomeIcon  icon={faHandHoldingUsd} />
                                </Button>
                                <Button className={"terra-button terra-icone terra-icone-black"}>
                                    <FontAwesomeIcon  icon={faExchangeAlt} />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <table className={'table terra-table'}>
                                    <tbody>
                                        <tr className={"terra-saldo"}>
                                            <td>
                                            Saldo
                                            </td>
                                            <td>
                                            R$ 2.000,00
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                            <br/>
                            <br/>
                            <br/>
                        </Row>   
                    </CardBody>
                </Card>
            </Col>
            </div>
        )
    }
}


export default Saldo;