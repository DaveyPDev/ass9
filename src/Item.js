import React, { useState } from 'react';


function AddItem() {
  const [itemData, setItemData] = useState({
    itemType: 'snack',
    name: '',
    description: '',
    recipe: '',
    serve: '',
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
	  const response = await fetch('/api/add-item', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(itemData),
	  });
  
	  console.log('Response:', response);
  
	  if (response.ok) {
		console.log('Item added successfully!');
		// Handle success
	  } else {
		console.error('Error adding item:', response.statusText);
		// Handle error
	  }
	} catch (error) {
	  console.error('Error adding item:', error);
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
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
