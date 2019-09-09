import React from "react";
import { Row, Col , Card, CardBody, Button, Spinner } from 'reactstrap';
import { Form, Input } from 'reactstrap';
import TerraAlert  from './terra-alert.js'
import Datetime from '../utils/datetimeUtils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Finance from '../models/finance.js';
import FirebaseService from '../services/FirebaseService.js';
import { DateTimePicker } from 'react-widgets'


class CardWeek extends React.Component {
    constructor() {
      super();

      this.state = {
          mode: "view",
          total: 0,
          values: [],
          loading: true,
          tempDates: []
      };

      this.loadValues = this.loadValues.bind(this);
      this.toggleMode = this.toggleMode.bind(this);
      this.handleDatePicker = this.handleDatePicker.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.loadValues(this.props.week.start, this.props.account);
    }

    componentDidUpdate(prevProps, prevStates) {
    	if((prevProps.week.number !== this.props.week.number) || (prevProps.account !== this.props.account)){
    		this.loadValues(this.props.week.start, this.props.account);
    	}
    	console.log(this.state);
    }

    loadValues(week, account) {
        FirebaseService.getTransactionsByWeek(
            week,
            account,
            (dataReceived) => {
                let processedData = this.processData(dataReceived);
                for(let item of processedData.values){
                    item.formField = {}
                    item.formField.name = React.createRef();
                    item.formField.value = React.createRef();
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
            if(Finance.isInput(item)){
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

	toggleMode(){
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

	handleSubmit(){
        this.setState({loading: true})
        let newValues = this.state.values;
        for(let item of newValues){
            if(Finance.isInput(item)){

            } else {
                item.name = item.formField.name.current.value;
                item.value = item.formField.value.current.value;
            }
        }
        return;
        FirebaseService.saveTransactions(newValues, () => {
            this.setState({values: newValues});
            this.loadValues(this.props.week.start, this.props.account);
            this.toggleMode();
        })
    }

    handleDatePicker(value, item) {
        let newDates = this.state.tempDates;
        newDates[item].date = value;
        this.setState({tempDates: newDates});
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
                                <Button className={"terra-button terra-icone terra-icone-blue"}>
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
                                                    {Datetime.dm(Datetime.fromFirebase(values[i].date))}
                                                </TerraAlert>
                                            </td>
                                        </tr>
                                    )
                                } else return (
                                    <tr key={i}>
                                        <td className={"terra-extract-name"}>
                                            <Input placeholder={'Nome'}
                                                   defaultValue={values[i].name}
                                                   innerRef={values[i].formField.name}/>
                                        </td>
                                        <td className={"terra-extract-value"}>
                                            <Input placeholder={'Valor'} defaultValue={Finance.getValue(values[i])} innerRef={values[i].formField.value}/>
                                            {/*<DateTimePicker placeholder={'Data de pagamento'}
                                                            defaultValue={null}
                                                            time={false}
                                                            onChange={(value) => this.handleDatePicker(value, i)}/>*/}
                                        </td>
                                        <td>
                                            <Button className={"terra-button terra-icone terra-icone-red"}>
                                                <FontAwesomeIcon icon={faTrashAlt}/>
                                            </Button>
                                        </td>
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
                    {/* Para testar o Spinner, mude para loading para true no setState da função loadValues*/}
                    <Spinner animation="border" variant="success" className={'terra-loading'}/>
                    <p>Carregando...</p>
                </>
            }
        </Card>
        )
    }
}

export default CardWeek;