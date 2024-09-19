import React, { useEffect, useState } from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config"; // Ensure correct Firestore instance is imported
import { toast } from "react-toastify";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Reference to the 'posts' collection
        const postsCollection = collection(db, "posts");

        // Query to get the posts ordered by 'rating'
        const q = query(postsCollection, orderBy("rating", "desc"));

        // Execute the query and get the snapshot
        const querySnapshot = await getDocs(q);

        let fetchedArticles = [];

        // Loop through each document in the query snapshot
        querySnapshot.forEach((doc) => {
          fetchedArticles.push({
            id: doc.id, // Add document id
            data: doc.data(), // Add document data
          });
        });

        // Set the fetched articles to the state
        setArticles(fetchedArticles);
      } catch (error) {
        toast.error("Could not fetch articles");
      }
    };

    // Call the function to fetch articles
    fetchArticles();
  }, []); // Empty dependency array to avoid infinite loop

  return (
    <div className="featured-section">
      <h2>Featured Articles</h2>
      <Grid columns={3} stackable>
        {articles.map((article, index) => (
          <Grid.Column key={index}>
            <Card>
              <Image src={article.data.image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{article.data.title}</Card.Header>
                <Card.Meta>{article.data.author}</Card.Meta>
                <Card.Description>{article.data.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>⭐ {article.data.rating} Stars</Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
      <p className="see-all">See all articles</p>
    </div>
  );
};

export default Articles;
