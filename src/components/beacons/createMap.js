import { Container, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class CreateMap extends Component {
    constructor(props){
        super(props);
        this.onChangePlanner = this.onChangePlanner.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            data: '',
            contentType: '',
        }
    }
    onChangePlanner(e){
        this.setState({ name: e.target.value })
    }
    onSubmit(e){
        e.preventDefault();
        const planner = { name: this.state.name, beacons: [] };
        axios.post('http://localhost:5000/planner/', planner).then(res => console.log(res.data));
        this.setState({ name: '' })
        window.location = '/selectBeacons';
    }
	render(){
		return(
        <Container fluid className="map bg-white" id="map">
            <Row>
            <div className="card mb-4">
            <form onSubmit={this.onSubmit}>
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Criar Mapa</h6>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="name">Nome do Mapa</label>
                        <input type="text" required id="name" className="form-control" value={this.state.name} onChange={this.onChangePlanner}/>
                    </div>
                    <div className="form-group">
                        <div className="custom-file">
                            <label className="custom-file-label" htmlFor="customFile">Adicionar SGV</label>
                            <input type="file" className="custom-file-input" required id="customFile" accept="image/svg+xml"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
              </div>
            </Row>
        </Container>
		);
	}
}
export default CreateMap;