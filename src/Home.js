import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

function Home({snacksCount, drinksCount}) {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
            <p>We have {snacksCount} snack items  and {drinksCount} drink choices.</p>
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
