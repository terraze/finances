import React from "react";
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends React.Component {
    render() {
        return <header>
                <Navbar className={'navbar-expand-lg navbar-dark bg-success'}>
                    <h3>Finanças da Família Terra</h3>
                    <Nav navbar>
                        <NavItem className={'active'}>
                            <NavLink href={"#"}>Início</NavLink>
                        </NavItem>
                        <NavItem className={'active'}>
                            <NavLink href={"#"}>Entradas</NavLink>
                        </NavItem>
                        <NavItem className={'active'}>
                            <NavLink href={"#"}>Despesas</NavLink>
                        </NavItem>
                        <NavItem className={'active'}>
                            <NavLink href={"#"}>Saldo</NavLink>
                        </NavItem>
                        <NavItem className={'active'}>
                            <NavLink href={"#"}>Relatórios</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                <br/>
            </header>;
    }
}

export default Header;