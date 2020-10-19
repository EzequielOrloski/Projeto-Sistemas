import { Container, Row, Col, Button, Table, Modal, Form } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import React, { Component } from 'react';
import Beacon from './Beacon';
import axios from 'axios';

export default class EditPlanner extends Component {
    constructor(props){
        super(props);
        this.onSubmit     = this.onSubmit.bind(this);
        this.handleClick  = this.handleClick.bind(this);
        this.handleHide   = this.handleHide.bind(this);
        this.deleteBeacon = this.deleteBeacon.bind(this)

        this.state = {
            id: '',
            name: '',
            beacons: [],
            modalShow : false,
            width: 200,
            value: 'BT',
        }
    }
    deleteBeacon(id){
        axios.delete('http://localhost:5000/beacons/'+id).then(r => { console.log(r.data)});
        this.setState({ beacons: this.state.beacons.filter(el => el._id !== id) })
    }

    handleClick(e){
        this.setState({ modalShow : true });
    }
    handleHide(){
        this.setState({modalShow: false});
    }
    componentDidMount(){
        let width = document.getElementById("ladofloor").clientWidth;
        this.setState({ width: width, id:this.props.match.params.id });
        axios.get('http://localhost:5000/planner/' + this.props.match.params.id).then(response => {
           this.setState({ beacons: response.data['planner'].beacons });
        }).catch((error) => {
            console.log(error);
        })
    }
    onSubmit(e){
        e.preventDefault();
        const beacons = { beacons: this.state.beacons };
        axios.put('http://localhost:5000/planner/' + this.props.match.params.id, beacons)
        .then(res => console.log(res.data));
        window.location = '/selectBeacons';
    }

    onAddItem = () => {
        let b = {name: this.state.value, x:200, y:200};
        this.setState(state => {
            const beacons = state.beacons.concat(b);
            return { beacons, value: 'BT', };
        });
        this.handleHide();
    };
    onChangeValue = event => {
        this.setState({ value: event.target.value });
    };
    stationPosition = (p) => {
        this.setState(s => {
            const beacons = s.beacons.map((item) => {
                if(item.name === p.nome){
                    item['x'] = p.x;
                    item['y'] = p.y;
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
    render(){
        return(
            <Container>
                <Row>
                    <Col md={9} xs={9} id="ladofloor">
                        <svg  id="canva" viewBox={"0 0 " + this.state.width + " 500"} width={ this.state.width } height="500px">
                            { this.state.beacons.map((valor, x) => {
                                return(
                                    <Beacon key={ valor._id } nome={ valor.name } x={ valor.x } y={ valor.y } setPosiotionCallback={this.stationPosition.bind(this)}/>
                                )
                            })}
                        </svg>
                    </Col>
                    <Col md={3} className="lado">
                        <Button onClick={this.handleClick}><FaPlusCircle/>Adicionar Beacon</Button>
                        <Table striped bordered hover size="sm">
                            <thead><tr><th>Nome</th><th>Posicao</th><th>Ação</th></tr></thead>
                            <tbody>
                                { this.state.beacons.map((valor, x) => {
                                    return(
                                        <tr key={ valor._id }>
                                            <td>{ valor.name }</td>
                                            <td>{ valor.x } x { valor.y }</td>
                                            <td><button className="botao" onClick={() => { this.deleteBeacon(valor._id) }}><MdDeleteForever/></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <form onSubmit={ this.onSubmit }>
                            <div className="form-group">
                                <input type="submit" value="Salvar" className="btn btn-success"/>
                            </div>
                        </form>
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
        )
    }
}