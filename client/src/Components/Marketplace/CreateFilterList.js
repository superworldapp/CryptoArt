import React from 'react';

import './CreateFilterList.scss'
import {Checkbox} from "@material-ui/core";

const CreateFilterList = ({list}) => {

	return (
		<>
			{list.map(({name, lists}) => (
				<div className="filter_wrapper">
					<p className="filter_head">{name}</p>
					{lists.map(({name}, index) => (
						<div className="form-check">
								<label className="form-check-label" htmlFor={index+name}>
									<Checkbox
										defaultChecked
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
	)
}

export default CreateFilterList;
