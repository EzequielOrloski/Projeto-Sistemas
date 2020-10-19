import React, { Component } from 'react';

class Footer extends Component {
	render(){
		return(
            <footer className="sticky-footer bg-white" style={{'botton':'0px'}}>
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>copyright &copy; { new Date().getFullYear() } - desenvolvido por  
                            <b><a href="https://github.com/EzequielOrloski" target="_blank">&nbsp;Ezequiel</a></b> e
                            <b><a href="https://github.com/EzequielOrloski" target="_blank">&nbsp;Wellington</a></b>
                        </span>
                    </div>
                </div>
            </footer>
		);
	}
}
export default Footer;