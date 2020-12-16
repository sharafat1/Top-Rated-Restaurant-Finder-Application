import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const RestaurantList = ({ city }) => {
	const [restaurants, setRestaurants] = useState([]);
	const [error, setError] = useState('');

	//if prop city exists, it will fetch the api from the server to get the top rated restaurants.
	useEffect(() => {
		if (city) {
			async function fetchRestaurants() {
				try {
					const { data } = await axios.post(
						'http://localhost:3001/api/restaurants',
						{
							city
						}
					);
					setRestaurants(data);
				} catch (error) {
					console.log(error.response.data);
					setError(error.response.data);
				}
			}
			fetchRestaurants();
		}
	}, [city]);

	if (restaurants.length > 0) {
		return (
			<Grid
				spacing={3}
				container
				direction='row'
				justify='center'
				alignItems='center'
				style={{ margin: -10, padding: 20, marginBottom: 50 }}
			>
				<Grid item xs={12}>
					<Typography variant='h5'>
						Here is the result of top rated restaurants you searched for...
					</Typography>
				</Grid>

				{restaurants.map((restaurant) => {
					const {
						id,
						name,
						location,
						cuisines,
						timings,
						price_range,
						user_rating,
						thumb
					} = restaurant;
					return (
						<Grid item xs={12} sm={4} key={id}>
							<Paper>
								<Link
									to={`/restaurant?name=${name}&lat=${location.latitude}&long=${location.longitude}`}
									style={{ textDecoration: 'none', color: 'black' }}
								>
									{thumb ? (
										<img src={thumb} alt='thumb' />
									) : (
										<img
											src='https://www.freeiconspng.com/uploads/no-image-icon-21.png'
											width='200'
											alt='Icon Free No Png'
										/>
									)}
									<br />
									Name: {name}
									<br />
									Cuisines: {cuisines}
									<br />
									Opening hours: {timings}
									<br />
									Price: {price_range}
									<br />
									Rating:{user_rating.aggregate_rating}
									<br />
									Address: {location.address}
									<br />
								</Link>
							</Paper>
						</Grid>
					);
				})}
			</Grid>
		);
	} else if (error) {
		return <div>{error}</div>;
	} else {
		return null;
	}
};

export default RestaurantList;
