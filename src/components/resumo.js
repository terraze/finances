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
            total: 0
          }
      }

      this.prevWeek = this.prevWeek.bind(this);
      this.nextWeek = this.nextWeek.bind(this);
      this.loadValues = this.loadValues.bind(this);
    }

    componentDidMount() {
        this.loadValues(this.state.date);
    }

    loadValues(week) {
        FirebaseService.getTransactionsByWeek(
            week,
            (dataReceived) => {
                let processedData = this.processData(dataReceived)
                this.setState(
                    {date: week, values: processedData}
                )
            }
        );
    }

    processData(data) {        
        let input = 0;
        let output = 0;
        for (let item of data) {
            if(Finance.isInput(item)){
                input += Finance.getValue(item)
            } else {
                output += Finance.getValue(item)
            }              
        }
        return {
            input: input,
            output: output,
            total: (input-output),
        };
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
                <Col lg={{size:10, offset:4}}>
                    <Row>
                        <Col lg="1">
                            <Button onClick={this.prevWeek} className={"terra-button-background terra-icone-background terra-icone-black"}>
                                <FontAwesomeIcon  icon={faArrowLeft} />
                            </Button>
                        </Col>
                        <Col lg="3">
                            <h1>Semana {week.number}</h1>
                            <h4>de {Datetime.dm(week.start)} a {Datetime.dm(week.end)}</h4>
                        </Col>
                        <Col lg="2">
                            <Button onClick={this.nextWeek} className={"terra-button-background terra-icone-background terra-icone-black"}>
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
                                <strong>Despesas</strong>
                            </Col>
                            <Col>
                                <span>{Finance.format(this.state.values.output)}</span>
                            </Col>
                        </Row>
                    </Alert>
                    <Alert className={"terra-home terra-pago"}>
                        <Row>
                            <Col>
                                <strong>Saldo</strong>
                            </Col>
                            <Col>
                                <span>{Finance.format(this.state.values.total)}</span>
                            </Col>
                        </Row>
                    </Alert>
                </Col>
            </div>
        );
    }
}

export default Resumo;