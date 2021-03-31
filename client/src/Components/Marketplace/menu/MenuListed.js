import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './MenuListed.scss';

export default function SimpleMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button classes={{ label: 'button_mu' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				Recently Listed
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				classes={{ label: 'button_mu' }}
			>
				<MenuItem onClick={handleClose}>Recently Listed</MenuItem>
				<MenuItem onClick={handleClose}>Ending Soon</MenuItem>
				<MenuItem onClick={handleClose}>Lowest Price</MenuItem>
				<MenuItem onClick={handleClose}>Highest Price</MenuItem>
				<MenuItem onClick={handleClose}>Oldest</MenuItem>
			</Menu>
		</div>
	);
}
