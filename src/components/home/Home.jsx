import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaBluetooth } from "react-icons/fa";

class Home extends Component{
	render(){
		return(
			<Row>
				<Col md={3}>
					<div className="sm-st clearfix">
						<span className="sm-st-icon st-red"><FaBluetooth/></span>
						<div className="sm-st-info"><span>3</span>Beacons</div>
					</div>
				</Col>
			</Row>
		);
	}
}
export default Home;