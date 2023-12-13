import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Home';
import SnackOrBoozeApi from './Api';
import NavBar from './NavBar';
import { Route, Switch } from 'react-router-dom';
import MenuItem from './MenuItem';
import Menu from './Menu';
import AddItem from './AddItem';
import ErrorPage from './ErrorPage';
import DeleteItem from './DeleteItem';


function App () {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ snacks, setSnacks ] = useState([]);
	const [ drinks, setDrinks ] = useState([]);
	const [ error, setError ] = useState(null);

	useEffect(() => {
		async function getData () {
			try {
				console.log('Fetching snacks...');
				let snackData = await SnackOrBoozeApi.getSnacks();
				console.log('Snacks data:', snackData);

				console.log('Fetching drinks...');
				let drinkData = await SnackOrBoozeApi.getDrinks();
				console.log('Drinks data:', drinkData);

				if (Array.isArray(snackData.snacks)) {
					console.log('Setting snacks data:', snackData.snacks);
					setSnacks(snackData.snacks);
					setSnacksCount(snackData.snacks.length);
				}

				if (Array.isArray(drinkData.drinks)) {
					console.log('Setting drinks data:', drinkData.drinks);
					setDrinks(drinkData.drinks);
					setDrinksCount(drinkData.drinks.length);
				}
			} catch (e) {
				console.error('Error fetching data:', e);
				setError('Error fetching data. Please try again.');
			} finally {
				setIsLoading(false);
			}
		}

		getData();
	}, []);

	const [ snacksCount, setSnacksCount ] = useState(0);
	const [ drinksCount, setDrinksCount ] = useState(0);

	if (isLoading) {
		return <p>Loading &hellip;</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	const handleDelete = async (id, itemType) => {
		try {
		  console.log(`Deleting ${itemType} with ID: ${id}`);
		  await SnackOrBoozeApi.deleteItem(id);
	  
		  // Update the state to reflect the deletion
		  if (itemType === 'snacks') {
			setSnacks(snacks.filter((item) => item.id !== id));
			setSnacksCount(snacksCount - 1);
		  } else if (itemType === 'drinks') {
			setDrinks(drinks.filter((item) => item.id !== id));
			setDrinksCount(drinksCount - 1);
		  }
	  
		  console.log(`${itemType} deleted successfully.`);
		} catch (error) {
		  console.error(`Error deleting ${itemType}:`, error);
		  // Handle error, e.g., show a message to the user
		}
	  };
	  

	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<main>
					<Switch>
						<Route exact path="/">
							<Home snacksCount={snacksCount} drinksCount={drinksCount} />
						</Route>
						<Route exact path="/snacks">
							<Menu items={snacks} title="Snacks" onDelete={handleDelete} />
						</Route>
						<Route exact path="/drinks">
							<Menu items={drinks} title="Drinks" onDelete={handleDelete} />
						</Route>
						<Route path="/snacks/:id">
							<MenuItem items={snacks} cantFind="/snacks" />
						</Route>
						<Route path="/drinks/:id">
							<MenuItem items={drinks} cantFind="/drinks" />
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
						<Route exact path="/delete-item">
							<DeleteItem />
						</Route>
					</Switch>

					<Route path="*">
						<ErrorPage errorMessage="Page not found." />
					</Route>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
