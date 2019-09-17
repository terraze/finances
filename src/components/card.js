import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Spinner,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ButtonDropdown
} from 'reactstrap';
import { Form, Input } from 'reactstrap';
import TerraAlert  from './terra-alert.js'
import Datetime from '../utils/datetimeUtils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Finance from '../models/finance.js';
import FirebaseService from '../services/FirebaseService.js';

class CardWeek extends React.Component {
    constructor() {
      super();

      this.state = {
          mode: "view",
          total: 0,
          values: [],
          loading: true
      };

      this.loadValues = this.loadValues.bind(this);
      this.toggleMode = this.toggleMode.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.addTransaction = this.addTransaction.bind(this);
    }

    componentDidMount() {
        this.loadValues(this.props.week.start, this.props.account);
    }

    componentDidUpdate(prevProps, prevStates) {
    	if((prevProps.week.number !== this.props.week.number) || (prevProps.account !== this.props.account)){
    		this.loadValues(this.props.week.start, this.props.account);
    	}
    }

    loadValues(week, account) {
        FirebaseService.getTransactionsByWeek(
            week,
            account,
            (dataReceived) => {
                let bills = Finance.getBillsForWeek(week, account, this.props.bills, dataReceived.items);
                for(let item of bills){
                  dataReceived.items.push(item);
                }
                let processedData = this.processData(dataReceived);
                for(let item of processedData.values){
                    item.formField = {};
                    item.formField.name = React.createRef();
                    item.formField.value = React.createRef();
                    item.formField.paid_date = React.createRef();
                }

                this.setState(
                    {
                        values: processedData.values,
                        total: processedData.total,
                        loading: false
                    }
                )
            }
        );
    }

    processData(data) {
        if(data.error){
            alert("Error! Please look at console for more info")
        }
        let values = [];
        let total = 0;
        for (let item of data.items) {
            values.push(item);
            if(Finance.isInput(item)) {
	            total += Finance.getValue(item);
	        } else {
	        	total -= Finance.getValue(item);
	        }
        }
        return {
            values: values,
            total: total
        };
    }

	toggleMode() {
	  let mode = this.state.mode

	  if(mode === 'view'){
	    mode = 'edit';
	  } else {
	    mode = 'view';
	  }

	  this.setState({
        mode: mode
	  });
	}

	handleSubmit() {
        this.setState({loading: true})
        let newValues = this.state.values;
        for(let item of newValues){
            if(Finance.isInput(item)){
                // TODO
            } else {
                item.name = item.formField.name.current.value;
                item.value = item.formField.value.current.value;
                item.paid_date = item.formField.paid_date.current.value;
            }
        }
        FirebaseService.saveTransactions(this.props.account, newValues, () => {
            this.setState({values: newValues});
            this.loadValues(this.props.week.start, this.props.account);
            this.toggleMode();
        })
    }

    handleNameChange(value, item) {
        let currentValues = this.state.values;
        currentValues[item].name = value;
        this.setState({values: currentValues});
    }

    handleValueChange(value, item) {
        let currentValues = this.state.values;
        currentValues[item].value = value.replace(/,/g, ".");
        this.setState({values: currentValues});
    }

    handleDateChange(value, item) {
        let currentValues = this.state.values;
        currentValues[item].paid_date = Datetime.fromDatepicker(value);
        this.setState({values: currentValues});
    }

    addTransaction() {
      let emptyTransaction = Finance.newTransaction(this.props.account);

      let values = this.state.values;
      values.push(emptyTransaction);
      this.setState({
        values: values
      })
    }

    removeTransaction(key) {
      // TODO fix issue on removing!!
      let updatedValues = this.state.values;
      updatedValues.splice(key,1);
      this.setState({
        values: updatedValues
      })
    }

