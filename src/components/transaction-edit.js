import React from 'react';
import {
    Row,
    Col,
    Card,
    Button,
    RadioGroup,
    Input,
    Label,
    FormGroup,
} from 'reactstrap';
import Datetime from '../utils/datetimeUtils.js';


class TransactionEditForm extends React.Component {

    constructor() {
      super();

      this.state = {
          name: 'Nome',
          value: 1222.55,
          date: '12/11/1993',
          is_entrance: false,
          is_salary: false,
          status: false,
          paid_date: null,
          account: null,
          worked_hours: 0,
          dolar: 3.60
      };

    }

    handleNameChange(value) {
        this.setState({name: value});
    }

    handleValueChange(value) {
        this.setState({value: value.replace(/,/g, ".")});
    }

    handleWorkedHoursChange(value) {
        this.setState({worked_hours: value.replace(/,/g, ".")});
    }

    handleDolarChange(value) {
        this.setState({dolar: value.replace(/,/g, ".")});
    }

    handleDateChange(value) {
        this.setState({date: Datetime.fromDatepicker(value)});
    }

    handlePaidDateChange(value) {
        this.setState({paid_date: Datetime.fromDatepicker(value)});
    }

    handleStatusChange(value) {
        this.setState({status: value});
    }

    handleIsEntranceChange(value) {
        this.setState({is_entrance: true});
    }


    handleIsNotEntranceChange(value) {
        this.setState({is_entrance: false});
    }

      render() {
        return (
          <Row>
            <Col className={"terra-modal"} >
                <Row>                     
                    <Col lg="3">
                        <Row>
                            <Col className={"terra-radio"} >
                                <Input type="radio"
                                       name="is_entrance"
                                />
                                <Label for="is_entrance">Entrada</Label>
                            </Col>
                            <Col className={"terra-check"} >
                                <Input type="checkbox"
                                    name="is_salary"
                                />
                                <Label for="is_salary">Salário</Label>                    
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="2"  className={"terra-radio"} >
                        <Input type="radio"
                               name="is_entrance"
                        />
                        <Label for="is_entrance">Saída</Label>
                    </Col>
                    <Col lg="4">
                        <Label for="account">Conta</Label>
                        <Input 
                            type="select" 
                            bsSize="sm"
                            name="account">
                            <option>Conta-Corrente</option>
                            <option>Poupança</option>
                            <option>Investimento</option>
                        </Input>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col className={"terra-extract-name"}>
                        <Label for="name">Nome</Label>
                            <Input 
                               value={this.state.name}
                               onChange={(e) => this.handleNameChange(e.target.value)}
                               name="name"
                        />

                    </Col>        
                    <Col className={"terra-extract-value"}>
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
                    <Col className={"terra-extract-worked-hours"}>
                        <Label for="worked-hours">Horas Trabalhadas</Label>
                            <Input 
                               value={this.state.worked_hours}
                               onChange={(e) => this.handleWorkedHoursChange(e.target.value)}
                               name="worked-hours"
                        />

                    </Col>        
                    <Col className={"terra-extract-dolar"}>
                        <Label for="dolar">Dolar</Label>
                        <Input 
                               value={this.state.dolar}
                               onChange={(e) => this.handleDolarChange(e.target.value)}
                               name="dolar"
                        />

                    </Col>
                </Row>
                <br/>
                <Row>        
                    <Col className={"terra-extract-date terra-margin-top"}>
                    <Label for="date">Data de Vencimento</Label>
                        <Input 
                               type="date"
                               value={this.state.date}
                               onChange={(e) => this.handleDateChange(e.target.value)}
                        />

                    </Col>
                    <Col className={"terra-extract-paid-date terra-margin-top"}>
                    <Label for="paid_date">Data de Pagamento</Label>
                        <Input 
                               type="date"
                               value={this.state.paid_date}
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