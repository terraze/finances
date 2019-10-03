import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Spinner,
    RadioGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { Form, Input } from 'reactstrap';
import TerraAlert  from './terra-alert.js'
import Datetime from '../utils/datetimeUtils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import Finance from '../models/finance.js';
import FirebaseService from '../services/FirebaseService.js';
import TransactionEditForm from './transaction-edit.js';


class CardWeek extends React.Component {
    constructor() {
      super();

      this.state = {
          mode: "view",
          total: 0,
          values: [],
          loading: true,
          modal: false,
          edit: {}
      };

      this.transactionFormReference = React.createRef();

      this.loadValues = this.loadValues.bind(this);
      this.toggleMode = this.toggleMode.bind(this);
      this.toggleModal = this.toggleModal.bind(this);      
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.addTransaction = this.addTransaction.bind(this);
      this.saveTransaction = this.saveTransaction.bind(this);
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
            (dataReceivedDate) => {
                FirebaseService.getTransactionsByWeek(
                    week,
                    account,
                    (dataReceived) => {
                        let itemsToMerge = [];
                        for(let item of dataReceivedDate.items){
                            let include = true;
                            for(let item2 of dataReceived.items){
                                if(item.id === item2.id){
                                    include = false;
                                    break;
                                }
                            }
                            if(include){
                                itemsToMerge.push(item);
                            }
                        }
                        dataReceived.items.concat(itemsToMerge);
                        let bills = Finance.getBillsForWeek(week, account, this.props.bills, dataReceived.items);
                        for(let item of bills){
                            dataReceived.items.push(item);
                        }
                        let processedData = this.processData(dataReceived);
                        for(let item of processedData.values){
                            item.formField = {};
                            item.formField.name = React.createRef();
                            item.formField.value = React.createRef();
                            item.formField.date = React.createRef();
                            item.formField.status = React.createRef();
                        }

                        this.setState(
                            {
                                values: processedData.values,
                                total: processedData.total,
                                loading: false,
                                mode: 'view'
                            }
                        )
                    },
                    'paid_date'
                );
            },
            'date'
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

    toggleModal() {
        this.setState({
          modal: !this.state.modal
        });
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
        this.setState({loading: true});
        let newValues = [];
        for(let item of this.state.values){
            if(item.delete !== undefined && item.delete){
                newValues.push(item);
            }
        }
        FirebaseService.saveTransactions(this.props.account, newValues, () => {
            this.loadValues(this.props.week.start, this.props.account);
            this.toggleMode();
        })
    }

    handleCancel() {
        this.loadValues(this.props.week.start, this.props.account);
    }

    addTransaction() {
        this.setState({
            edit: Finance.newTransaction(this.props.account),
            modal: true
        })
    }

    editTransaction(i) {
        let transaction = this.state.values[i];
        transaction.account = this.props.account;
        if(transaction.is_fixed){
            //transaction.account = this.props.account;
        }
        this.setState({
            edit: transaction,
            modal: true
        })
    }

    removeTransaction(key) {
      let values = this.state.values;
      values[key].delete = true;
      this.setState({
        values: values
      })
    }

    saveTransaction() {
        this.setState({loading: true})
        let formState = this.transactionFormReference.current.state;
        if(formState.name.length < 1 || formState.value.length < 1 || formState.date.length < 1){
            alert("Favor preencher todos os campos obrigatórios (Nome, Valor e Data de Vencimento");
            this.setState({loading: false})
            return;
        }
        if(formState.id === '') {

        }
        FirebaseService.saveTransactions(formState.account, [formState], () => {
            this.setState({modal: false});
            this.loadValues(this.props.week.start, this.props.account);
            this.toggleMode();
        })
    }

    render() {
    	let mode = this.state.mode;
    	let week = this.props.week;
    	let values = [];
    	for(let item of this.state.values){
    	    if(item.delete === undefined || !item.delete){
    	        values.push(item);
            }
        }

        return (
            <>
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
                                    <>
                                        <Button className={"terra-button terra-icone terra-icone-black"}
                                                onClick={this.addTransaction}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </Button>
                                        <Button onClick={this.toggleMode} className={"terra-button terra-icone terra-icone-black"}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </Button>
                                    </>
                                    }                            
                                    {mode === 'edit' &&
                                    <>                                
                                        <Button className={"terra-button terra-icone terra-icone-green"}
                                                onClick={this.handleSubmit}>
                                            <FontAwesomeIcon icon={faCheck}/>
                                        </Button>
                                        <Button onClick={this.handleCancel}
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
                                        return (
                                            <tr key={i}>
                                                <td>{values[i].name}</td>
                                                <td>{Finance.format(Finance.getValue(values[i]))}</td>
                                                <td className={"terra-table-col-info"}>
                                                    <TerraAlert type={Finance.getStatus(values[i])}>
                                                        {values[i].status ? Datetime.dm(Datetime.fromFirebase(values[i].paid_date)) : Datetime.dm(Datetime.fromFirebase(values[i].date))}
                                                    </TerraAlert>
                                                </td>
                                                {mode === 'edit' &&
                                                    <td>
                                                        <Button className={"terra-button terra-icone terra-icone-red"} onClick={() => this.editTransaction(i)}>
                                                            <FontAwesomeIcon icon={faEdit}/>
                                                        </Button>
                                                    {!values[i].is_fixed &&
                                                        <Button className={"terra-button terra-icone terra-icone-red"} onClick={() => this.removeTransaction(i)}>
                                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                                        </Button>
                                                    }
                                                    </td>
                                                }
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
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={'terra-modal'}>
                    {!this.state.loading &&
                        <>
                            <ModalHeader toggle={this.toggleModal}>
                                <div>Transação</div>
                            </ModalHeader>
                            <ModalBody>
                                <TransactionEditForm transaction={this.state.edit} accounts={this.props.accounts} ref={this.transactionFormReference}>

                                </TransactionEditForm>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={this.saveTransaction}>Salvar</Button>
                            </ModalFooter>
                        </>
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
                </Modal>                
            </>
        )        
    }
}

export default CardWeek;