    render() {
    	let mode = this.state.mode;
    	let week = this.props.week;
    	let values = this.state.values;

        return (
        <Card color="link">
            {!this.state.loading &&
            <CardBody>
                <Form inline>
                    <Row>
                        <Col lg="6">
                            <h2>Semana {week.number}</h2>
                            <h3>de {Datetime.dm(week.start)} a {Datetime.dm(week.end)}</h3>
                        </Col>
                        <Col className={" terra-right"}>
                            {mode === 'view' &&
                            <Button onClick={this.toggleMode} className={"terra-button terra-icone terra-icone-black"}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </Button>
                            }
                            {mode === 'edit' &&
                            <>
                                <Button className={"terra-button terra-icone terra-icone-blue"}
                                        onClick={this.addTransaction}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </Button>
                                <Button className={"terra-button terra-icone terra-icone-green"}
                                        onClick={this.handleSubmit}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </Button>
                                <Button onClick={this.toggleMode}
                                        className={"terra-button terra-icone terra-icone-red"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </Button>
                            </>
                            }
                        </Col>
                        <table className={'table terra-table'}>
                            <tbody>
                            {values.length < 1 &&
                            <tr>
                                <td><br/>Nenhum valor</td>
                                <td></td>
                                <td></td>
                            </tr>
                            }
                            {values.map((item, i) => {
                                if (mode === 'view') {
                                    return (
                                        <tr key={i}>
                                            <td>{values[i].name}</td>
                                            <td>{Finance.format(Finance.getValue(values[i]))}</td>
                                            <td className={"terra-table-col-info"}>
                                                <TerraAlert type={Finance.getStatus(values[i])}>
                                                    {values[i].status ? Datetime.dm(Datetime.fromFirebase(values[i].paid_date)) : Datetime.dm(Datetime.fromFirebase(values[i].date))}
                                                </TerraAlert>
                                            </td>
                                        </tr>
                                    )
                                } else return (
                                    <tr key={i}>
                                        {!values[i].is_fixed && values[i].id === '' &&
                                        <div>
                                            <ButtonDropdown className={"terra-center"}>
                                                <DropdownToggle caret
                                                                className={"terra-dropdown terra-icone-background"}>
                                                    A Receber
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>A Receber</DropdownItem>
                                                    <DropdownItem>Recebido</DropdownItem>
                                                    <DropdownItem>A Pagar</DropdownItem>
                                                    <DropdownItem>Pago</DropdownItem>
                                                </DropdownMenu>
                                            </ButtonDropdown>
                                        </div>
                                        }
                                        <div>
                                            <td className={"terra-extract-name"}>
                                                <Input placeholder={'Nome'}
                                                       value={values[i].name}
                                                       innerRef={values[i].formField.name}
                                                       onChange={(e) => this.handleNameChange(e.target.value, i)}
                                                />
                                            </td>
                                            <td className={"terra-extract-value"}>
                                                <Input placeholder={'Valor'}
                                                       value={Finance.getValue(values[i])}
                                                       innerRef={values[i].formField.value}
                                                       onChange={(e) => this.handleValueChange(e.target.value, i)}
                                                />
                                            </td>
                                            <td className={"terra-extract-date"}>
                                                <Input type="date"
                                                       value={values[i].paid_date != null ? Datetime.toDatePicker(values[i].paid_date) : ''}
                                                       placeholder="Pago em"
                                                       innerRef={values[i].formField.paid_date}
                                                       onChange={(e) => this.handleDateChange(e.target.value, i)}
                                                />
                                            </td>
                                            <td>
                                                {!values[i].is_fixed &&
                                                <Button className={"terra-button terra-icone terra-icone-red"} onClick={() => this.removeTransaction(i)}>
                                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                                </Button>
                                                }
                                            </td>
                                        </div>
                                    </tr>
                                )
                            })}
                            {mode === 'view' && values.length > 0 &&
                            <tr className={'terra-saldo'}>
                                <td>Saldo</td>
                                <td>{Finance.format(this.state.total)}</td>
                                <td></td>
                            </tr>
                            }
                            {mode === 'edit' &&
                            <>

                            </>
                            }
                            </tbody>
                        </table>
                    </Row>
                </Form>
            </CardBody>
            }
            {this.state.loading &&
                <>
                    <Row>
                        <Col className={"terra-center"}>
                            <Spinner animation="border" variant="success" className={'terra-loading'}/>
                            <p>Carregando...</p>
                        </Col>
                    </Row>
                </>
            }
        </Card>
        )
    }
}

export default CardWeek;