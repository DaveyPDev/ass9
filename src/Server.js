const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
	origin               : 'http://localhost:3000',
	methods              : 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials          : true,
	optionsSuccessStatus : 204,
	allowedHeaders       : 'Content-Type,Authorization'
};


app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a route for the root path
app.get('/', (req, res) => {
	res.send('Welcome to the Express.js server!');
});

// Define a route for adding an item
app.post('/add-item', (req, res) => {
	console.log('Received POST request at /add-item');
	const itemData = req.body;
	console.log('Item data:', itemData);

	// Generate an ID for the item
	itemData.id = itemData.name.toLowerCase().replace(/ /g, '-');

	// Read the existing data from the JSON file (assuming data.json is your data file)
	fs.readFile('./db.json', 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: 'Error adding item' });
			return;
		}

		// Parse the existing data as JSON
		const existingData = JSON.parse(data);

		// Add the new item data to the existing data
		if (itemData.itemType === 'drink') {
			existingData.drinks.push(itemData);
		}
		else if (itemData.itemType === 'snack') {
			existingData.snacks.push(itemData);
		}
		else {
			res.status(400).json({ message: 'Invalid item type' });
			return;
		}

		// Write the updated data back to the file
		fs.writeFile('./db.json', JSON.stringify(existingData), (e) => {
			if (e) {
				console.error('Error writing to file:', e);
				res.status(500).json({ message: 'Error adding item' });
				return;
			}

			// Respond with a success message
			res.status(201).json({ message: 'Item added successfully' });
		});
	});
});

// Function to generate a unique ID (you can use a library like uuid)
function generateUniqueId () {
	// Implement your logic to generate a unique ID
	// For simplicity, you can use a timestamp-based approach or a library like uuid
	return Date.now().toString();
}

// Define a route for an individual item
app.get('/items/:id', (req, res) => {
	const itemId = req.params.id;

	fs.readFile('./db.json', 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: 'Error fetching item' });
			return;
		}

		const existingData = JSON.parse(data);

		// Find the item by ID
		const foundItem =
			existingData.snacks.find((item) => item.id === itemId) ||
			existingData.drinks.find((item) => item.id === itemId);

		if (!foundItem) {
			res.status(404).json({ message: 'Item not found' });
			return;
		}

		res.json(foundItem);
	});
});

// Define a route for snacks
app.get('/snacks', (req, res) => {
	fs.readFile('./db.json', 'utf8', (e, data) => {
		if (e) {
			console.error(e);
			res.status(500).json({ message: 'Error fetching snacks' });
			return;
		}

		const existingData = JSON.parse(data);
		res.json({ snacks: existingData.snacks });
	});
});

// Define a route for drinks
app.get('/drinks', (req, res) => {
	fs.readFile('./db.json', 'utf8', (e, data) => {
		if (e) {
			console.error(e);
			res.status(500).json({ message: 'Error fetching drinks' });
			return;
		}

		const existingData = JSON.parse(data);
		res.json({ drinks: existingData.drinks });
	});
});

app.put('/edit-item/:id', (req, res) => {
	const itemId = req.params.id;
	const updatedData = req.body;

	fs.readFile('./db.json', 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: 'Error updating item' });
			return;
		}

		const existingData = JSON.parse(data);

		// Find the item by ID and update it
		const itemToUpdate =
			existingData.snacks.find((item) => item.id === itemId) ||
			existingData.drinks.find((item) => item.id === itemId);

		if (!itemToUpdate) {
			res.status(404).json({ message: 'Item not found' });
			return;
		}

		// Update the item
		Object.assign(itemToUpdate, updatedData);

		// Write the updated data back to the file
		fs.writeFile('./db.json', JSON.stringify(existingData), (e) => {
			if (e) {
				console.error('Error writing to file:', e);
				res.status(500).json({ message: 'Error updating item' });
				return;
			}

			// Respond with a success message
			res.status(200).json({ message: 'Item updated successfully' });
		});
	});
});

app.put('/update-item/:id', (req, res) => {
	const { id } = req.params;
	const updatedItem = req.body;

	fs.readFile('./db.json', 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: 'Error updating item' });
			return;
		}

		const existingData = JSON.parse(data);

		const snackIndex = existingData.snacks.findIndex((item) => item.id === id);
		const drinkIndex = existingData.drinks.findIndex((item) => item.id === id);

		if (snackIndex !== -1) {
			existingData.snacks[snackIndex] = { ...existingData.snacks[snackIndex], ...updatedItem };
		}
		else if (drinkIndex !== -1) {
			existingData.drinks[drinkIndex] = { ...existingData.drinks[drinkIndex], ...updatedItem };
		}
		else {
			res.status(404).json({ message: 'Item not found' });
			return;
		}

		fs.writeFile('./db.json', JSON.stringify(existingData), (e) => {
			if (e) {
				console.error('Error writing to file:', e);
				res.status(500).json({ message: 'Error updating item' });
				return;
			}

			res.status(200).json({ message: 'Item updated successfully' });
		});
	});
});

// route for deleting an item
app.delete('/delete-item/:id', (req, res) => {
	const { id } = req.params;

	fs.readFile('./db.json', 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: 'Error deleting item' });
			return;
		}

		const existingData = JSON.parse(data);

		console.log('Existing data before delete:', existingData);

		const snackIndex = existingData.snacks.findIndex((item) => item.id === id);
		const drinkIndex = existingData.drinks.findIndex((item) => item.id === id);

		if (snackIndex === -1 && drinkIndex === -1) {
			res.status(404).json({ message: 'Item not found' });
			return;
		}

		console.log('Existing data before delete:', existingData);

		if (snackIndex !== -1) {
			existingData.snacks.splice(snackIndex, 1);
		}
		else {
			existingData.drinks.splice(drinkIndex, 1);
		}

		console.log('Existing data after delete:', existingData); // Add this line

		fs.writeFile('./db.json', JSON.stringify(existingData), (e) => {
			if (e) {
				console.error('Error writing to file:', e);
				res.status(500).json({ message: 'Error deleting item' });
				return;
			}

			res.status(200).json({ message: 'Item deleted successfully' });
		});
	});
});

// Handle preflight requests
app.options('*', cors(corsOptions));

// Define a route for handling the preflight requests for /edit-item/:id
app.options('/edit-item/:id', cors(corsOptions));

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
