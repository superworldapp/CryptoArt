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
				{this.props.children}
			</>
		)
	}
}

export default PageWrapper;
