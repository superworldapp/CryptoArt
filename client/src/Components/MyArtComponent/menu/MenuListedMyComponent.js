import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './MenuListedMyComponent.scss';

export default function
	MenuListedMyComponent() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className="menu-my-col">
			<Button classes={{ label: 'button_my_coll' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				New
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				classes={{ label: 'button_my_coll' }}
			>
				<MenuItem onClick={handleClose}>New</MenuItem>
			</Menu>
		</div>
	);
}
