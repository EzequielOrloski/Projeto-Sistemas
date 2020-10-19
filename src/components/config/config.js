import { Container, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import axios from 'axios';


class Config extends Component {
    constructor(props){
        super(props);
        this.onChangeBroker = this.onChangeBroker.bind(this);
        this.onChangeTI = this.onChangeTI.bind(this);
        this.onChangeTO = this.onChangeTO.bind(this);
        this.onChangeUni = this.onChangeUni.bind(this);
        this.onChangeDB = this.onChangeDB.bind(this);
        this.onChangeIdi = this.onChangeIdi.bind(this); 
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            broker: '',
            topicoin: '',
            topicoou: '',
            unidades: 'm',
            id: '',
            db: '',
        }
    }
    onChangeBroker(e){
        this.setState({ broker: e.target.value })
    }
    onChangeTI(e){
        this.setState({ topicoin: e.target.value })
    }
    onChangeTO(e){
        this.setState({ topicoou: e.target.value })
    }
    onChangeUni(e){
        this.setState({ unidades: e.target.value })
    }
    onChangeDB(e){
        this.setState({ db: e.target.value })
    }
    componentDidMount(){
        axios.get('http://localhost:5000/config/').then(response => {
           this.setState({ 
           		broker: response.data.config[0].broker,
           		topicoin: response.data.config[0].topicoin,
           		topicoou: response.data.config[0].topicoou,
           		unidades: response.data.config[0].unidades,
           		id: response.data.config[0]._id,
           		db: response.data.config[0].db,
            });
        }).catch((error) => {
            console.log(error);
        })
    }
    onChangeIdi(e){
        this.setState({ lingugem: e.target.value })
    }
    onSubmit(e){
        e.preventDefault();
        const beacons = { 
        	broker: this.state.broker,
        	topicoin: this.state.topicoin,
        	topicoou: this.state.topicoou,
        	unidades: this.state.unidades,
        	db: this.state.db
        };
        axios.put('http://localhost:5000/config/' + this.state.id, beacons)
        .then(res => console.log(res.data));
        window.location = '/dash';
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
                        <label htmlFor="br">Nome do Broker</label>
                        <input type="text" required id="br" className="form-control" value={this.state.broker} onChange={this.onChangeBroker}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nome do Topico Subscribe</label>
                        <input type="text" required id="name" className="form-control" value={this.state.topicoin} onChange={this.onChangeTI}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nome do Topico Publish</label>
                        <input type="text" required id="name" className="form-control" value={this.state.topicoou} onChange={this.onChangeTO}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Link de conexão banco de Dados</label>
                        <input type="text" required id="name" className="form-control" value={this.state.db} onChange={this.onChangeDB}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="med">Unidades de medida</label>
                        <select className="form-control" id="med" defaultValue={this.state.unidades} onChange={this.handleChangeUni}>
                        	<option value="mm">Milimetro</option>
                        	<option value="cm">Centimetro</option>
                        	<option value="m">Metro</option>
                        	<option value="km">Kilometro</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Atualizar</button>
                </div>
              </form>
              </div>
            </Row>
        </Container>
		);
	}
}
export default Config;