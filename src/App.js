import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Home';
import SnackOrBoozeApi from './Api';
import NavBar from './NavBar';
import { Route, Switch } from 'react-router-dom';
// import Menu from './FoodMenu';
// import Snack from './FoodItem';
import Item from './Item';
import Menu from './Menu';
import AddItem from './AddItem';
import ErrorPage from './ErrorPage';

function App () {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ snacks, setSnacks ] = useState([]);
	const [ drinks, setDrinks ] = useState([]);

	useEffect(() => {
		async function getData () {
			let snackData = await SnackOrBoozeApi.getSnacks();
			let drinkData = await SnackOrBoozeApi.getDrinks();
			setSnacks(snackData);
			setDrinks(drinkData);

			setSnacksCount(snackData.length);
			setDrinksCount(drinkData.length);

			setIsLoading(false);
		}
		getData();
	}, []);

	const [ snacksCount, setSnacksCount ] = useState(0);
	const [ drinksCount, setDrinksCount ] = useState(0);

	if (isLoading) {
		return <p>Loading &hellip;</p>;
	}

	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<main>
					<Switch>
						{/* <Route exact path="/">
              <Home snacks={snacks} />
            </Route>
            <Route exact path="/snacks">
              <Menu snacks={snacks} title="Snacks" />
            </Route>
            <Route path="/snacks/:id">
              <Snack items={snacks} cantFind="/snacks" />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route> */}
						<Route exact path="/">
							<Home snacksCount={snacksCount} drinksCount={drinksCount} />
						</Route>
						<Route exact path="/snacks">
							<Menu items={snacks} title="Snacks" />
						</Route>
						<Route path="/snacks/:id">
							<Item items={snacks} cantFind="/snacks" />
						</Route>
						<Route exact path="/drinks">
							<Menu items={drinks} title="Drinks" />
						</Route>
						<Route path="/drinks/:id">
							<Item items={drinks} cantFind="/drinks" />
						</Route>
						<Route exact path="/add-item">
							<AddItem />
						</Route>
						<Route path="/error">
          <ErrorPage errorMessage="An error occurred. Please try again later." />
        </Route>
        
        <Route path="*">
          <ErrorPage errorMessage="Page not found." />
        </Route>
					</Switch>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
