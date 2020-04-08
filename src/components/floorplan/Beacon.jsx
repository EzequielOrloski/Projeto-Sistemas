import React, { Component } from 'react';
import { ReactComponent as ReactLogo } from "../../img/blue.svg";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
    0%   { transform: scale(0); opacity: 1; transform-origin: center; }
    100% { transform: scale(1); opacity: 0; transform-origin: center; }
`;
const StyledLogo = styled(ReactLogo)`
    display: inline-block;
    margin: auto;
    .circle { animation: ${pulse} infinite 3s linear; }
`;

class Beacon extends Component{
    state = {
        nome: this.props.nome,
        x   : this.props.x,
        y   : this.props.y,
    };
    handleMouseDown = (e) => {
        this.coords = {
            x: e.pageX,
            y: e.pageY
        };
        document.addEventListener('mousemove', this.handleMouseMove);
    };
    handleMouseUp = () => {
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.coords = {};
        this.props.setPosiotionCallback({x: this.state.x, y: this.state.y, nome: this.state.nome});
    };
    handleMouseMove = (e) => {
        const xDiff = this.coords.x - e.pageX;
        const yDiff = this.coords.y - e.pageY;
        this.coords.x = e.pageX;
        this.coords.y = e.pageY;
        this.setState({
            x: this.state.x - xDiff,
            y: this.state.y - yDiff
        });
    };
    render(){
        const {x, y, nome} = this.state;
        return( <svg width="15em" height="15em" x={x} y={y} onMouseDown={this.handleMouseDown}
                 onMouseUp={this.handleMouseUp}>
                <StyledLogo/>
                <text x="140px" y="130px">{ nome }</text>
            </svg>
        );
    }
}
export default Beacon;