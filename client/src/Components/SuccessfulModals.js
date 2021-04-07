import React, {Component} from 'react'

export class successfulModals extends Component {


	render() {
		return (
			<div>

				{/* AFTER UPLOADING SUCCESS MODAL */}
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
							Hey user, your upload was successful!
						</p>
						<p style={{textAlign: 'center', color: 'gray', fontSize: '12px'}}>
							You can view your recent uploaded file in “MyStore”
						</p>
						<button className='upload-more-btn'>
							UPLOAD MORE
						</button>
					</ModalBody>
				</Modal>
				{/*  */}

				{/* AFTER MINTING SUCCESS MODAL */}
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
							Hey user, you have successfully minted new tokens!
						</p>
						<p style={{textAlign: 'center', color: 'gray', fontSize: '12px'}}>
							You can view your newly minted tokens under the Queue tab
						</p>
						<button className='upload-more-btn'>
							QUEUE TAB
						</button>
					</ModalBody>
				</Modal>
				{/*  */}

				{/* AFTER Listing for Buy Now MODAL */}
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
				{/*  */}

				{/* AFTER Listing for Auction MODAL */}
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
				{/*  */}

				{/* Purchase Made MODAL */}
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
							Congratulations user, you have successfully made the purchase!
						</p>
						<p style={{textAlign: 'center', color: 'gray', fontSize: '12px'}}>
							You can view it in "MyCollection"
						</p>
						<button className='upload-more-btn'>
							MyCollection
						</button>
					</ModalBody>
				</Modal>
				{/*  */}

			</div>
		)
	}
}

export default successfulModals
