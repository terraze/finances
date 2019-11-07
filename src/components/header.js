import React from "react";
import { Navbar, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom'

class Header extends React.Component {
    render() {
        return <header>
                <Navbar className={"terra-dark terra-background terra-navbar"} light expand="md" fixed="top">
                    <Nav pills className={"nav terra-dark"}>
                        <NavItem>
                            <NavLink exact className="nav-link" to="/resumo" activeClassName="active">
                              Resumo
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/extrato" activeClassName="active">
                              Extrato
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/saldo" activeClassName="active">
                              Saldo
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/relatorios" activeClassName="active">
                              Relatórios
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/cadastro" activeClassName="active">
                              Configuração
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </header>;
    }
}

export default Header;