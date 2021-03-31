import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import './CreateChipList.scss'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		listStyle: 'none',
		padding: theme.spacing(0.5),
		margin: 0,
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}));

const CreateChipList = ({checked, handleRemove, handleRemoveAll}) => {
	const classes = useStyles();
	return (
		<div className="chipWrapper">
			{checked.map((elem) => (
				<div key={elem.key}>
					<Chip
						label={elem.name}
						onDelete={() => handleRemove(elem)}
						className={classes.chip}
					/>
				</div>
			))}
			<div onClick={handleRemoveAll} className="chipClear">Clear All</div>
		</div>
	);
};

export default CreateChipList;
