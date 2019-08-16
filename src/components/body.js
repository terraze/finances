import React from 'react';
import { Row, Col , Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import TerraAlert  from './terra-alert.js'
import Sidebar from './sidebar.js'

class Body extends React.Component {
    render() {
        return (
            <div className={"row terra-body"}>
                <Col lg="12">
                    <h1>m de yyyy</h1>
                    <br/>
                </Col>
                <Col lg={{size:5, offset:1}}>
                  <Card color="link">
                    <CardBody>
                    <h1>Semana S</h1>
                    <p style={{textAlign: "center"}}>de dd/mm a dd/mm</p>
                      <table className={'table terra-table'}>
                          <thead>
                          </thead>
                          <tbody>
                              <td>Entrada</td>
                              <td>R$ 00,00</td>
                              <td>
                                  <TerraAlert type="recebido">
                                    dd/mm
                                  </TerraAlert>
                              </td>
                              <tr>
                                  <td>Saída</td>
                                  <td>R$ 00,00</td>
                                  <td>
                                      <TerraAlert type="pago">
                                        dd/mm
                                      </TerraAlert>
                                  </td>
                              </tr>
                                <tr>
                                  <td>Saída</td>
                                  <td>R$ 00,00</td>
                                  <td>
                                  <TerraAlert type="a-vencer">
                                    dd/mm
                                  </TerraAlert>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Saída</td>
                                  <td>R$ 00,00</td>
                                  <td>
                                  <TerraAlert type="vencido">
                                    dd/mm
                                  </TerraAlert>
                                  </td>                              
                              </tr>
                              <tr className={'terra-saldo'}>
                                  <td>Saldo</td>
                                  <td>R$ 00,00</td>
                                  <td></td>

                              </tr>
                          </tbody>
                      </table>
                      <Button>Salvar</Button>
                    </CardBody>
                  </Card>
                </Col>
            </div>
        );
    }
}

export default Body;