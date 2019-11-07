import React from 'react';
import { Card, 
         Button, 
         Row, 
         Col,
         Modal,
         ModalHeader,
         ModalBody,
         ModalFooter,
         Spinner
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Input, CardBody } from 'reactstrap';
import classnames from 'classnames';
import ApiService from "../services/ApiService";
import Finance from '../models/finance.js';
import BillEditForm from './bill-edit.js';


export default class Cadastro extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            bills: [],
            mode: 'view',
            edit: ''
        };

        this.toggleMode= this.toggleMode.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addBill = this.addBill.bind(this);
        this.saveBill = this.saveBill.bind(this);  
        this.billFormReference = React.createRef();



    }



    componentDidMount() {
        ApiService.getAccounts(
              (dataReceived) => {
                this.setState(
                  {accounts: dataReceived}
                );
                this.loadValues();
            }
          );
    }

    loadValues() {
        ApiService.getBills(
            null,
            (dataReceived) => {

                this.setState(
                    {
                        bills: dataReceived
                    }
                )
                console.log(dataReceived);
            }
        );
    }

    addBill() {
        this.setState({
            modal: true
        })
    }

    editBill(i) {
        let bill = this.state.bills[i];
        this.setState({
            edit: bill,
            modal: true
        })
    }


    handleSubmit() {
        this.setState({loading: true});
        let newValues = [];
        for(let item of this.state.values){
                if(item.delete !== undefined && item.delete){
                    newValues.push(item);
                }
            }
            ApiService.saveBills(this.props.account, newValues, () => {
                this.loadValues(this.props.week.start, this.props.account);
                this.toggleMode();
            })
        }

    handleCancel() {
      this.setState ({
        mode: 'view'
      })
    }

        saveBill() {
            this.setState({loading: true})
            let formState = this.BillFormReference.current.state;
            if(formState.name.length < 1 || formState.value.length < 1 || formState.date.length < 1){
                alert("Favor preencher todos os campos obrigatórios (Nome, Valor e Data de Vencimento");
                this.setState({loading: false})
                return;
            }
            if(formState.id === '') {

            }
            ApiService.saveBills(formState.account, [formState], () => {
                this.setState({modal: false});
                this.loadValues(this.props.week.start, this.props.account);
                this.toggleMode();
            })
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

  render() {
    let bills = this.state.bills;
    console.log(bills);
    let entrances = this.state.entrances;
    let mode = this.state.mode;

    return (
      <div className={"terra-body"}>
        <Row>
          <Col lg={{ size: 8, offset: 2 }} >
            <br/>
            <Card color="link">
              <CardBody>
                <Row>
                    <Col lg="9" >
                    <h2  className={"terra-right terra-margin-right"}>Cadastro</h2>
                    </Col>
                    <Col lg="3" className={"terra-right"}>
                      {mode === 'view' &&
                      <>
                          <Button className={"terra-button terra-icone terra-icone-black"}
                                  onClick={this.addBill}>
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
                </Row>
                <Row>
                    <Col>
                    <br/>
                    <table className={'table'}>
                        <tbody>
                        { bills.map((key, i) => (
                            <tr key={i}>
                                <td>{bills[i].day}</td>
                                <td>{bills[i].name}</td>
                                <td>R$ {bills[i].value}</td>
                                <td>bills[i].account.name</td>
                                {mode === 'view' && 
                                  <td>{bills[i].frequency}</td>
                                }
                                {mode === 'edit' &&
                                <td>
                                    <Button className={"terra-button terra-icone terra-icone-black"} onClick={() => this.editBill(i)}>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </Button>
                                    <Button className={"terra-button terra-icone terra-icone-red"} onClick={() => this.removeBill(i)}>
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                    </Button>
                                </td>
                                }
                            </tr>
                        )) }
                        </tbody>
                    </table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={'terra-modal'}>
                {!this.state.loading &&
                    <>
                        <ModalHeader toggle={this.toggleModal}>

                        </ModalHeader>
                        <ModalBody>
                          <BillEditForm bills={this.state.edit} accounts={this.state.accounts} ref={this.billFormReference}>
                          </BillEditForm>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={this.saveBill}>Salvar</Button>
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
          </Col>
        </Row>
      </div>
    );
  }
}
