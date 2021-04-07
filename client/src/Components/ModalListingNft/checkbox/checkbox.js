import React from 'react';
import './style.scss';

const Checkbox = (props) => {
	// console.log('========>props', props);
	return (
		<span className="checkbox-custom">
			<input
				id={props.id}
				{...props}
			/>
			<label htmlFor={props.id}/>
		</span>
	)
}

export default Checkbox;
