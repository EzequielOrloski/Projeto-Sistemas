import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Floorplan from './components/floorplan/Floorplan';
import Home from './components/home/Home';
import Menu from './components/menu/Menu';

class App extends Component{
    render(){
		return(
			<Router>
			<div className="skin-black">
				<Menu/>
		        <div className="wrapper row-offcanvas row-offcanvas-left">
		        	<aside className="left-side sidebar-offcanvas">
		        		<section className="sidebar">
		        			<ul className="sidebar-menu">
		        				<li><Link to="/admin"><MdDashboard/>Dashboard</Link></li>
		        				<li><Link to="/floorplan"><FaMapMarkerAlt/>Floorplan</Link></li>
		        			</ul>
		        		</section>
		        	</aside>
		        	<aside className="right-side">
		        		<section className="content">
		        			<Route exact path="/floorplan" component={ Floorplan }/>
		        			<Route exact path="/admin" component={ Home }/>
		                </section>
		            </aside>
		        </div>
		    </div>
			</Router>
		);
	}
}
export default App;