import React from 'react';
import {Checkbox} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';

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

const CreateFilterList = ({list, handleCheck, checked}) => (
	<>
		{list.map(({name, lists}) => (
			<div className="filter_wrapper">
				<p className="filter_head">{name}</p>
				{lists.map((elem) => (
					<div className="form-check">
						<label className="form-check-label" htmlFor={elem.key + name}>
							<CustomCheckbox
								checked={checked.filter(el => el.key === elem.key && el.name === elem.name).length > 0}
								name={elem.name}
								onChange={() => handleCheck(elem)}
								color="primary"
								inputProps={{'aria-label': 'secondary checkbox'}}
							/>
							{elem.name}
						</label>
					</div>
				))}
			</div>
		))}
	</>
);

export default CreateFilterList;
