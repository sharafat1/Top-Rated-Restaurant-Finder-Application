import React, { useState, useEffect } from 'react';
// import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import { useLocation } from 'react-router-dom';
import RoomIcon from '@material-ui/icons/Room';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";




const RestaurantLocation = ({ history }) => {
	//getting the name, lat and long params
	const params = new URLSearchParams(useLocation().search.substring(1));
	const name = params.get('name');
	const longitude = Number(params.get('long'));
	const latitude = Number(params.get('lat'));

	const [googleDetail, setGoogleDetail] = useState('');
	// react google map
	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '50vh',
		latitude: latitude,
		longitude: longitude,
		zoom: 14
	});


	// 	return (
	// 	<div className="mapFunction">
		  
	// 	</div>
	//   );
	
	

	//get async in useEffect hook, fetching from server to get the google Place api for restaurant details
	useEffect(() => {
		async function fetchGoogleReviews() {
			try {
				const { data } = await axios.post(
					'http://localhost:3001/api/restaurant/location',
					{
						latitude,
						longitude,
						name
					}
				);
				setGoogleDetail(data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchGoogleReviews();
	}, [latitude, longitude, name]);

	const MapWithAMarker = withScriptjs(withGoogleMap(props =>
		<GoogleMap
			defaultZoom={10}
			defaultCenter={{ lat: latitude, lng: longitude }}
		>
			<Marker
				position={{ lat: latitude, lng: longitude }}
			  />
		</GoogleMap>
	));

	return (
		<Grid
			container
			spacing={3}
			direction='column'
			justify='center'
			alignContent='center'
			wrap='nowrap'
		>
			<Grid item xs={12} sm={9}>
				<h4>
					The location of the restaurant is in the map marked with a red marker
				</h4>
				{/* <ReactMapGL
					{...viewport}
					mapStyle='mapbox://styles/mapbox/streets-v11'
					mapboxApiAccessToken='pk.eyJ1IjoiZ2lheWFubnk5MjYiLCJhIjoiY2tjZWRzc3Q0MDdiODJzcWdoZ3oxbXR3cyJ9.56tlkfE_5Gq82aukTLpKfQ'
					onViewportChange={setViewport}
					doubleClickZoom={false}
				>
					<Marker
						latitude={latitude}
						longitude={longitude}
						offsetLeft={-20}
						offsetTop={-10}
					>
						<RoomIcon color='secondary' fontSize='large' />
					</Marker>
					<div style={{ position: 'absolute', right: 0 }}>
						<NavigationControl />
					</div>
				</ReactMapGL> */}
				{/* <mapFunction lat={latitude} lng={longitude}/> */}
				{/* AIzaSyBndnZDpB7PGckzS2NNBJX3FVs65TH-uZk */}
				<MapWithAMarker
			googleMapURL="https://maps.googleapis.com/maps/api/js?key=&v=2.exp&libraries=geometry,drawing,places"
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: `350px`, width:`1265px` }} />}
			mapElement={<div style={{ height: `100%` }} />}
		  />
			</Grid>
			<Button
				variant='contained'
				color='primary'
				style={{ width: 230, position: 'absolute', right: 30, top: 75 }}
				onClick={() => history.goBack()}
			>
				Back to Search
			</Button>
			{googleDetail && (
				<Grid item xs={12} style={{ marginBottom: 50 }}>
					<br />
					Website:{' '}
					<a
						href={googleDetail.website}
						target='_blank'
						rel='noopener noreferrer'
					>
						{googleDetail.website}
					</a>
					<br />
					Average Rating: {googleDetail.rating}
					<br />
					Address: {googleDetail.formatted_address}
					<br />
					Phone Number: {googleDetail.formatted_phone_number}
					<br />
					Reviews: <br />
					{googleDetail.reviews.map((review, i) => {
						const { rating, text, author_name } = review;
						return (
							<div key={i} style={{ margin: 20, padding: '0 50px' }}>
								{author_name} wrote: {text}
								<br />
								Rating:{rating}
								<br />
								<br />
							</div>
						);
					})}
				</Grid>
			)}
		</Grid>
	);
};

export default withRouter(RestaurantLocation);
