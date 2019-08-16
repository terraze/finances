import React from "react";
import { Navbar, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom'

class Header extends React.Component {
    render() {
        return <header>
                <Navbar className={"terra-dark terra-background terra-navbar"} light expand="md" fixed="top">
                    <Nav pills className={"nav terra-dark"}>
                        <NavItem>
                            <NavLink exact="true" className="nav-link" to="/" activeClassName="active">
                              Resumo
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/balanco" activeClassName="active">
                              Balanço
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
                            <NavLink className="nav-link" to="/configuracao" activeClassName="active">
                              Configuração
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </header>;
    }
}

export default Header;