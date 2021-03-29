import React, { useState } from 'react';
import { Checkbox } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import './CreateFilterList.scss'

const CustomCheckbox = withStyles({
	root: {
		color: '#888888',
		'&$checked': {
			color: '#888888',
		},
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CreateFilterList = ({ list }) => {
	const [state, setState] = useState({
		onAuction: false,
		buyNow: false,
		makeOffer: false,
		text: false,
		text1: false,
		text2: false,
		text3: false,
		images: false,
		gif: false,
		video: false,
	});

	const handleChange = (event) => {
		const { name, checked } = event.target;
		setState({ ...state, [name]: checked });
	};

	return (
		<>
			{list.map(({name, lists}) => (
				<div className="filter_wrapper">
					<p className="filter_head">{name}</p>
					{lists.map(({name, id}, index) => (
						<div className="form-check">
								<label className="form-check-label" htmlFor={index+name}>
									<CustomCheckbox
										checked={state[id]}
										name={name}
										onChange={handleChange}
										color="primary"
										inputProps={{ 'aria-label': 'secondary checkbox' }}
									/>
									{name}
								</label>
						</div>
					))}
				</div>
			))}
		</>
	);
};

export default CreateFilterList;
