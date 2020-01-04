import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { NavLink } from 'react-router-dom'


const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className={"terra-background terra-navbar"} light expand="md" fixed="top">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
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
                  Cadastro
                </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <NavbarBrand href="/">Terra Finances</NavbarBrand>
      </Navbar>
    </div>
  );
}

export default Example;
