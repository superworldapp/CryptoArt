import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './loading.scss';

const Loading = props => {
	const {
		name,
		onClose,
	} = props

	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			'& > * + *': {
				marginLeft: theme.spacing(2),
			},
		},
	}));
	const classes = useStyles();

	if (props.type && props.type === 'error') {
		return (
			<div className='loading-modal error'>
				<p>{name}</p>
				<button onClick={onClose}>
					Try Again
				</button>
			</div>
		);
	}
	return (
		<div className='loading-modal'>
			<div className={classes.root}>
				<CircularProgress/>
			</div>
			<p>{name}</p>
		</div>
	);
};

export default Loading;
