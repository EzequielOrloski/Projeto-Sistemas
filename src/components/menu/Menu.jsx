import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Nav, NavDropdown } from 'react-bootstrap';

class Menu extends Component{
	render(){
		return (
			<header className="header">
				<Link to="/admin" className="logo">Indoor Positioning</Link>
				<Nav defaultActiveKey="/admin" as="ul" className="navbar navbar-static-top">
					<Nav.Item as="li" className="user">Dashboard</Nav.Item>
					<Nav.Item as="li">
						<NavDropdown title="Ezequiel" id="nav-dropdown">
							<NavDropdown.Item>Minha conta</NavDropdown.Item>
							<NavDropdown.Item>Beacons</NavDropdown.Item>
							<NavDropdown.Divider/>
							<NavDropdown.Item>Sair</NavDropdown.Item>
						</NavDropdown>
					</Nav.Item>
				</Nav>
			</header>
		);
	}
}
export default Menu;