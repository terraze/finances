import React from "react";
import {Alert} from 'reactstrap';

class TerraAlert extends React.Component {
    render() {
        let text = '';
        let content = this.props.children;
        if (this.props.type === 'pago'){
            text = 'Pago em ';            
        } else if (this.props.type === 'a-vencer'){
        	text = 'Pagar até ';
        } else if (this.props.type === 'vencido'){
        	text = 'Vencido em ';
        } else if (this.props.type === 'vence-hoje'){
            text = 'Vence hoje!';
            content = '';
        } else if (this.props.type === 'recebido'){
        	text = 'Recebido em ';
        } else if (this.props.type === 'estimado'){
            text = 'Estimado para ';
        } else if (this.props.type === 'a-receber'){
            text = 'Previsto para ';
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