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
		console.log('=====>123', this.props);
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
							height: '20rem',
							paddingBottom: '5rem',
						}}>
							<img src={checkmark}/>
							<p
								style={{
									textAlign: 'center',
									fontSize: '1.25rem',
									fontWeight: '450',
									marginTop: '1rem',
								}}
							>
								Hey @megan46233, your upload was successful!
							</p>
							<p style={{textAlign: 'center', color: 'gray', fontSize: '12px'}}>
								You can view your recent uploaded file in “MyStore”
							</p>
							<button className='upload-more-btn' onClick={this.props.handleUploadMore}>
								UPLOAD MORE
							</button>
						</div>
					)}
				>
				</Modal>
			)
		}
		else if (variation === 1) {
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
							height: '20rem',
							paddingBottom: '5rem',
						}}>
							<img src={checkmark}/>
							<p
								style={{
									textAlign: 'center',
									fontSize: '1.25rem',
									fontWeight: '450',
									marginTop: '1rem',
								}}
							>
								Hey megan462, you have successfully minted new tokens!
							</p>
							<p style={{textAlign: 'center', color: 'gray', fontSize: '12px'}}>
								You can view your newly minted tokens under the the Queue tab
							</p>
							<button className='upload-more-btn' onClick={this.props.handleUploadMore}>
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
					isOpen={this.state.uploadSuccess}
					onClosed={this.refreshMyArt}
					toggle={this.toggleModal2}
					className='modal-xl'
				>
					<ModalHeader toggle={this.toggleModal2}>
						<div></div>
					</ModalHeader>
					<ModalBody
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							font: 'Gibson',
							height: '20rem',
							paddingBottom: '5rem',
						}}
					>
						<img src={checkmark}/>
						<p
							style={{
								textAlign: 'center',
								fontSize: '1.25rem',
								fontWeight: '450',
								marginTop: '1rem',
							}}
						>
							Hey user, your NFT is successfully listed for Buy Now in the marketplace!
						</p>
						<p style={{textAlign: 'center', color: 'gray', fontSize: '12px'}}>
							You can view your listings in the Active Tab
						</p>
						<button className='upload-more-btn'>
							ACTIVE TAB
						</button>
					</ModalBody>
				</Modal>
			)
		} else if (variation === 3) {
			return (
				<Modal
					isOpen={this.state.uploadSuccess}
					onClosed={this.refreshMyArt}
					toggle={this.toggleModal2}
					className='modal-xl'
				>
					<ModalHeader toggle={this.toggleModal2}>
						<div></div>
					</ModalHeader>
					<ModalBody
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							font: 'Gibson',
							height: '20rem',
							paddingBottom: '5rem',
						}}
					>
						<img src={checkmark}/>
						<p
							style={{
								textAlign: 'center',
								fontSize: '1.25rem',
								fontWeight: '450',
								marginTop: '1rem',
							}}
						>
							Hey user, your NFT is successfully listed for Auction in the marketplace!
						</p>
						<p style={{textAlign: 'center', color: 'gray', fontSize: '12px'}}>
							You can view your listings in the Active Tab
						</p>
						<button className='upload-more-btn'>
							ACTIVE TAB
						</button>
					</ModalBody>
				</Modal>
			)
		}

		{/* Purchase Made MODAL */
		}
		{/*<Modal*/
		}
		{/*	isOpen={this.state.uploadSuccess}*/
		}
		{/*	onClosed={this.refreshMyArt}*/
		}
		{/*	toggle={this.toggleModal2}*/
		}
		{/*	className='modal-xl'*/
		}
		{/*>*/
		}
		{/*	<ModalHeader toggle={this.toggleModal2}>*/
		}
		{/*		<div></div>*/
		}
		{/*	</ModalHeader>*/
		}
		{/*	<ModalBody*/
		}
		{/*		style={{*/
		}
		{/*			display: 'flex',*/
		}
		{/*			flexDirection: 'column',*/
		}
		{/*			justifyContent: 'center',*/
		}
		{/*			font: 'Gibson',*/
		}
		{/*			height: '20rem',*/
		}
		{/*			paddingBottom: '5rem',*/
		}
		{/*		}}*/
		}
		{/*	>*/
		}
		{/*		<img src={checkmark}/>*/
		}
		{/*		<p*/
		}
		{/*			style={{*/
		}
		{/*				textAlign: 'center',*/
		}
		{/*				fontSize: '1.25rem',*/
		}
		{/*				fontWeight: '450',*/
		}
		{/*				marginTop: '1rem',*/
		}
		{/*			}}*/
		}
		{/*		>*/
		}
		{/*			Congratulations user, you have successfully made the purchase!*/
		}
		{/*		</p>*/
		}
		{/*		<p style={{textAlign: 'center', color: 'gray', fontSize: '12px'}}>*/
		}
		{/*			You can view it in "MyCollection"*/
		}
		{/*		</p>*/
		}
		{/*		<button className='upload-more-btn'>*/
		}
		{/*			MyCollection*/
		}
		{/*		</button>*/
		}
		{/*	</ModalBody>*/
		}
		{/*</Modal>*/
		}
		{/*  */
		}
	}
}

export default SuccessfulModals;
