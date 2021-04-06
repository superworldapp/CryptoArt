import React, {Component} from 'react'
import Header from "../../Components/HeaderComponent";

class PageWrapper extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<Header
					contract={this.props.contract}
					accounts={this.props.accounts}
					balance={this.props.balance}
					web3={this.props.web3}
				/>
				<div
					style={{
						minHeight: "calc(100vh - (95px + 700px))",
					}}>
					{this.props.children}
				</div>
			</>
		)
	}
}

export default PageWrapper;
