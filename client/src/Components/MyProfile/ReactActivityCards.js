import React, {useState} from 'react';

import eye from '../../images/svg/eyeIcon.svg';
import eyeOff from '../../images/svg/eyeOff.svg';
import './RecentActivityCards.scss';

const RecentActivityCards = (props) => {
	const [close, setClose] = useState(true);
	const handleSkip = () => {
		setClose(!close);
	}

	return (
		<div className={close ? "recent-content" : "recent-content blur"}>
			<img
				className="recent-content-avatar"
				src={props.avatar}
				alt="ava"
			/>
			<div className="recent-content-text">
				<span className="recent-content-info">
					{props.text}
				</span>
				<span className="recent-content-time">
					{props.time}
				</span>
			</div>
			<img
				className="recent-content-card"
				src={props.card}
				alt="card"
			/>
			<img
				className="recent-content-eye"
				src={close ? eye : eyeOff}
				alt="eye"
				onClick={handleSkip}
			/>
		</div>
	)
}

export default RecentActivityCards;