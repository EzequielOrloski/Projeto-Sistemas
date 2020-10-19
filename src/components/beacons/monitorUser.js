import { Container, Row, Col, Table } from 'react-bootstrap';
import React, { Component } from 'react';
import ConectaMQTT from '../conectaMQTT';
import { locate } from './position';
import Usuario from './Usuarios';
import Beacons from './Beacons';
import axios from 'axios';

export default class MonitorUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            beacons: [],
            widthMeters: 8.5,
            user : [],
            width: 200,
        };
    }
    componentDidMount(){
        let width = document.getElementById("ladofloor").clientWidth;
        this.setState({ width: width, id:this.props.match.params.id });
        axios.get('http://localhost:5000/planner/' + this.props.match.params.id).then(response => {
           this.setState({ beacons: response.data['planner'].beacons });
        }).catch((error) => {
            console.log(error);
        })
        new ConectaMQTT(this.atualizaPosicao.bind(this));
    }
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
    render(){
        return(
            <Container>
                <Row>
                    <Col md={9} xs={9} id="ladofloor">
                        <svg id="canva" viewBox={"0 0 " + this.state.width + " 500"} width={ this.state.width } height="500px">
                            { this.state.beacons.map((valor, x) => {
                                return(
                                    <Beacons key={ valor._id } nome={ valor.name } x={ valor.x } y={ valor.y }/>
                                )
                            })}
                            { this.state.user.map((valor, x) => {
                                return(
                                    <Usuario key={ x } nome={ valor.nome } x={ valor.posicao.x } y={ valor.posicao.y }/>
                                )
                            })}
                        </svg>
                    </Col>
                    <Col>
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
                </Row>
            </Container>
        )
    }
}