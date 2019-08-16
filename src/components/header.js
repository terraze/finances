import React from "react";
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends React.Component {
    render() {
        return <header className={"ml-auto"}>
                <Navbar className={"terra-dark terra-background"} light expand="md" fixed="top">
                    <Nav pills className={"nav terra-dark"}>
                        <NavItem>
                            <NavLink className={'active'} href={"#"}>Resumo</NavLink>
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