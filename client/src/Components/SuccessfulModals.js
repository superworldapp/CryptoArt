import React, {Component} from 'react'
import Modal from "./Modal";
import {ModalBody, ModalHeader} from "reactstrap";
import checkmark from "../assets/svg/check-mark.svg";

export class SuccessfulModals extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const variation = this.props.variation;
		if (variation === 0) {
			return (
				<Modal
					isOpen={this.props.isOpen}
					onClose={this.props.onClose}
					toggle={this.props.toggle}
					className='modal-xl'
					header={(
						<></>
					)}
					body={(
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							font: 'Gibson',
							height: '300px',
						}}>
							<img
								style={{
									width: '80px',
									height: '80px',
									margin: '0 auto'
								}}
								src={checkmark}/>
							<p
								style={{
									textAlign: 'center',
									fontSize: '21px',
									lineHeight: '21px',
									fontWeight: '450',
									marginTop: '20px',
								}}
							>
								Hey @megan46233, your upload was successful!
							</p>
							<p style={{
								marginTop: '20px',
								textAlign: 'center',
								color: '#888888',
								fontSize: '15px',
								lineHeight: '15px',
							}}
							>
								You can view your recent uploaded file in “MyStore”
							</p>
							<button
								style={{
									marginTop: '34px',
								}}
								className='upload-more-btn'
								onClick={this.props.handleUploadMore}
							>
								UPLOAD MORE
							</button>
						</div>
					)}
				>
				</Modal>
			)
		} else if (variation === 1) {
			return (
				<Modal
					isOpen={this.props.isOpen}
					onClose={this.props.onClose}
					toggle={this.props.toggle}
					className='modal-xl'
					header={(
						<></>
					)}
					body={(
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							font: 'Gibson',
							height: '300px',
						}}>
							<img
								style={{
									width: '80px',
									height: '80px',
									margin: '0 auto'
								}}
								src={checkmark}/>
							<p
								style={{
									textAlign: 'center',
									fontSize: '21px',
									lineHeight: '21px',
									fontWeight: '450',
									marginTop: '20px',
								}}
							>
								Hey megan462, you have successfully minted new tokens!
							</p>
							<p style={{
								marginTop: '20px',
								textAlign: 'center',
								color: '#888888',
								fontSize: '15px',
								lineHeight: '15px',
							}}
							>
								You can view your newly minted tokens under the the Queue tab
							</p>
							<button
								style={{
									marginTop: '34px',
								}}
								className='upload-more-btn'
								onClick={this.props.handleUploadMore}
							>
								QUEUE TAB
							</button>
						</div>
					)}
				>
				</Modal>
			)
		} else if (variation === 2) {
			return (
				<Modal
					isOpen={this.props.isOpen}
					onClose={this.props.onClose}
					toggle={this.props.toggle}
					className='modal-xl'
					header={(
						<></>
					)}
					body={(
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							font: 'Gibson',
							height: '300px',
						}}>
							<img
								style={{
									width: '80px',
									height: '80px',
									margin: '0 auto'
								}}
								src={checkmark}/>
							<p
								style={{
									textAlign: 'center',
									fontSize: '21px',
									lineHeight: '21px',
									fontWeight: '450',
									marginTop: '20px',
								}}
							>
								Hey megan462, your NFT is successfully listed for Buy Now in the marketplace!
							</p>
							<p style={{
								marginTop: '20px',
								textAlign: 'center',
								color: '#888888',
								fontSize: '15px',
								lineHeight: '15px',
							}}
							>
								You can view your listings in the Active tab
							</p>
							<button
								style={{
									marginTop: '34px',
								}}
								className='upload-more-btn'
								onClick={this.props.handleUploadMore}
							>
								ACTIVE TAB
							</button>
						</div>
					)}
				>
				</Modal>
			)
		} else if (variation === 3) {
			return (
				<Modal
					isOpen={this.props.isOpen}
					onClose={this.props.onClose}
					toggle={this.props.toggle}
					className='modal-xl'
					header={(
						<></>
					)}
					body={(
						<div style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							font: 'Gibson',
							height: '300px',
						}}>
							<img
								style={{
									width: '80px',
									height: '80px',
									margin: '0 auto'
								}}
								src={checkmark}/>
							<p
								style={{
									textAlign: 'center',
									fontSize: '21px',
									lineHeight: '21px',
									fontWeight: '450',
									marginTop: '20px',
								}}
							>
								Hey megan462, your NFT is successfully edit for Buy Now in the marketplace!
							</p>
							<p style={{
								marginTop: '20px',
								textAlign: 'center',
								color: '#888888',
								fontSize: '15px',
								lineHeight: '15px',
							}}
							>
								You can view your editing in the Active tab
							</p>
							<button
								style={{
									marginTop: '34px',
								}}
								className='upload-more-btn'
								onClick={this.props.handleUploadMore}
							>
								ACTIVE TAB
							</button>
						</div>
					)}
				>
				</Modal>
			)
		}
	}
}

export default SuccessfulModals;
