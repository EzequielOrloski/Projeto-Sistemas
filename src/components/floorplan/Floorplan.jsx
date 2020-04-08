import React, { Component } from 'react';
import { Container, Row, Col, Button, Table, Modal, Form } from 'react-bootstrap';
import { FaPlusCircle } from "react-icons/fa";
import ConectaMQTT from '../conectaMQTT';
import Usuario from './Usuarios';
import { locate } from './position';
import Beacon from './Beacon';

class Floorplan extends Component{
	constructor(props){
		super(props);
    	this.handleClick = this.handleClick.bind(this);
    	this.handleHide  = this.handleHide.bind(this);
		this.state = {
            beacons: [
            	{nome: "BT-18", posicao:{x:487, y:283}},
            	{nome: "BT-19", posicao:{x:-94, y:354}},
            	{nome: "BT-20", posicao:{x:56, y:-107}}
            ],
            widthMeters: 8.5,
            modalShow : false,
            value: '',
            user : [],
            width: 200,
    	};
    }
    stationPosition = (p) => {
    	this.setState(state => {
    		const beacons = state.beacons.map((item) => {
    			if(item.nome === p.nome){
    				console.log(p.nome);
    				item.posicao['x'] = p.x;
    				item.posicao['y'] = p.y;
    				return item;
    			}else{
    				return item;
    			}
    		});
    		return{
    			beacons,
    		};
    	});
    };
  	handleClick(e){
  		this.setState({ modalShow : true });
  	}
  	handleHide(){
  		this.setState({modalShow: false});
 	}
    onChangeValue = event => {
    	this.setState({ value: event.target.value });
    };
    onAddItem = () => {
    	let b = {nome: this.state.value, posicao:{x:200, y:200}};
    	this.setState(state => {
    		const beacons = state.beacons.concat(b);
    		return {
    			beacons,
    			value: '',
    		};
    	});
    	this.handleHide();
    };
    busca = (b) => {
        for(let i = 0; i < this.state.user.length; i++){
            if(this.state.user[i].nome === b.nome){
                return true;
            }
        }
        return false;
    }
    atualizaPosicao = (beacon) => {
		let coords = locate(beacon, this.state.beacons, 86.5);
		let b = {nome: beacon.b[3].m, posicao:{x:coords.x, y:coords.y}};
        if(this.busca(b)){
            this.setState(state => {
                const user = state.user.map((item) => {
                    if(item.nome === b.nome){
                        item.posicao = b.posicao;
                        return item;
                    }else{
                        return item;
                    }
                });
                return{ user };
            });
        }else{
            this.setState(state => {
                const user = state.user.concat(b);
                return { user };
            });
        }  
    };
    componentDidMount(){
    	let width = document.getElementById("ladofloor").clientWidth;
    	this.setState({ width: width });
		new ConectaMQTT(this.atualizaPosicao.bind(this));
    }
	render(){
		return(
			<div className="floor" id="floor">
				<Container>
					<Row>
						<Col md={9} id="ladofloor">
                            <svg id="canva" viewBox={"0 0 " + this.state.width + " 500"} width={ this.state.width } height="500px">
								{ this.state.beacons.map((valor, x) => {
									return(
										<Beacon key={ x } nome={ valor.nome } x={ valor.posicao.x } y={ valor.posicao.y } setPosiotionCallback={this.stationPosition.bind(this)}/>
									)
      							})}
      							{ this.state.user.map((valor, x) => {
									return(
										<Usuario key={ x } nome={ valor.nome } x={ valor.posicao.x } y={ valor.posicao.y }/>
									)
      							})}
							</svg>
						</Col>
						<Col md={3} className="lado">
        					<Button onClick={this.handleClick}><FaPlusCircle/>Adicionar Beacon</Button>
							<Table striped bordered hover size="sm">
								<thead>
									<tr><th>Nome</th><th>Posicao</th></tr>
								</thead>
								<tbody>
									{ this.state.beacons.map((valor, x) => {
										return(
											<tr key={ x }>
												<td>{ valor.nome }</td>
      											<td>{ valor.posicao.x } x { valor.posicao.y }</td>
      										</tr>
      									)
      								})}
      							</tbody>
      						</Table>
                              <Table striped bordered hover size="sm">
                                <thead>
                                    <tr><th>Nome</th><th>Posicao</th></tr>
                                </thead>
                                <tbody>
                                    { this.state.user.map((valor, x) => {
                                        return(
                                            <tr key={ x }>
                                                <td>{ valor.nome }</td>
                                                  <td>{ valor.posicao.x } x { valor.posicao.y }</td>
                                              </tr>
                                          )
                                      })}
                                  </tbody>
                              </Table>
						</Col>
						<Modal show={ this.state.modalShow } onHide={ this.handleHide }>
							<Modal.Header closeButton>
								<Modal.Title>Adicionar Beacon</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form>
									<Form.Group>
										<Form.Label>Nome do Beacon</Form.Label>
										<Form.Control type="text" value={ this.state.value } onChange={ this.onChangeValue } placeholder="Nome do Beacon"/>
									</Form.Group>
								</Form>
							</Modal.Body>
							<Modal.Footer>
								<Button onClick={ this.handleHide }>Cancelar</Button>
								<Button variant="primary" onClick={this.onAddItem} disabled={!this.state.value}>Salvar</Button>
							</Modal.Footer>
						</Modal>
					</Row>
				</Container>					
			</div>
		);
	}
}
export default Floorplan;