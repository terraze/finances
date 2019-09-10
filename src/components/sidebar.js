import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button, Row, Col } from 'reactstrap';
import moment from 'moment'
import FirebaseService from '../services/FirebaseService.js';

class Sidebar extends React.Component {
    constructor() {
      super();

      this.state = {
          bills: []
      };

      this.loadValues = this.loadValues.bind(this);
    }

    componentDidMount() {
        this.loadValues();
    }

    loadValues() {
        FirebaseService.getBills(
            null,
            (dataReceived) => {                
                this.setState(
                    {
                        bills: dataReceived
                    }
                )
            }
        );
    }

    editBills() {
        alert("to implement, sorry, come back later");
    }

    getRowClass(currentDay, rowDay) {
        /*
        bg-danger - Atrasado
        table-danger - Vence hoje, pague logo essa misera
        table-warning - Pagar nessa semana
        table-success - Pago
        (none) - Próximas
         */
        if(currentDay === rowDay) {
            return 'table-warning';
        } else if(currentDay > rowDay) {
            return 'table-danger';
        }
        return '';
    }

    render() {
        const bills = this.state.bills;
        const currentDay = moment().format('D');
        return (
            <div>
                <Row>
                    <Col xs="10">
                        <h2>Despesas</h2>
                    </Col>
                    <Col xs="2">
                        <Button onClick={this.editBills}>
                            <FontAwesomeIcon  icon={faEdit} />
                        </Button>

                    </Col>
                </Row>
                <table className={'table'}>
                    <thead className={'thead-dark'}>
                        <tr>
                            <th>Dia</th>
                            <th>Conta</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                    { bills.map((key, i) => (
                        <tr className={this.getRowClass(currentDay, bills[i].day)} key={i}>
                            <td>{bills[i].day}</td>
                            <td>{bills[i].bill}</td>
                            <td>R$ {bills[i].value}</td>
                        </tr>
                    )) }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Sidebar;