import React  from 'react';
import { Row, Col , Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Datetime from '../utils/datetimeUtils.js';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CardWeek from './card.js';
import FirebaseService from '../services/FirebaseService.js';
import Finance from "../models/finance";


class Extrato extends React.Component {
    constructor() {
      super();

      this.toggleAccount = this.toggleAccount.bind(this);

      this.state = {
          date: Datetime.currentDate(),
          accounts: [],
          bills: [],
          dropdownOpen: false,
          currentAccount : 0
      };

      this.prevMonth = this.prevMonth.bind(this);
      this.nextMonth = this.nextMonth.bind(this);
      this.selectAccount = this.selectAccount.bind(this);
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
        FirebaseService.getBills(
          this.state.currentAccount,
            (dataReceived) => {
              this.setState(
                {bills: dataReceived}
              );
          }
        );
        FirebaseService.getAccounts(
            (dataReceived) => {
              this.setState(
                {accounts: dataReceived}
              );
          }
        );        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log(this.state);
    }

    toggleAccount() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    selectAccount(event) {
        this.setState({
            currentAccount: parseInt(event.target.id)
        });
        this.loadValues();
    }

    render() {
      let accounts = this.state.accounts;
      let currentAccount = this.state.currentAccount;
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
              <Col className={"terra-left"} lg="0">
                <Button onClick={this.nextMonth} className={"terra-button-background terra-icone-background terra-icone-black"}>
                  <FontAwesomeIcon  icon={faArrowRight} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className={"terra-center"} >
                  <br/>
                  {accounts.length > 0 &&
                  <ButtonDropdown className={"terra-center"} isOpen={this.state.dropdownOpen} toggle={this.toggleAccount}>
                      <DropdownToggle caret className={"terra-dropdown terra-icone-background"}>
                            <img src={require('..//assets/images/bank_icons/' + accounts[currentAccount].bank + '.png')} width={25} height={25}alt={''}></img> {accounts[currentAccount].title}
                      </DropdownToggle>
                      <DropdownMenu >
                          {accounts.map((item, i) => (
                              <DropdownItem key={i} onClick={this.selectAccount}>
                                  <div id={i}>
                                      <img src={require('../assets/images/bank_icons/' + accounts[i].bank + '.png')}width={25} height={25} alt={''}></img> {accounts[i].title}
                                  </div>
                              </DropdownItem>
                          ))}
                      </DropdownMenu>
                  </ButtonDropdown>
                  }
              </Col>           
            </Row>
            <br/>
          </Col>
          { weeks.map((item, i) => (
          <Col key={i} lg="6">
              {accounts.length > 0 &&
              <CardWeek week={weeks[i]} account={accounts[currentAccount].id} bills={this.state.bills}></CardWeek>
              }
          <br/>
        </Col>
        ))}
      </div>
    );
  }
}

export default Extrato;