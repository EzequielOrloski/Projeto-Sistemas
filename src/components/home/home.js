import React, { Component } from 'react';

class Home extends Component {
	render(){
		return(
			<div className="col-xl-3 col-md-6 mb-4">
				<div className="card h-100">
					<div className="card-body">
						<div className="row align-items-center">
							<div className="col mr-2">
								<div className="text-xs font-weight-bold text-uppercase mb-1">Earnings (Monthly)</div>
                   				<div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                  				<div className="mt-2 mb-0 text-muted text-xs">
                       				<span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                       				<span>Since last month</span>
                   				</div>
                   			</div>
                   			<div className="col-auto">
                   				<i className="fas fa-calendar fa-2x text-primary"></i>
                   			</div>
               			</div>
               		</div>
               	</div>
            </div>
		);
	}
}
export default Home;