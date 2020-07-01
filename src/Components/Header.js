import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <>
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarBrand className="mr-10" href="/">
                        <img src="logo192.png" height="30%" width="30%" alt="Recipe App" />
                    </NavbarBrand>
                    <Nav navbar>
                        <NavItem className="mr-10">
                            <NavLink className="nav-link" to="/home">
                                <span className = "fa fa-home fa-lg"></span> Home 
                            </NavLink>
                        </NavItem>
                        <NavItem className="mr-10">
                            <NavLink className="nav-link" to="/aboutus">
                                <span className = "fa fa-info fa-lg"></span> About Us 
                            </NavLink>
                        </NavItem>
                        <NavItem className="mr-10">
                            <NavLink className="nav-link" to="/menu">
                                <span className = "fa fa-list fa-lg"></span> Menu
                            </NavLink>
                        </NavItem>
                        <NavItem className="mr-10">
                            <NavLink className="nav-link" to="/contactus">
                                <span className = "fa fa-address-card fa-lg"></span> Contact Us
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12">
                            <h1>Recipe App</h1>
                            <p>The pandemic is here to stay. People are developing their cooking skills during this time. It is also equally important to have healthy diet. You can find out the food and recipes for common food items and which are also labeled as balanced, high protein or high carb. </p>
                        </div>  
                    </div>
                </div>
            </Jumbotron>
            </>
        );
    }
}

export default Header;