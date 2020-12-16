import React, { useState, useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import RestaurantList from './RestaurantList';
import { useParams } from 'react-router-dom';

//same as the Homepage component, please see comment in Homepage.js
const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		border: '1px solid black',
		borderRadius: 10,
		textAlign: 'initial',
		margin: 'auto',
		maxWidth: 500
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit',
		paddingLeft: 30,
		width: '100%'
	},
	inputInput: {
		padding: 15
	},
	suggestions: {
		zIndex: 1,
		backgroundColor: '#fbfbfb',
		borderRadius: 10,
		margin: '0 auto',
		maxWidth: 500,
		position: 'absolute',
		left: 403,
		width: 376
	}
}));

export default function HomepageSearch() {
	let { id } = useParams();
	const classes = useStyles();

	const [search, setSearch] = useState(undefined);
	const [suggestions, setSuggestions] = useState([]);
	const [selected, setSelected] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (id) {
			setSelected(id);
		}
	}, [id]);

	async function fetchData() {
		setSuggestions([]);
		try {
			const { data } = await axios.post('http://localhost:3001/api/cities', {
				city: search
			});
			if (data.length > 0) {
				setSuggestions(data);
			} else {
				setError('No city was founded, please enter valid city name.');
			}
			console.log(data);
		} catch (error) {
			console.log(error.response.data);
			setError(error.response.data);
		}
	}

	const handleSelect = ({ id, name }) => () => {
		// setSelected(id);
		setSearch(name);
		setSuggestions([]);
	};

	const handleChange = (e) => {
		setSearch(e.target.value);
		setSelected('');
	};

	const handleClick = () => {
		setError('');
		fetchData();
		setSuggestions([]);
	};

	function ListItemLink(props) {
		return <ListItem button component='a' {...props} />;
	}

	const renderSuggestions = () =>
		suggestions.map((suggestion) => {
			const { id, name } = suggestion;
			return (
				<ListItemLink
					onClick={handleSelect(suggestion)}
					key={id}
					href={`/id/${id}`}
				>
					<ListItemText primary={name} />
				</ListItemLink>
			);
		});

	return (
		<>
			<Typography variant='h5' style={{ padding: '15px 100px' }}>
				This is a nearby restaurant finder tool, you can find top rated
				restaurants by the choice of your city by typing the city name in the
				search box and select it.
			</Typography>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					placeholder='Search your city for top rated restaurants…'
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput
					}}
					onChange={handleChange}
					value={search}
				/>
				<Button
					variant='contained'
					color='primary'
					style={{ position: 'absolute', right: 10, top: 6 }}
					onClick={handleClick}
				>
					Submit
				</Button>
			</div>
			<div className={classes.suggestions}>
				{error && (
					<div style={{ color: 'red', padding: '0 10px', margin: '20px 0' }}>
						{error}
					</div>
				)}

				{suggestions.length > 0 && (
					<List component='nav' aria-label='secondary mailbox folders'>
						{renderSuggestions()}
					</List>
				)}
			</div>
			<RestaurantList city={selected} />
		</>
	);
}

// export default function Homepage() {
// 	const classes = useStyles();

// 	const [search, setSearch] = useState(undefined);
// 	const [suggestions, setSuggestions] = useState([]);
// 	const [selected, setSelected] = useState('');

// 	useEffect(() => {
// 		async function fetchData() {
// 			try {
// 				const { data } = await axios.post('http://localhost:3000/api/cities', {
// 					city: search
// 				});
// 				setSuggestions(data);
// 				console.log(data);
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		}
// 		if (search) {
// 			fetchData();
// 		}
// 	}, [search]);

// 	const handleChange = (e) => {
// 		setSearch(e.target.value);
// 	};

// 	const handleSelect = ({ id, name }) => () => {
// 		setSelected(id);
// 		setSearch(name);
// 		setSuggestions([]);
// 	};

// 	function ListItemLink(props) {
// 		return <ListItem button component='a' {...props} />;
// 	}

// 	const renderSuggestions = () =>
// 		suggestions.map((suggestion) => {
// 			const { id, name } = suggestion;
// 			return (
// 				<ListItemLink onClick={handleSelect(suggestion)} key={id}>
// 					<ListItemText primary={name} />
// 				</ListItemLink>
// 			);
// 		});

// 	return (
// 		<>
// 			<Typography variant='h5' style={{ padding: '15px 100px' }}>
// 				This is a nearby restaurant finder tool, you can find top rated
// 				restaurants by the choice of your city by typing the city name in the
// 				search box and select it.
// 			</Typography>
// 			<div className={classes.search}>
// 				<div className={classes.searchIcon}>
// 					<SearchIcon />
// 				</div>
// 				<InputBase
// 					placeholder='Search your city for top rated restaurants…'
// 					classes={{
// 						root: classes.inputRoot,
// 						input: classes.inputInput
// 					}}
// 					onChange={handleChange}
// 					value={search}
// 				/>
// 				{/* <Button
// 					variant='contained'
// 					color='primary'
// 					style={{ position: 'absolute', right: 10, top: 6 }}
// 					onClick={handleClick}
// 				>
// 					Submit
// 				</Button> */}
// 			</div>
// 			<div className={classes.suggestions}>
// 				{suggestions.length > 0 && (
// 					<List component='nav' aria-label='secondary mailbox folders'>
// 						{renderSuggestions()}
// 					</List>
// 				)}
// 			</div>
// 			<RestaurantList city={selected} />
// 		</>
// 	);
// }
