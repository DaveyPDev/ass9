import React, { useState } from 'react';
import axios from 'axios';

function AddItem () {
	const [ itemData, setItemData ] = useState({
		itemType    : 'snack',
		name        : '',
		description : '',
		recipe      : '',
		serve       : ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setItemData({ ...itemData, [name]: value });
	};

	const handleTypeChange = (e) => {
		setItemData({ ...itemData, itemType: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	  
		try {
		  console.log('Sending POST request...');
		  const response = await axios.post('http://localhost:5000/add-item', itemData, {
			headers: {
			  'Content-Type': 'application/json'
			}
		  });
	  
		  console.log('POST request successful:', response);
	  
		  if (response.status === 201) {
			console.log('Item added successfully!');
			// Optionally, you can reset the form fields or perform other actions here
		  } else {
			console.error('Error adding item:', response.statusText);
			// Handle error gracefully, display a message to the user, etc.
		  }
		} catch (error) {
		  console.error('Error adding item:', error);
		  // Handle error gracefully, display a message to the user, etc.
		}
	  };
	  

	return (
		<div>
			<h2>Add an Item</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Select Item Type:
						<select name="itemType" value={itemData.itemType} onChange={handleTypeChange}>
							<option value="snack">Snack</option>
							<option value="drink">Drink</option>
						</select>
					</label>
				</div>
				<div>
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" name="name" value={itemData.name} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="description">Description:</label>
					<input
						type="text"
						id="description"
						name="description"
						value={itemData.description}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="recipe">Recipe:</label>
					<input type="text" id="recipe" name="recipe" value={itemData.recipe} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="serve">Serve:</label>
					<input type="text" id="serve" name="serve" value={itemData.serve} onChange={handleChange} />
				</div>
				<button type="submit">Add Item</button>
			</form>
		</div>
	);
}

export default AddItem;
