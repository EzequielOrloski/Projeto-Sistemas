import React, { Component } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { FaMapMarkedAlt, FaBluetooth } from 'react-icons/fa'
import axios from 'axios';
import './style.css';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            beacons: 0,
            mapas: 0
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/planner/').then(response => {
            const pl = response.data['planners'].length;
            this.setState({mapas: pl});
        }).catch((error) => {
            console.log(error);
        });
        axios.get('http://localhost:5000/beacons/').then(response => {
            const pl = response.data['beacons'].length;
            this.setState({beacons: pl});
        }).catch((error) => {
            console.log(error);
        });

    }
    beacons = () =>{
        if(this.state.beacons > 0){
            return (<Card.Header>{ this.state.beacons } Beacons</Card.Header>)
        }else{
            return (<Card.Header>{ this.state.beacons } Beacon</Card.Header>)
        }
    }
    mapas = () =>{
        if(this.state.mapas > 0){
            return (<Card.Header>{ this.state.mapas } Mapas</Card.Header>)
        }else{
            return (<Card.Header>{ this.state.mapas } Mapa</Card.Header>)
        }
    }
	render(){
		return(
            <Container>
            <Row>
            <Col md={2} xs={2}>
                <Card border="primary" style={{ width: '100%' }} className="text-center">
                    { this.beacons() }
                    <Card.Body>
                        <Card.Text><FaBluetooth/></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={2} xs={2}>
                <Card border="primary" style={{ width: '100%' }} className="text-center">
                    { this.mapas() }
                    <Card.Body>
                        <Card.Text><FaMapMarkedAlt/></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
            </Container>
		);
	}
}
export default Home;