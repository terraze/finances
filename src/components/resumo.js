import React from "react";
import { Row, Col , Alert, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Datetime from '../utils/datetimeUtils.js';
import Finance from '../models/finance.js';
import FirebaseService from '../services/FirebaseService.js';

class Resumo extends React.Component {
    constructor() {
      super();

      this.state = {
          date: Datetime.currentDate(),
          values: {
            input: 0,
            output: 0,
            pending: 0,
            total: 0
          },
          bills: [],
          accounts_total: 0
      }

      this.prevWeek = this.prevWeek.bind(this);
      this.nextWeek = this.nextWeek.bind(this);
      this.loadValues = this.loadValues.bind(this);
    }

    componentDidMount() {
        this.loadValues(this.state.date);
    }

    loadValues(week) {
        FirebaseService.getBills(
            null,
            (dataReceived) => {
                this.setState(
                    {bills: dataReceived}
                );
                FirebaseService.getTransactionsByWeek(
                    week,
                    false,
                    (dataReceived) => {
                        let bills = Finance.getBillsForWeek(week, null, this.state.bills, dataReceived.items);
                        for(let item of bills){
                            dataReceived.items.push(item);
                        }
                        let processedData = this.processData(dataReceived);
                        this.setState(
                            {date: week, values: processedData}
                        )
                    }
                );
            }
        );
        FirebaseService.getAccounts(            
            (dataReceived) => {
                let processedData = this.processAccountsData(dataReceived);
                this.setState(
                    {accounts_total: processedData}
                )
        });
    }

    processData(data) {
        if(data.error){
            alert("Error! Please look at console for more info")
        }
        let input = 0;
        let output = 0;
        let pending = 0;
        for (let item of data.items) {
            if(Finance.isInput(item)){
                input += Finance.getValue(item)
            } else if(Finance.isPaid(item)) {
                output += Finance.getValue(item)
            } else {
                pending += Finance.getValue(item)
            }              
        }
        return {
            input: input,
            output: output,
            pending: pending,
            total: (input-(output+pending)),
        };
    }

    processAccountsData(data) {
        let total = 0;
        for (let item of data) {
            total += item.total
        }
        return total;
    }

    prevWeek() {
      let newWeek = Datetime.prevWeek(this.state.date);
      this.loadValues(newWeek);
    }

    nextWeek() {
      let newWeek = Datetime.nextWeek(this.state.date);      
      this.loadValues(newWeek);
    }

    render() {        
        let week = Datetime.week(this.state.date);
        return (
            <div className={"row terra-body"}>
                <Col lg="11" className={"terra-center"}>
                    <Row>
                        <Col lg="5" className={"terra-right"}>
                            <Button onClick={this.prevWeek} className={"terra-button-background terra-icone-background terra-icone-black"}>
                                <FontAwesomeIcon  icon={faArrowLeft} />
                            </Button>
                        </Col>
                        <Col lg="3" className={"terra-center"}>
                            <h1>Semana {week.number}</h1>
                            <h4>de {Datetime.dm(week.start)} a {Datetime.dm(week.end)}</h4>
                        </Col>
                        <Col lg="4" className={"terra-left"}>
                            <Button onClick={this.nextWeek} className={"terra-button-background terra-icone-background terra-icone-black"}>
                                <FontAwesomeIcon  icon={faArrowRight} />
                            </Button>

                        </Col>
                    </Row>
                    <br/>
                </Col>
                <Col lg={{size:4, offset:4}}>
                    <Alert className={"terra-home terra-pago"}>
                        <Row>
                            <Col>
                                <strong>Entradas</strong>
                            </Col>
                            <Col>
                                <span>{Finance.format(this.state.values.input)}</span>
                            </Col>
                        </Row>
                    </Alert>
                    <Alert className={"terra-home terra-vencido"}>
                        <Row>
                            <Col>
                                <strong>Pago</strong>
                            </Col>
                            <Col>
                                <span>{Finance.format(this.state.values.output)}</span>
                            </Col>
                        </Row>
                    </Alert>
                    <Alert className={"terra-home terra-a-vencer"}>
                        <Row>
                            <Col>
                                <strong>A pagar</strong>
                            </Col>
                            <Col>
                                <span>{Finance.format(this.state.values.pending)}</span>
                            </Col>
                        </Row>
                    </Alert>
                    <Alert className={"terra-home terra-recebido"}>
                        <Row>
                            <Col>
                                <strong>Saldo</strong>
                            </Col>
                            <Col>
                                <span>{Finance.format(this.state.values.total)}</span>
                            </Col>
                        </Row>
                    </Alert>
                    <br/>
                    <br/>
                    <Alert className={"terra-home terra-estimado"}>
                        <Row>
                            <Col>
                                <strong>Saldo em Conta</strong>
                            </Col>
                            <Col>
                                <span>{Finance.format(this.state.accounts_total)}</span>
                            </Col>
                        </Row>
                    </Alert>
                </Col>
            </div>
        );
    }
}

export default Resumo;