import React from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import { faker } from "@faker-js/faker";

const tutorials = Array.from({ length: 3 }).map(() => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  username: faker.internet.userName(),
  image: faker.image.url(),
}));

const Tutorials = () => (
  <div className="featured-tutorials-section">
    {" "}
    {/* Updated class name */}
    <h2>Featured Tutorials</h2>
    <Grid columns={3} stackable>
      {tutorials.map((tutorial, index) => (
        <Grid.Column key={index}>
          <Card>
            <Image src={tutorial.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{tutorial.title}</Card.Header>
              <Card.Meta>{tutorial.username}</Card.Meta>
              <Card.Description>{tutorial.description}</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
    </Grid>
    <p className="see-all-tutorials">See all tutorials</p>
  </div>
);

export default Tutorials;
