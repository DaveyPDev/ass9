import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import SnackOrBoozeApi from './Api'; 

function Home() {
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const snacksData = await SnackOrBoozeApi.getSnacks();
      const drinksData = await SnackOrBoozeApi.getDrinks();
      setSnacks(snacksData);
      setDrinks(drinksData);
    }
    fetchData();
  }, []);

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
            <p>We have {snacks.length}<Link to="/snacks">snack</Link> items and {drinks.length}<Link to="/drinks">drink</Link>  choices.</p>
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;