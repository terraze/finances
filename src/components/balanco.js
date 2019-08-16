import React  from 'react';
import { Row, Col , Card, CardBody, Button } from 'reactstrap';
import TerraAlert  from './terra-alert.js'
import { Form, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faCheck, faTimes, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";


class Balanco extends React.Component {
    constructor() {
      super();

      this.state = {
          mode: "view"
      };

      this.toggleMode = this.toggleMode.bind(this);
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

    render() {
        let mode = this.state.mode;
        return (
            <div className={"row terra-body"}>
                <Col lg={{size:10, offset:4}}>
                    <Row>
                        <Col lg="1">
                            <Button className={"terra-button-background terra-icone-background terra-icone-black"}>
                                <FontAwesomeIcon  icon={faArrowLeft} />
                            </Button>
                        </Col>
                        <Col lg="3">
                            <h1>m de yyyy</h1>
                        </Col>
                        <Col lg="2">
                            <Button className={"terra-button-background terra-icone-background terra-icone-black"}>
                                <FontAwesomeIcon  icon={faArrowRight} />
                            </Button>

                        </Col>
                    </Row>
                    <br/>
                </Col>
                <Col lg={{size:5, offset:1}}>
                  <Card color="link">
                    <CardBody>
                        <Form inline>
                        <Row>
                        <Col lg="6">
                            <h2>Semana S</h2>

                            <h3>de dd/mm a dd/mm</h3>
                        </Col>
                        <Col className={" terra-right"}>
                            { mode === 'view' &&
                                <Button onClick={this.toggleMode} className={"terra-button terra-icone terra-icone-black"}>
                                    <FontAwesomeIcon  icon={faEdit} />
                                </Button>
                            }
                            { mode === 'edit' && 
                                <React.Fragment>
                                    <Button className={"terra-button terra-icone terra-icone-blue"}>
                                        <FontAwesomeIcon  icon={faPlus} />
                                    </Button>
                                    <Button className={"terra-button terra-icone terra-icone-green"}>
                                        <FontAwesomeIcon  icon={faCheck} />
                                    </Button>
                                    <Button onClick={this.toggleMode}className={"terra-button terra-icone terra-icone-red"}>
                                        <FontAwesomeIcon  icon={faTimes} />
                                    </Button>
                                </React.Fragment>
                            }
                        </Col>
                          <table className={'table terra-table'}>
                              <tbody>
                                <tr>
                                  <td>Entrada</td>
                                  <td>R$ 00,00</td>
                                      <td className={"terra-table-col-info"}>
                                        { mode === 'view' &&
                                          <TerraAlert type="recebido">
                                            dd/mm
                                          </TerraAlert>
                                        }
                                        { mode === 'edit' &&
                                            <Button className={"terra-button terra-icone terra-icone-red"}>
                                                <FontAwesomeIcon  icon={faTrashAlt} />
                                            </Button>
                                        }
                                      </td>
                                  </tr> 
                                  <tr>
                                      <td>Saída</td>
                                      <td>R$ 00,00</td>
                                      <td className={"terra-table-col-info"}>
                                        { mode === 'view' &&
                                          <TerraAlert type="pago">
                                            dd/mm
                                          </TerraAlert>
                                        }
                                        { mode === 'edit' &&
                                            <Button className={"terra-button terra-icone terra-icone-red"}>
                                                <FontAwesomeIcon  icon={faTrashAlt} />
                                            </Button>
                                        }
                                      </td>
                                  </tr>
                                    <tr>
                                      <td>Saída</td>
                                      <td>R$ 00,00</td>
                                      <td className={"terra-table-col-info"}>
                                        { mode === 'view' &&
                                          <TerraAlert type="a-vencer">
                                            dd/mm
                                          </TerraAlert>
                                        }
                                        { mode === 'edit' &&
                                            <Button className={"terra-button terra-icone terra-icone-red"}>
                                                <FontAwesomeIcon  icon={faTrashAlt} />
                                            </Button>
                                        }
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>Saída</td>
                                      <td>R$ 00,00</td>
                                      <td className={"terra-table-col-info"}>
                                        { mode === 'view' &&
                                          <TerraAlert type="vencido">
                                            dd/mm
                                          </TerraAlert>
                                        }
                                        { mode === 'edit' &&
                                            <Button className={"terra-button terra-icone terra-icone-red"}>
                                                <FontAwesomeIcon  icon={faTrashAlt} />
                                            </Button>
                                        }
                                      </td>                             
                                  </tr>
                                  { mode === 'view' &&
                                  <tr className={'terra-saldo'}>
                                      <td>Saldo</td>
                                      <td>R$ 00,00</td>
                                      <td></td>
                                  </tr>
                                  }
                                  { mode === 'edit' && 
                                  <React.Fragment>
                                    <tr>
                                        <td>
                                          <Input type="text" size="10" name="text" value="Conta"/>
                                        </td>
                                        <td>
                                          <Input type="text" size="5" name="text" value="R$"/>
                                        </td>
                                        <td>
                                          <Input type="text" size="2" name="text" value="Data"/>
                                        </td>
                                    </tr>
                                  </React.Fragment>
                                  }
                              </tbody>
                          </table>
                      </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
            </div>
        );
    }
}

export default Balanco;