import React, { Component } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa"; 

class Usuario extends Component{
    render(){
        return(
        	<svg className="users" x={this.props.x} y={this.props.y}>
        		<FaMapMarkerAlt/><text x="15px" y="15px">{ this.props.nome }</text>
        	</svg>);
    }
}
export default Usuario;