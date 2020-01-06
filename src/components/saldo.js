import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { Row, Col , Card, CardBody, Button } from 'reactstrap';
import ApiService from '../services/ApiService.js';
import Finance from "../models/finance";

class Saldo extends React.Component {
    constructor() {
        super();

        this.state = {
            accounts: []
        }

        this.loadValues = this.loadValues.bind(this);
    }

    componentDidMount() {
        this.loadValues();
    }

    loadValues() {
        ApiService.getAccounts(
            (dataReceived) => {
            this.setState(
                {accounts: dataReceived}
            )
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);
    }

    render () {
        let accounts = this.state.accounts;
        return (
            <div className={"row terra-body"}>
            <Col lg="12">
                <h1>Contas</h1>
                <br/>
            </Col>

            { accounts.map((item, i) => (
                <Col lg="6" key={i}>
                    <Card color="link" >
                        <CardBody>
                            <Row>
                                <Col lg="12" xs='12' sm='12' md='12'>
                                    <h2>
                                        {accounts[i].title} <img src={require('..//assets/images/bank_icons/' + accounts[i].bank + '.png')} width={25} height={25} alt={''}></img>
                                    </h2>
                                </Col>
                                <Col>
                                    <p>({accounts[i].name})</p>
                                </Col>
                                <Col lg="4" xs='4' sm='4' md='4' className="terra-right ">
                                    <Button className={"terra-button terra-icone terra-icone-black terra-margin-bottom terra-margin-top-down"}>
                                        <FontAwesomeIcon  icon={faHandHoldingUsd} />
                                    </Button>
                                    <Button className={"terra-button terra-icone terra-icone-black terra-margin-bottom terra-margin-top-down"}>
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
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    R$ SALDO!
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
                    <br/>
                </Col>
            ))}
            </div>
        )
    }
}


export default Saldo;