import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

function MenuItem ({ cantFind }) {
	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const itemType = location.pathname.split('/')[1];

	const [ isEditing, setIsEditing ] = useState(false);
	const [ editedItem, setEditedItem ] = useState(null);
	const [ item, setItem ] = useState(null);
	const [ isAdding, setIsAdding ] = useState(false);
	const [ newItem, setNewItem ] = useState({
		itemType    : 'snack',
		name        : '',
		description : '',
		recipe      : '',
		serve       : ''
	});
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(
		() => {
			const fetchItem = async () => {
				if (id === undefined || id === 'undefined') {
					console.error('Cannot fetch item: id is undefined');
					setIsLoading(false);
					return;
				}

				try {
					console.log('Fetching item with id:', id);
					const response = await axios.get(`http://localhost:5000/items/${id}`);
					const foundItem = response.data;

					if (!foundItem) {
						console.error('Item not found');
						setIsLoading(false);
						return;
					}

					setItem(foundItem);
				} catch (error) {
					console.error('Error fetching item:', error);
				} finally {
					setIsLoading(false);
				}
			};

			fetchItem();
		},
		[ id ]
	);

	const handleEdit = () => {
		setIsEditing(true);
		setEditedItem({ ...item });
	};

	const handleSave = (e) => {
		e.preventDefault();

		axios
			.put(`http://localhost:5000/edit-item/${item.id}`, editedItem, {
				headers : {
					'Content-Type' : 'application/json'
				}
			})
			.then((response) => {
				if (response.status === 200) {
					setIsEditing(false);
					setItem(editedItem);
				}
				else {
					console.error('Error updating item. Server rfesponded with:', response.statusText);
				}
			})
			.catch((error) => console.error('Error updating item:', error));
	};

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this item?')) {
			if (!item || !item.id) {
				console.error('Item or item ID is missing.');
				return;
			}

			console.log('Deleting item with ID:', item.id);

			axios
				.delete(`http://localhost:5000/delete-item/${item.id}`)
				.then((response) => {
					if (response.status === 200) {
						console.log('Item deleted successfully');
						history.push(`/${itemType}`); // Redirect to the menu page
					}
					else {
						console.error('Error deleting item. Server responded with:', response.statusText);
					}
				})
				.catch((error) => console.error('Error deleting item:', error));
		}
	};

	const handleNewItemSubmit = async (e) => {
		e.preventDefault();

		const uniqueId = `${newItem.itemType}-${Date.now()}`;

		const modifiedNewItem = {
			...newItem,
			id : newItem.name.toLowerCase().replace(/\s+/g, '-') || uniqueId
		};

		try {
			const response = await axios.post(`http://localhost:5000/${modifiedNewItem.itemType}s`, modifiedNewItem);

			if (response.status === 201) {
				setIsAdding(false);
				e.target.reset(); // Reset the form
				console.log('Item added successfully!');
			}
			else {
				console.error('Error adding item:', response.statusText);
			}
		} catch (error) {
			console.error('Error adding item:', error);
		}
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (!item) {
		return <Redirect to={cantFind} />;
	}

	if (isAdding) {
		return (
			<div>
				<h2>Add an Item</h2>
				<form onSubmit={handleNewItemSubmit}>
					{/* Form inputs for adding a new item */}
					{/* ... */}
					<button type="submit">Add Item</button>
				</form>
			</div>
		);
	}

	if (isEditing) {
		return (
			<div>
				<h2>Edit Item</h2>
				<form onSubmit={handleSave}>
					<div>
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							id="name"
							name="name"
							value={editedItem.name}
							onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
						/>
					</div>
					<div>
						<label htmlFor="description">Description:</label>
						<input
							type="text"
							id="description"
							name="description"
							value={editedItem.description}
							onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
						/>
					</div>
					<div>
						<label htmlFor="recipe">Recipe:</label>
						<input
							type="text"
							id="recipe"
							name="recipe"
							value={editedItem.recipe}
							onChange={(e) => setEditedItem({ ...editedItem, recipe: e.target.value })}
						/>
					</div>
					<div>
						<label htmlFor="serve">Serve:</label>
						<input
							type="text"
							id="serve"
							name="serve"
							value={editedItem.serve}
							onChange={(e) => setEditedItem({ ...editedItem, serve: e.target.value })}
						/>
					</div>
					<button type="submit">Save</button>
				</form>
			</div>
		);
	}

	return (
		<section>
			<Card>
				<CardBody>
					<CardTitle className="font-weight-bold text-center">{item.name}</CardTitle>
					<CardText className="font-italic">{item.description}</CardText>
					<p>
						<b>Recipe:</b> {item.recipe}
					</p>
					<p>
						<b>Serve:</b> {item.serve}
					</p>
					<button onClick={handleEdit}>Edit</button>
					<button onClick={handleDelete}>Delete</button>
				</CardBody>
			</Card>
		</section>
	);
}

export default MenuItem;

// import React, { useState, useEffect } from 'react';
// import { Redirect, useParams } from 'react-router-dom';
// import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
// import axios from 'axios';

// function MenuItem ({ items, cantFind }) {
// 	console.log('Items:', items);
// 	console.log('Item IDs:', items.map((item) => item.id));

// 	const { id } = useParams();
// 	console.log('URL parameter id:', id);

// 	const [ isEditing, setIsEditing ] = useState(false);
// 	const [ editedItem, setEditedItem ] = useState(null);
// 	const [ item, setItem ] = useState(null);

//   useEffect(() => {
//     console.log('MenuItem useEffect triggered');
//     console.log('Items:', items);
//     console.log('Item IDs:', items.map((item) => item.id));

//     fetch(`http://localhost:5000/items/${id}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         const foundItem = items.find((item) => String(item.id) === String(id));
//         console.log('Found Item:', foundItem);
//         setItem(foundItem);
//       })
//       .catch(error => {
//         console.error('Error fetching item:', error);
//         // You can set an error state or redirect to an error page
//       });
//   }, [id, items]);

// 	// If items array is empty, render loading message
// 	if (items.length === 0) {
// 		return <p>Loading...</p>;
// 	}

// 	if (!item) {
// 		console.log('Item not found, redirecting...');
// 		return <Redirect to={cantFind} />;
// 	}

// 	const handleEdit = () => {
// 		setIsEditing(true);
// 		setEditedItem({ ...item });
// 	};

// 	const handleSave = () => {
// 		axios.put(`http://localhost:5000/edit-item/${item.id}`, editedItem).then(() => {
// 			setIsEditing(false);
// 		});
// 	};

// 	const handleDelete = () => {
// 		if (window.confirm('Are you sure you want to delete this item?')) {
// 			axios.delete(`http://localhost:5000/delete-item/${item.id}`);
// 		}
// 	};

// 	if (isEditing) {
// 		return (
// 			<div>
// 				<input
// 					value={editedItem.name}
// 					onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
// 				/>
// 				{/* Add more inputs for other fields... */}
// 				<button onClick={handleSave}>Save</button>
// 			</div>
// 		);
// 	}

// 	return (
// 		<section>
// 			<Card>
// 				<CardBody>
// 					<CardTitle className="font-weight-bold text-center">{item.name}</CardTitle>
// 					<CardText className="font-italic">{item.description}</CardText>
// 					<p>
// 						<b>Recipe:</b> {item.recipe}
// 					</p>
// 					<p>
// 						<b>Serve:</b> {item.serve}
// 					</p>
// 					<button onClick={handleEdit}>Edit</button>
// 					<button onClick={handleDelete}>Delete</button>
// 				</CardBody>
// 			</Card>
// 		</section>
// 	);
// }

// export default MenuItem;
