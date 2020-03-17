import React from 'react';
import {
    Row,
    Col,
    Input,
    Label, Button
} from 'reactstrap';
import Datetime from '../utils/datetimeUtils.js';
import Finance from '../models/finance.js';

class TransactionEditForm extends React.Component {

    constructor() {
      super();
      this.state = Finance.newTransaction();

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleValueChange = this.handleValueChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handlePaidDateChange = this.handlePaidDateChange.bind(this);
      this.handleIsEntranceChange = this.handleIsEntranceChange.bind(this);
      this.handleIsNotEntranceChange = this.handleIsNotEntranceChange.bind(this);
      this.handleAccountChange = this.handleAccountChange.bind(this);
    }

    componentDidMount() {
        this.setState(Finance.loadTransaction(this.props.transaction));
    }

    handleNameChange(value) {
        this.setState({name: value});
    }

    handleValueChange(value) {
        this.setState({value: value.replace(/,/g, ".")});
    }

    handleDateChange(value) {
        this.setState({date: value});
    }

    handlePaidDateChange(value) {
        this.setState({
            paid_date: value,
            status: value.length > 0
        });
    }

    handleIsEntranceChange(value) {
        this.setState({is_entrance: true});
    }

    handleIsNotEntranceChange(value) {
        this.setState({is_entrance: false});
    }

    handleAccountChange(value) {
        this.setState({account: value});
    }

      render() {
        return (
          <Row>
            <Col className={"terra-modal"} >
                <Row>                     
                    <Col lg="5" xs='5' sm='5 ' md='5'>
                      <Row>
                        <Col lg="2" xs='2' sm='2' md='2'>
                            <Row>
                                <Col className={"terra-radio"} >
                                    <Input type="radio"
                                           name="is_entrance"
                                           checked={Finance.isInput(this.state)}
                                           onChange={(e) => this.handleIsEntranceChange(e.target.checked)}
                                    />
                                    <Label for="is_entrance">Entrada</Label>
                                </Col>
                            </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="2"  xs='2' sm='2' md='2' className={"terra-radio"} >
                            <Input type="radio"
                                   name="is_entrance"
                                   checked={!Finance.isInput(this.state)}
                                   onChange={(e) => this.handleIsNotEntranceChange(e.target.checked)}
                            />
                            <Label for="is_entrance">Saída</Label>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg="4" xs='4' sm='4' md='4' className={"terra-extract-account"}>
                        <Label for="account">Conta</Label>
                        <Input
                            type="select"
                            bsSize="sm"
                            name="account">
                            {this.props.accounts.length > 0 && this.props.accounts.map((item, i) => (
                                <option key={i} onClick={(e) => this.handleAccountChange(e.target.id)} id={this.props.accounts[i].id}>{this.props.accounts[i].title}</option>
                            ))}
                        </Input>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs='4' sm='4' md='4' className={"terra-extract-name"}>
                        <Label for="name">Nome</Label>
                            <Input 
                               value={this.state.name}
                               onChange={(e) => this.handleNameChange(e.target.value)}
                               name="name"
                        />

                    </Col>        
                    <Col xs={{ size: 6, offset: 1 }} sm={{ size: 6, offset: 1 }} md={{ size: 5, offset: 1 }} className={"terra-extract-value"}>
                        <Label for="value">Valor</Label>
                        <Input 
                               value={this.state.value}
                               onChange={(e) => this.handleValueChange(e.target.value)}
                               name="value"
                        />

                    </Col>
                </Row>
                <br/>
                <Row>        
                    <Col xs='5' sm='5' md='5' className={"terra-extract-date terra-margin-top"}>
                    <Label for="date">Data de Vencimento</Label>
                        <Input 
                               type="date"
                               value={Datetime.toDatePicker(this.state.date)}
                               onChange={(e) => this.handleDateChange(e.target.value)}
                        />

                    </Col>
                    <Col className={"terra-extract-paid-date terra-margin-top"}>
                    <Label for="paid_date">Data de Pagamento</Label>
                        <Input 
                               type="date"
                               value={Datetime.toDatePicker(this.state.paid_date)}
                               onChange={(e) => this.handlePaidDateChange(e.target.value)}
                        />

                    </Col>
                </Row>
                <br/>
            </Col>
          </Row>

        );
      }
}

export default TransactionEditForm;