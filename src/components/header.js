import React from "react";
import { Navbar, Nav, NavItem, NavLink , button } from 'reactstrap';

class Header extends React.Component {
    render() {
        return <header>
                <Navbar className={'navbar-expand-md navbar-light bg-light fixed-top'}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/terrafinance-6c073.appspot.com/o/assets%2FLogo.png?alt=media&token=72b7a41d-433a-4309-84ed-e0c2fa91105c" alt={""} width={"40"} height={"40"} style=
                    {{marginRight: "15px"}}></img>
                    <button className={"navbar-toggler"} type={"button"} dataToggle={"collapse"} dataTarget={"#navbarsExampleDefault"} ariaControls={"navbarsExampleDefault"} ariaExpanded={"false"} ariaLabel={"Toggle navigation"}>
                      <span className={"navbar-toggler-icon"}></span>
                    </button>
                    <Nav className={"nav nav-tabs"} id={"navbarsExampleDefault"}>
                        <NavItem>
                            <NavLink className={'active'} href={"#"}>Início</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={"#"}>Balanço</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={"#"}>Saldo</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={"#"}>Relatórios</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={"#"}>Configuração</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </header>;
    }
}

export default Header;