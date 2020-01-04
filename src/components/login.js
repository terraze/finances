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
        this.state = {username: '', password: ''};

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
        event.preventDefault();
        ApiService.login(this.state.username, this.state.password, () => {
            this.props.onLogin();
        })
    }

    render() {
      return (        
        <div  className={"terra-body"}>          
        	<Row>
        		<Col lg={{ size: 4, offset: 4 }} className={"terra-center  terra-login"}  >
        			<Card color="link">
        				<CardBody>
        					<br/>
        					<img src={require('..//assets/images/login/money.png')} width={200} height={200}alt={''}></img>                            
        					<Row>
        						<Col lg={{ size: 8, offset: 2 }}>
                                    <Form onSubmit={this.handleSubmit}>
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