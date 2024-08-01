import React from 'react';
import { Grid, List, Segment } from 'semantic-ui-react';
import './Footer.css';

const Footer = () => (
  <Segment inverted vertical className="footer" >
    <Grid divided inverted stackable style={{ marginLeft: '0px' }}>
      <Grid.Row>
        <Grid.Column width={3}>
          <h4>Explore</h4>
          <List link inverted>
            <List.Item as="a">Home</List.Item>
            <List.Item as="a">Questions</List.Item>
            <List.Item as="a">Articles</List.Item>
            <List.Item as="a">Tutorials</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={3}>
          <h4>Support</h4>
          <List link inverted>
            <List.Item as="a">Help</List.Item>
            <List.Item as="a">FAQs</List.Item>
            <List.Item as="a">Contact Us</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={7}>
          <h4>Stay Connected</h4>
          <List horizontal inverted>
            <List.Item as="a">Facebook</List.Item>
            <List.Item as="a">Twitter</List.Item>
            <List.Item as="a">Instagram</List.Item>
          </List>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <div className="footer-bottom">
      <p>DEVE@Deakin 2022 | Privacy Policy | Terms | Code of Conduct</p>
    </div>
  </Segment>
);

export default Footer;
