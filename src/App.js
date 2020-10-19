import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { FaTachometerAlt, FaBars, FaMapMarked, FaMapMarkerAlt } from "react-icons/fa";
import React, { Component }from 'react';
import { BsFillGearFill } from "react-icons/bs"
import Home from "./components/home/home";
import Boy  from './components/img/boy.png';
import Logo from './components/img/logo.jpeg';
import Footer from './components/footer/footer';
import Config from './components/config/config';
import CreateMap from './components/beacons/createMap';
import selectMaps from './components/beacons/selectMaps';
import EditPlanner from './components/beacons/editPlanner';
import MonitorUser from './components/beacons/monitorUser';
import './App.css';

class App extends Component{
    alternateNav() {
        if (document.getElementById("mySidenav").style.width != "0px"){
            document.getElementById("mySidenav").style.width = "0px";
        }  
        else{
            document.getElementById("mySidenav").style.width = "250px"; 
        }
    }

    render(){
        return(
        	<Router>
        	<div id="wrapper">
                <div id="mySidenav">
                    <ul className="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
                        <Link to="/dash" className="sidebar-brand d-flex align-items-center justify-content-center">
                            <div className="sidebar-brand-icon">
                                <img src={ Logo } alt="logo"/>
                            </div>
                            <div className="sidebar-brand-text mx-3">Indoor Positioning</div>
                        </Link>
                        <div className="nav-item active">
                            <Link to="/dash" className="nav-link"><FaTachometerAlt/><span>Dashboard</span></Link>
                        </div>
                        <hr className="sidebar-divider"/>
                        <div className="sidebar-heading">Configurações Beacons
                            <div className="nav-item">  
                                <a className="nav-link collapsed" href="/beacons">
                                    <FaMapMarked className="far fa-fw"/><span>Adicionar Mapas</span>
                                </a>
                                <a className="nav-link collapsed" href="/selectBeacons">
                                    <FaMapMarkerAlt className="far fa-fw"/><span>Selecionar Mapas</span>
                                </a>
                            </div>
                        </div>
                        <hr className="sidebar-divider"/>
                        <div className="sidebar-heading">Configurações Gerais
                            <div className="nav-item">
                                <a className="nav-link collapsed" href="/config">
                                    <BsFillGearFill className="far fa-fw fa-window-maximize"/><span>Configurações</span>
                                </a>
                            </div>
                        </div>
                        <hr className="sidebar-divider"/>
                    </ul>
                </div>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
                            <button id="sidebarToggleTop" onClick={this.alternateNav} className="btn-top">
                                <FaBars/>
                            </button>
                            <ul className="navbar-nav ml-auto">
                                <div className="topbar-divider d-none d-sm-block"></div>
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <img className="img-profile rounded-circle" src={ Boy }/>
                                        <span className="ml-2 d-none d-lg-inline text-white small">Ezequiel</span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>Settings
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="/" data-toggle="modal" data-target="#logoutModal">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <div className="container-fluid" id="container-wrapper">
                        	<div className="row mb-3">
                        		<Route path="/dash" component={ Home }/>
                        		<Route path="/beacons" component={ CreateMap }/>
                                <Route path="/selectBeacons" component={ selectMaps }/>
                                <Route path="/edit/:id" component={ EditPlanner } />
                                <Route path="/floorplan/:id" component={ MonitorUser }/>
                                <Route path="/config" component={ Config }/>
                        	</div>
                        	<Footer/>
            			</div>
            		</div>
            	</div>
            </div>
            </Router>
        );
    }
}
export default App;