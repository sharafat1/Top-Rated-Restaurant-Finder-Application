import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export default function Homepage() {
	return (
		<div>
			<AppBar position='static'>
				<Toolbar>
					<Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
						<Typography variant='h4' noWrap>
							Nearby Restaurant Finder
						</Typography>
					</Link>
				</Toolbar>
			</AppBar>
		</div>
	);
}
