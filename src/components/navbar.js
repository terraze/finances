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
  NavbarText,
  Container
} from 'reactstrap';
import { NavLink } from 'react-router-dom'


const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className={"terra-background terra-navbar navbar-expand-md bg-faded justify-content-center"} light expand="lg" fixed="top">
        <NavbarBrand className="terra-icone-black navbar-brand d-flex w-50 mr-auto" >Terra Finances</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="nav navbar-nav ml-auto w-100 justify-content-end" navbar>
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
      </Navbar>
    </div>
  );
}

export default Example;
