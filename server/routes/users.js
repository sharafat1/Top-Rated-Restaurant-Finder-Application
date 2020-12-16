var express = require('express');
var router = express.Router();
const axios = require('axios');

axios.defaults.headers.common['user-key'] = 'ede30e3af1e4f78584303c7031241788';
const googleApiKey = 'AIzaSyBndnZDpB7PGckzS2NNBJX3FVs65TH-uZk';

/* POST cities listing. */
router.post('/cities', async function (req, res, next) {
	const city = req.body.city;
	try {
		const { data } = await axios.get(
			`https://developers.zomato.com/api/v2.1/cities?q=${city}&count=10`
		);
		res.json(data.location_suggestions);
		//console.log(data.location_suggestions);
	} catch (error) {
		error.response.data.code === 440
			? res.status(440).json(error.response.data.message)
			: res.status(500).json(error.response.data.message);
		// next(error);
	}
});

/* POST top rated restaurants in a selected city listing. */
router.post('/restaurants', async function (req, res, next) {
	const city = req.body.city;
	console.log(city);
	try {
		const { data } = await axios.get(
			`https://developers.zomato.com/api/v2.1/search?entity_id=${city}&entity_type=city&count=20&sort=rating&order=desc`
		);

		const topRatedListArr = data.restaurants.map(({ restaurant }) => {
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
			return {
				id,
				name,
				location,
				cuisines,
				timings,
				price_range,
				user_rating,
				thumb
			};
		});
		//console.log(topRatedListArr);
		res.json(topRatedListArr);
	} catch (error) {
		error.response.data.code === 440
			? res.status(440).json(error.response.data.message)
			: res.status(500).json(error.response.data.message);
	}
});

// get google map
router.post('/restaurant/location', async function (req, res, next) {
	const { longitude, latitude, name } = req.body;
	// console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: "+ longitude + "   "+latitude + "    " + name);
	try {
		const { data } = await axios.get(
			// `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=20&type=restaurant&keyword=${name}&key=${googleApiKey}`
			`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=10&name=${name}&key=${googleApiKey}`
		);
		// console.log("this is data -----------------"+data);
		const placeId = data.results[0].place_id;
		// console.log("place id ----------------" + placeId)
		const {
			data: { result }
		} = await axios.get(
			`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleApiKey}`
		);
		// console.log("Results : " + result);
		const {
			website,
			rating,
			reviews,
			place_id,
			icon,
			formatted_address,
			formatted_phone_number
		} = result;
		res.json({
			website,
			rating,
			reviews,
			place_id,
			icon,
			formatted_address,
			formatted_phone_number
		})
	} catch (error) {
		// console.log("error is hereereeeeeeeeeeeeeeeeee: "+error);
		error.response.data.code === 440
			? res.status(440).json(error.response.data.message)
			: res.status(500).json(error.response.data.message);
	}
});

module.exports = router;
