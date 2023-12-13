import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';
function Menu ({ title }) {
	const [ items, setItems ] = useState([]);

	const [ loading, setLoading ] = useState(true);

	useEffect(
		() => {
			fetch(`http://localhost:5000/${title.toLowerCase()}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					return response.json();
				})
				.then((data) => {
					const items = data[title.toLowerCase()];
					console.log('Fetched data:', items);
					const ids = items.map((item) => item.id);
					const hasDuplicateIds = ids.length !== new Set(ids).size;
					console.log('Has duplicate IDs:', hasDuplicateIds);
					setItems(items);
				})
				.catch((error) => {
					console.error('Fetch error:', error);
					// You can set an error state or redirect to an error page
				});
		},
		[ title ]
	);

	// Updated itemList to include Link components
	const itemList = Array.isArray(items)
		? items.map((item, index) => {
				console.log('Item ID:', item.id);
				return (
					<Link to={`/${title.toLowerCase()}/${item.id}`} key={index} className="text-decoration-none">
						<ListGroupItem>{item.name}</ListGroupItem>
					</Link>
				);
			})
		: null;
		

	return (
		<section className="col-md-4">
			<Card>
				<CardBody>
					<CardTitle className="font-weight-bold text-center">{title} Menu</CardTitle>
					<CardText>
						Some quick example text to build on the card title and make up the bulk of the card's content.
					</CardText>
					<ListGroup>{itemList}</ListGroup>
				</CardBody>
			</Card>
		</section>
	);
}

export default Menu;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Menu.css';
// import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';

// function Menu ({ items, title }) {
// 	// Check if items is an array before calling map
// 	const itemList = Array.isArray(items) ? items.map((item) => (
// 		<Link to={`/${title.toLowerCase()}/${item.id}`} key={item.id}>
// 			<ListGroupItem>{item.name}</ListGroupItem>
// 		</Link>
// 	)) : null;

// 	return (
// 		<section className="col-md-4">
// 			<Card>
// 				<CardBody>
// 					<CardTitle className="font-weight-bold text-center">{title} Menu</CardTitle>
// 					<CardText>
// 						Some quick example text to build on the card title and make up the bulk of the card's content.
// 					</CardText>
// 					<ListGroup>
// 						{itemList}
// 					</ListGroup>
// 				</CardBody>
// 			</Card>
// 		</section>
// 	);
// }

// export default Menu;
