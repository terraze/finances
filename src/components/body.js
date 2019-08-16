import React  from 'react';
import { Row, Col , Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import TerraAlert  from './terra-alert.js'
import Sidebar from './sidebar.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faCheck, faTimes, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";


class Body extends React.Component {
    render() {
        let mode = 'edit';
        return (
            <div className={"row terra-body"}>
                <Col lg="12">
                    <Button className={"terra-button terra-icone-background terra-icone-black"}>
                        <FontAwesomeIcon  icon={faArrowLeft} />
                    </Button>
                    <h1>m de yyyy</h1>
                    <Button className={"terra-button terra-icone-background terra-icone-black"}>
                        <FontAwesomeIcon  icon={faArrowRight} />
                    </Button>
                    <br/>
                </Col>
                <Col lg={{size:5, offset:1}}>
                  <Card color="link">
                    <CardBody>
                        <Row>
                        <Col lg="6">
                            <h2>Semana S</h2>

                            <h3>de dd/mm a dd/mm</h3>
                        </Col>
                        <Col className={" terra-right"}>
                            { mode == 'view' &&
                                <Button className={"terra-button terra-icone terra-icone-black"}>
                                    <FontAwesomeIcon  icon={faEdit} />
                                </Button>
                            }
                            { mode == 'edit' && 
                                <React.Fragment>
                                    <Button className={"terra-button terra-icone terra-icone-green"}>
                                        <FontAwesomeIcon  icon={faPlus} />
                                    </Button>
                                    <Button className={"terra-button terra-icone terra-icone-green"}>
                                        <FontAwesomeIcon  icon={faCheck} />
                                    </Button>
                                    <Button className={"terra-button terra-icone terra-icone-red"}>
                                        <FontAwesomeIcon  icon={faTimes} />
                                    </Button>
                                </React.Fragment>
                            }
                        </Col>
                          <table className={'table terra-table'}>
                              <thead>
                              </thead>
                              <tbody>
                                  <td>Entrada</td>
                                  <td>R$ 00,00</td>
                                      <td className={"terra-table-col-info"}>
                                        { mode == 'view' &&
                                          <TerraAlert type="recebido">
                                            dd/mm
                                          </TerraAlert>
                                        }
                                        { mode == 'edit' &&
                                            <Button className={"terra-button terra-icone terra-icone-red"}>
                                                <FontAwesomeIcon  icon={faTrashAlt} />
                                            </Button>
                                        }
                                      </td>
                                  <tr>
                                      <td>Saída</td>
                                      <td>R$ 00,00</td>
                                      <td className={"terra-table-col-info"}>
                                        { mode == 'view' &&
                                          <TerraAlert type="pago">
                                            dd/mm
                                          </TerraAlert>
                                        }
                                        { mode == 'edit' &&
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
                                        { mode == 'view' &&
                                          <TerraAlert type="a-vencer">
                                            dd/mm
                                          </TerraAlert>
                                        }
                                        { mode == 'edit' &&
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
                                        { mode == 'view' &&
                                          <TerraAlert type="vencido">
                                            dd/mm
                                          </TerraAlert>
                                        }
                                        { mode == 'edit' &&
                                            <Button className={"terra-button terra-icone terra-icone-red"}>
                                                <FontAwesomeIcon  icon={faTrashAlt} />
                                            </Button>
                                        }
                                      </td>                             
                                  </tr>
                                  <tr className={'terra-saldo'}>
                                      <td>Saldo</td>
                                      <td>R$ 00,00</td>
                                      <td></td>
                                  </tr>
                              </tbody>
                          </table>
                          <Col lg={{offset:11}}>
                            <Button className={"terra-button terra-icone terra-icone-plus"}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>                          
                          </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
            </div>
        );
    }
}

export default Body;