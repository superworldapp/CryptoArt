import React, {Component} from 'react'
import Modal from "../Modal";
import checkmark from "../../assets/svg/checkmark.svg";
import './successModal.scss'
import SocialShare from "../MyProfile/SocialShare";

export class SuccessfulModals extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const variation = this.props.variation;

		const userName = localStorage.getItem('userName');
		if (variation === 0) {
			return (
				<Modal
					isOpen={this.props.isOpen}
					onClose={this.props.onClose}
					toggle={this.props.toggle}
					className='modal-xl'
					header={(
						<div className="modal-success-wrapper" >
							<img className="modal-success-img" src={checkmark}/>
							<p className="modal-success-head">
								Hey {userName || ' '}, your upload was successful!
							</p>
							<p className="modal-success-desc">
								You can view your recent upload in “MyStore”
							</p>
							<button
								className='upload-more-btn modal-success-btn'
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
						<div className="modal-success-wrapper" >
							<img className="modal-success-img" src={checkmark}/>
							<p className="modal-success-head">
								Hey {userName || ' '}, you have successfully minted new tokens!
							</p>
							<p className="modal-success-desc">
								You can view your newly minted tokens under the the Queue tab
							</p>
							<button
								className='upload-more-btn modal-success-btn'
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
						<div className="modal-success-wrapper" >
							<img className="modal-success-img" src={checkmark}/>
							<p className="modal-success-head">
								Hey {userName || ' '}, your NFT is successfully listed for Buy Now in the marketplace!
							</p>
							<p className="modal-success-desc">
								You can view your listings in the Active tab
							</p>
							<button
								className='upload-more-btn modal-success-btn'
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
						<div className="modal-success-wrapper" >
							<img className="modal-success-img" src={checkmark}/>
							<p className="modal-success-head">
								Hey {userName || ' '}, your NFT is successfully listed for Auction in the marketplace!
							</p>
							<p className="modal-success-desc">
								You can view your listings in the Active tab
							</p>
							<button
								className='upload-more-btn modal-success-btn'
								onClick={this.props.handleUploadMore}
							>
								ACTIVE TAB
							</button>
						</div>
					)}
				>
				</Modal>
			)
		} else if (variation === 4) {
			return (
				<Modal
					isOpen={this.props.isOpen}
					onClose={this.props.onClose}
					toggle={this.props.toggle}
					className='modal-xl'
					header={(
						<div className="modal-success-wrapper" >
							<img className="modal-success-img" src={checkmark}/>
							<p className="modal-success-head">
								Hey {userName || ' '}, your NFT listing has been sold!
							</p>
							<p className="modal-success-desc">
								Go to the Active tab to sell more NFTs
							</p>
							<button
								className='upload-more-btn modal-success-btn'
								onClick={this.props.handleUploadMore}
							>
								ACTIVE TAB
							</button>
						</div>
					)}
				>
				</Modal>
			)
		} else if (variation === 5) {
			return (
				<Modal
					isOpen={this.props.isOpen}
					onClose={this.props.onClose}
					toggle={this.props.toggle}
					className='modal-xl'
					header={(
						<div className="modal-success-wrapper" >
							<img className="modal-success-img imgPurchase" src={checkmark}/>
							<p className="modal-success-head">
								Congratulations {userName || ' '}, you have successfully made the purchase!
							</p>
							<p className="modal-success-desc descPurchase">
								You can view it in “MyCollection”
							</p>
							<p className="modal-success-desc descPurchase">
								Tell people about you new purchase!
							</p>
							<div className="modal-success-social">
								<SocialShare />
							</div>
							<button
								className='upload-more-btn btnPurchase'
								onClick={this.props.handleUploadMore}
							>
								MyCollection
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
