import React from 'react';
import { Card, 
         Button, 
         Row, 
         Col,
         Breadcrumb, 
         BreadcrumbItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Input, CardBody } from 'reactstrap';
import classnames from 'classnames';
import ApiService from "../services/ApiService";
import Finance from '../models/finance.js';
import Sidebar  from './sidebar.js'

export default class Relatorios extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            bills: []
        };
    }

    componentDidMount() {
      this.loadValues();
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

  render() {
    let bills = this.state.bills;
    console.log(bills);
    let entrances = this.state.entrances;

    return (
      <div className={"terra-body"}>
        <Row>
          <Col lg={{ size: 6, offset: 3 }} >
            <h2  className={"terra-center"}>Transações</h2>
            <br/>
            <Card color="link">
              <CardBody>
                <Row>
                  <Col lg={{ size: 6, offset: 3}} className={"terra-center terra-breadcrumb"}>
                    <Breadcrumb className={"terra-center"} tag="nav" listTag="div">
                      <BreadcrumbItem className={"terra-center"} tag="a" href="#">Entradas</BreadcrumbItem>
                      <BreadcrumbItem className={"terra-center"} active>Saídas</BreadcrumbItem>
                    </Breadcrumb>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  </Col>
                </Row>
                <Row>
                    <Col>
                    <table className={'table'}>
                        <tbody>
                        { bills.map((key, i) => (
                            <tr key={i}>
                                <td>{bills[i].day}</td>
                                <td>{bills[i].name}</td>
                                <td>R$ {bills[i].value}</td>
                                <td>{bills[i].frequency}</td>
                            </tr>
                        )) }
                        </tbody>
                    </table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

