import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import HomepageSearch from './components/HomepageSearch';
import Header from './components/Header';
import RestaurantLocation from './components/RestaurantLocation';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<Switch>
					<Route path='/restaurant' component={RestaurantLocation} />
					<Route path='/id/:id' component={HomepageSearch} />
					<Route path='/' component={Homepage} />
				</Switch>
				<footer
					style={{
						position: 'fixed',
						bottom: 0,
						backgroundColor: '#3f50b5',
						width: '100%',
						height: 60,
						color: 'white',
						boxShadow: '7px -5px 5px 0px rgba(184,182,184,1)'
					}}
				>
					<h3 style={{ color: 'white' }}>Assignment Application</h3>
				</footer>
			</BrowserRouter>
		</div>
	);
}

export default App;
