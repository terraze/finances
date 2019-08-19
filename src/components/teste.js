import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Row, Col } from 'reactstrap';
import { Input, CardBody } from 'reactstrap';
import classnames from 'classnames';
import FirebaseService from "../services/FirebaseService";
import Finance from '../models/finance.js';

export default class Relatorios extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            bills: {
                weekly: [],
                biweekly: [],
                monthly: []
            },
            entrances: {
                weekly: [],
                biweekly: [],
                monthly: []
            }
        };
    }

    componentDidMount() {
        FirebaseService.getBills(
            (dataReceived) => {
                this.setState(
                    {bills: this.proccessData(dataReceived)}
                )
            }
        );
        FirebaseService.getEntrances(
            (dataReceived) => {
                this.setState(
                    {entrances: this.proccessData(dataReceived)}
                )
            }
        );
    }

    proccessData(data) {
        let weekly = [];
        let biweekly = [];
        let monthly = [];
        for(let item of data){
            if(item.frequency === 'weekly'){
                weekly.push(item);
            } else if(item.frequency === 'biweekly'){
                biweekly.push(item);
            } else if(item.frequency === 'monthly'){
                monthly.push(item);
            }
        }

        return {
            weekly: weekly,
            biweekly: biweekly,
            monthly: monthly
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

  render() {
    let bills = this.state.bills;
    let entrances = this.state.entrances;
    return (
      <div className={"terra-body"}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Entradas View
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Entradas Edit
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Saídas View
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Saídas Edit
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>

          <TabPane tabId="1">
            <Row>
              <Col lg="8">
                  <br/>
                  <br/>
                  <Card color="link" >
                      <CardBody>
                            <Row>
                              <Col lg="12"className={"terra-right"}>
                                  <Button className={"terra-button terra-icone terra-icone-black"}>
                                  </Button>
                                  <Button className={"terra-button terra-icone terra-icone-black"}>
                                      <FontAwesomeIcon  icon={faEdit} />
                                  </Button>
                              </Col>
                          </Row>
                          <Row>
                              <Col>
                                  <table className={'table terra-table'}>
                                      <tbody>
                                          { entrances.weekly.map((item, i) => (
                                              <tr key={i}>
                                                  <td>{entrances.weekly[i].week_day}</td>
                                                  <td>{entrances.weekly[i].name}</td>
                                                  <td>{entrances.weekly[i].worked_hours}h</td>
                                                  <td>{Finance.dolar(entrances.weekly[i].dolar)}</td>
                                                  <td>{Finance.format(Finance.getValue(entrances.weekly[i]))}</td>
                                                  <td>Semanalmente</td>
                                              </tr>
                                          ))}
                                      </tbody>
                                  </table>
                              </Col>
                              <br/>
                              <br/>
                              <br/>
                          </Row>   
                      </CardBody>
                  </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="2">
            <Row>
              <Col lg="8">
                  <br/>
                  <br/>
                  <Card color="link" >
                      <CardBody>
                          <Row>
                            <Col lg="12"className={"terra-right"}>
                                <Button className={"terra-button terra-icone terra-icone-blue"}>
                                    <FontAwesomeIcon  icon={faPlus} />
                                </Button>
                                <Button className={"terra-button terra-icone terra-icone-green"}>
                                    <FontAwesomeIcon  icon={faCheck} />
                                </Button>
                                <Button onClick={this.toggleMode}className={"terra-button terra-icone terra-icone-red"}>
                                    <FontAwesomeIcon  icon={faTimes} />
                                </Button>
                            </Col>
                          </Row>
                          <Row>
                              <Col>
                                  <table className={'table terra-table'}>
                                      <tbody>
                                          <tr>
                                            <td>
                                              <Input type="select" bsSize="sm">
                                                <option>S</option>
                                                <option>T</option>
                                                <option>Q</option>
                                                <option>Q</option>
                                                <option>S</option>
                                              </Input>
                                            </td>
                                            <td><Input placeholder="Salário Semanal" /></td>
                                            <td><Input placeholder="40h" /></td>
                                            <td><Input placeholder="R$ 3,88" /></td>
                                            <td>
                                              <Input type="select" bsSize="sm">
                                                <option>semanalmente</option>
                                                <option>quinzenalmente</option>
                                                <option>mensalmente</option>
                                              </Input>
                                            </td>

                                          </tr>
                                      </tbody>
                                  </table>
                              </Col>
                              <br/>
                              <br/>
                              <br/>
                          </Row>   
                      </CardBody>
                  </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="3">
            <Row>
            <Col lg="8">
                <br/>
                <br/>
                <Card color="link" >
                    <CardBody>
                        <Row>
                          <Col lg="12"className={"terra-right"}>
                              <Button className={"terra-button terra-icone terra-icone-black"}>
                                  <FontAwesomeIcon  icon={faEdit} />
                              </Button>
                          </Col>                        
                        </Row>
                        <Row>
                            <Col>
                                <table className={'table terra-table'}>
                                    <tbody>
                                        { bills.monthly.map((item, i) => (
                                            <tr key={i}>
                                                <td>{bills.monthly[i].day}</td>
                                                <td>{bills.monthly[i].bill}</td>
                                                <td>{Finance.format(bills.monthly[i].value)}</td>
                                                <td>Mensalmente</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Col>
                            <br/>
                            <br/>
                            <br/>
                        </Row>   
                    </CardBody>
                </Card>
            </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
            <Col lg="8">
                <br/>
                <br/>
                <Card color="link" >
                    <CardBody>
                          <Row>
                          <Col lg="12"className={"terra-right"}>
                              <Button className={"terra-button terra-icone terra-icone-blue"}>
                                  <FontAwesomeIcon  icon={faPlus} />
                              </Button>
                              <Button className={"terra-button terra-icone terra-icone-green"}>
                                  <FontAwesomeIcon  icon={faCheck} />
                              </Button>
                              <Button onClick={this.toggleMode}className={"terra-button terra-icone terra-icone-red"}>
                                  <FontAwesomeIcon  icon={faTimes} />
                              </Button>
                          </Col>
                       </Row>
                        <Row>
                            <Col>
                                <table className={'table terra-table'}>
                                    <tbody>
                                        <tr>
                                          <td>
                                            <Input type="select" bsSize="sm">
                                              <option>1</option>
                                              <option>2</option>
                                              <option>3</option>
                                              <option>4</option>
                                              <option>5</option>
                                              <option>6</option>
                                              <option>7</option>
                                              <option>8</option>
                                              <option>9</option>
                                              <option>10</option>
                                            </Input>
                                          </td>
                                          <td><Input placeholder="Condomínio" /></td>
                                          <td><Input placeholder="R$ 759,35" /></td>
                                          <td>
                                            <Input type="select" bsSize="sm">
                                              <option>mensalmente</option>
                                              <option>quinzenalmente</option>
                                              <option>semanalmente</option>
                                            </Input>
                                          </td>
                                          </tr>
                                          <tr>
                                          <td>
                                            <Input type="select" bsSize="sm">
                                              <option>S</option>
                                              <option>T</option>
                                              <option>Q</option>
                                              <option>Q</option>
                                              <option>S</option>
                                            </Input>
                                          </td>
                                          <td><Input placeholder="Cartões Semanais" /></td>
                                          <td><Input placeholder="R$ 90,00" /></td>
                                          <td>
                                            <Input type="select" bsSize="sm">
                                              <option>semanalmente</option>
                                              <option>quinzenalmente</option>
                                              <option>mensalmente</option>
                                            </Input>
                                          </td>
                                          <td>                                          
                                          </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                            <br/>
                            <br/>
                            <br/>
                        </Row>   
                    </CardBody>
                </Card>
            </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

