import React  from 'react';
import {
    Row,
    Form,
    Col,
    Card,
    CardBody,
    Button,
    Spinner,
    RadioGroup,
    InputGroup,
    Input,
    Label,
    InputGroupAddon
} from 'reactstrap';

import ApiService from '../services/ApiService.js';


class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '', 
            password: '',
            loading: false
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        this.setState({loading: true});
        event.preventDefault();
        ApiService.login(this.state.username, this.state.password, (success) => {
            if(success){
                this.props.onLogin();
            } else {
                this.setState({loading: false}); 
            }        
        })
    }

    render() {
      return (        
        <div  className={"terra-login terra-body"}>          
        	<Row>
        		<Col lg={{ size: 4, offset: 4 }} xs={{ size: 10, offset: 1 }} sm={{ size: 10, offset: 1 }} md={{ size: 4, offset: 4 }} className={"terra-center terra-body"}  >
        			<Card color="link">
        				<CardBody>
        					<br/>
        					<img src={require('..//assets/images/login/money.png')} width={200} height={200}alt={''}></img>                            
        					<Row>
        						<Col lg={{ size: 6, offset: 3 }}  xs={{ size: 10, offset: 1 }} sm={{ size: 10, offset: 1 }} md={{ size: 4, offset: 4 }}>
                                    <Row>
                                        <Col lg='0' xs='0' sm='0' md='0'>
                                        </Col>
                                        <Col lg={{ size: 12, offset: 0 }}  xs={{ size: 10, offset: 1 }} sm={{ size: 10, offset: 1 }} md={{ size: 12, offset: 0 }}>
                                            {!this.state.loading  &&
                                                <Form onSubmit={this.handleSubmit} className={"terra-center"}>
                        							<br/>
                			        				<Input
                			        					placeholder="username"
                			        				    type="input"
                			        				    name="username"
                			        				    className={"terra-center"}
                                                        value={this.state.username}
                                                        onChange={this.handleChangeUsername}>
                			       					</Input>
                			        				<p/>
                			        				<Input
                			        					placeholder="password"
                			        				    type="password"
                			        				    name="password" 
                			        				    className={"terra-center"}
                                                        value={this.state.password}
                                                        onChange={this.handleChangePassword}>
                			        				</Input>
                			        				<p/>
                			        				<Button color="success">Login</Button>
                			        				<br/>
                                                </Form>
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
        			        			</Col>
                                    </Row>
                                </Col>
			        		</Row>
        				</CardBody>
                        
        			</Card>
        		</Col>
        	</Row>
        </div>
      )
    }
}

export default Login;