// src/App.js
import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './components/Header'; 
import HeroImage from './components/HeroImage';
import Articles from './components/Articles';
import Tutorials from './components/Tutorials';
import SubscriptionForm from './components/SubscriptionForm';
import Footer from './components/Footer';

const App = () => (
  <Container>
    <Header />
    <HeroImage />
    <Articles />
    <Tutorials />
    <SubscriptionForm />
    <Footer />
  </Container>
);

export default App;
