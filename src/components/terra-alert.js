import React from "react";
import {Alert} from 'reactstrap';

class TerraAlert extends React.Component {
    render() {
        let text = '';
        let content = this.props.children;
        if (this.props.type == 'pago'){
        	text = 'Pago em ';
        } else if (this.props.type == 'a-vencer'){
        	text = 'Vence em ';
        } else if (this.props.type == 'vencido'){
        	content = '';
        	text = 'Vencido';
        } else if (this.props.type == 'recebido'){
        	content = '';
        	text = 'Recebido';
        }
        return (
        <Alert className={"terra-alert terra-"+this.props.type}>
        	{text}
            {content}
        </Alert>
        )
    }
}

export default TerraAlert;