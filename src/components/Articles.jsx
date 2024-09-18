import React from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import { faker } from "@faker-js/faker";

const articles = Array.from({ length: 3 }).map(() => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  author: faker.internet.userName(),
  image: faker.image.url(),
  rating: Math.floor(Math.random() * 5) + 1,
}));

const Articles = () => (
  <div className="featured-section">
    <h2>Featured Articles</h2>
    <Grid columns={3} stackable>
      {articles.map((article, index) => (
        <Grid.Column key={index}>
          <Card>
            <Image src={article.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{article.title}</Card.Header>
              <Card.Meta>{article.author}</Card.Meta>
              <Card.Description>{article.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>⭐ {article.rating} Stars</Card.Content>
          </Card>
        </Grid.Column>
      ))}
    </Grid>
    <p className="see-all">See all articles</p>
  </div>
);

export default Articles;
