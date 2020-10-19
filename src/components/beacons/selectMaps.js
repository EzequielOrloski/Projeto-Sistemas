import axios from 'axios';
import React, { Component } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import casa from '../../fonts/casa.svg';

const Beacons = props => (
	<Col md={3} lg={3}>
	<Card style={{ width: '100%' }} className="text-center mapas">
		<Card.Img variant="top" src={ casa }/>
		<b className="b">{ props.planner.name }</b>
		<ListGroup className="list-group-flush">
			<ListGroupItem>
				<Row>
					<Col><Link to={"/edit/"+props.planner._id}><FaEdit/></Link></Col>
					<Col><a href="/selectBeacons" onClick={() => { props.deletePlanner(props.planner._id) }}><MdDeleteForever/></a></Col>
					<Col><Link to={"/floorplan/"+props.planner._id}><FaEdit/></Link></Col>
				</Row>
			</ListGroupItem>
		</ListGroup>
	</Card>
	</Col>
)

class SelectBeacons extends Component{
	constructor(props){
        super(props);
        this.deletePlanner = this.deletePlanner.bind(this)
        this.state = {
            planners: [],
        }
    }
    deletePlanner(id){
    	axios.delete('http://localhost:5000/planner/'+id)
    	.then(response => { console.log(response.data)});
    	this.setState({ planners: this.state.planners.filter(el => el._id !== id) })
    }
    componentDidMount(){
        axios.get('http://localhost:5000/planner/').then(response => {
        	const pl = response.data['planners'];
        	this.setState({ planners: pl })
        }).catch((error) => {
            console.log(error);
        })
    }
    plannersList(){
		return this.state.planners.map(planner => {
			return <Beacons planner={planner} deletePlanner={this.deletePlanner} key={planner._id}/>;
    	})
    }
	render(){
		return(
			<Container>
				<Row>
					{ this.plannersList() }
				</Row>
			</Container>
		);
	}
}
export default SelectBeacons;