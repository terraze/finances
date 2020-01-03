import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import Datetime from '../utils/datetimeUtils.js';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import Card from './card.js';
import ApiService from '../services/ApiService.js';


class Extrato extends React.Component {
    constructor() {
        super();

        this.toggleAccount = this.toggleAccount.bind(this);

        this.state = {
            date: Datetime.currentDate(),
            accounts: [],
            transactions: [],
            dropdownOpen: false,
            currentAccount: -1
        };

        this.prevMonth = this.prevMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.selectAccount = this.selectAccount.bind(this);
        this.loadValues = this.loadValues.bind(this);
    }

    async prevMonth() {
        await this.setState({
            date: Datetime.prevMonth(this.state.date)
        });
        this.loadValues(this.state.currentAccount);
    }

    async nextMonth() {
        await this.setState({
            date: Datetime.nextMonth(this.state.date)
        });
        this.loadValues(this.state.currentAccount);
    }

    componentDidMount() {
        ApiService.getAccounts(
            (dataReceived) => {
                this.setState(
                    {accounts: dataReceived}
                );
                this.loadValues(0);
            }
        );
    }

    loadValues(currentAccount) {
        ApiService.getTransactionsByMonth(
            this.state.accounts[currentAccount].id,
            Datetime.monthStart(this.state.date),
            Datetime.monthEnd(this.state.date),
            (dataReceived) => {
                this.setState(
                    {
                        transactions: dataReceived,
                        currentAccount: currentAccount
                    }
                );
            }
        );
    }

    toggleAccount() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    selectAccount(event) {
        let currentAccount = parseInt(event.target.id)
        if (!isNaN(currentAccount)) {
            this.setState({
                currentAccount: currentAccount
            });
            this.loadValues(currentAccount);
        }
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
                            <Button onClick={this.prevMonth}
                                    className={"terra-button-background terra-icone-background terra-icone-black"}>
                                <FontAwesomeIcon icon={faArrowLeft}/>
                            </Button>
                        </Col>
                        <Col className={"terra-center"} lg="4">
                            <h1>{Datetime.monthName(this.state.date)} de {Datetime.year(this.state.date)}</h1>
                        </Col>
                        <Col className={"terra-left"} lg="0">
                            <Button onClick={this.nextMonth}
                                    className={"terra-button-background terra-icone-background terra-icone-black"}>
                                <FontAwesomeIcon icon={faArrowRight}/>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"terra-center"}>
                            <br/>
                            {accounts.length > 0 && currentAccount >= 0 &&
                            <ButtonDropdown className={"terra-center"} isOpen={this.state.dropdownOpen}
                                            toggle={this.toggleAccount}>
                                <DropdownToggle caret className={"terra-dropdown terra-icone-background"}>
                                    <img
                                        src={require('..//assets/images/bank_icons/' + accounts[currentAccount].bank + '.png')}
                                        width={25} height={25} alt={''}/> {accounts[currentAccount].title}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {accounts.map((item, i) => (
                                        <DropdownItem key={i} onClick={this.selectAccount}>
                                            <div id={i}>
                                                <img
                                                    src={require('../assets/images/bank_icons/' + accounts[i].bank + '.png')}
                                                    width={25} height={25} alt={''}/> {accounts[i].title}
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
                {weeks.map((item, i) => (
                    <Col key={i} lg="6">
                        {accounts.length > 0 && currentAccount >= 0 &&
                        <Card week={weeks[i]}
                                  account={accounts[currentAccount].id}
                                  accounts={this.state.accounts}
                                  transactions={this.state.transactions}
                                  reload={() => this.loadValues(this.state.currentAccount)}
                                  date={this.state.date}
                        />
                        }
                        <br/>
                    </Col>
                ))}
            </div>
        );
    }
}

export default Extrato;