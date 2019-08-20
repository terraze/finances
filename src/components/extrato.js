import React  from 'react';
import { Row, Col , Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Datetime from '../utils/datetimeUtils.js';
import CardWeek from './card.js';
import FirebaseService from '../services/FirebaseService.js';
import Finance from "../models/finance";


class Extrato extends React.Component {
    constructor() {
      super();

      this.state = {
          date: Datetime.currentDate(),
          accounts: []
      };

      this.prevMonth = this.prevMonth.bind(this);
      this.nextMonth = this.nextMonth.bind(this);
    }

    prevMonth() {
      this.setState({
          date: Datetime.prevMonth(this.state.date)
      });
    }

    nextMonth() {
      this.setState({
          date: Datetime.nextMonth(this.state.date)
      });
    }

    componentDidMount() {
        this.loadValues();
    }

    loadValues() {
        FirebaseService.getAccounts(
            (dataReceived) => {
            this.setState(
                {accounts: dataReceived}
            )
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);
    }

    render() {
      let accounts = this.state.accounts;
      let weeks = Datetime.weekList(this.state.date);
      return (
        <div className={"row terra-body"}>
          <Col lg='12' className={"terra-center"}>
            <Row>
              <Col className={'terra-right'} lg="4">
                <Button  onClick={this.prevMonth} className={"terra-button-background terra-icone-background terra-icone-black"}>
                  <FontAwesomeIcon  icon={faArrowLeft} />
                </Button>
              </Col>
              <Col className={"terra-center"} lg="4">
                <h1>{Datetime.monthName(this.state.date)} de {Datetime.year(this.state.date)}</h1>
              </Col>
              <Col className={"terra-left"}>
                <Button onClick={this.nextMonth} className={"terra-button-background terra-icone-background terra-icone-black"}>
                  <FontAwesomeIcon  icon={faArrowRight} />
                </Button>
              </Col>
                { accounts.map((item, i) => (
                  <Button className={"terra-button-background terra-icone-background"} >
                    <h6  key={i}>
                      <img src={require('..//assets/images/bank_icons/' + accounts[i].bank + '.png')} width={40} height={40} alt={''}></img>
                      <br/>
                      <br/>
                      {accounts[i].title}
                    </h6>
                    </Button>
                ))}
            </Row>
            <br/>
          </Col>
          { weeks.map((item, i) => (
          <Col key={i} lg="6">
            <CardWeek week={weeks[i]}>
            </CardWeek>
          <br/>
        </Col>
        ))}
      </div>
    );
  }
}

export default Extrato;