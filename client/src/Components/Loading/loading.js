import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './loading.scss';

const Loading = props => {
	const {
		name,
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
