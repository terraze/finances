import React from "react";
import { Row, Col , Alert, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Datetime from '../utils/datetimeUtils.js';

class Resumo extends React.Component {
    constructor() {
      super();

      this.state = {
          date: Datetime.currentDate()

      }

      this.prevWeek = this.prevWeek.bind(this);
      this.nextWeek = this.nextWeek.bind(this);
    }

    prevWeek() {
      this.setState({
          date: Datetime.prevWeek(this.state.date)
      });
    }

    nextWeek() {
      this.setState({
          date: Datetime.nextWeek(this.state.date)
      });
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