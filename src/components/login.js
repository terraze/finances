import React  from 'react';
import {
    Row,
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


class Login extends React.Component {
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
        							<br/>
			        				<Input
			        					placeholder="username"
			        				    type="input"
			        				    name="login"
			        				    className={"terra-center"}>
			       					</Input>
			        				<p/>
			        				<Input
			        					placeholder="password"
			        				    type="password"
			        				    name="password" 
			        				    className={"terra-center"}>
			        				</Input>
			        				<p/>
			        				<Button color="success">Login</Button>
			        				<br/>
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