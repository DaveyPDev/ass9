const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a route for adding an item
app.post('/add-item', (req, res) => {
    console.log('Received POST request at /add-item');
    const itemData = req.body;
    console.log('Item data:', itemData);
  

  // Read the existing data from the JSON file (assuming data.json is your data file)
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding item' });
      return;
    }

    // Parse the existing data as JSON
    const existingData = JSON.parse(data);

    // Add the new item data to the existing data
    existingData.push(itemData);

    // Write the updated data back to the file
    fs.writeFile('db.json', JSON.stringify(existingData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding item' });
        return;
      }

      // Respond with a success message
      res.status(201).json({ message: 'Item added successfully' });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
