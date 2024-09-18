import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import HeroImage from "./components/HeroImage";
import Articles from "./components/Articles";
import Tutorials from "./components/Tutorials";
import SubscriptionForm from "./components/SubscriptionForm";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

const App = () => (
  <Container>
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Header />
              <HeroImage />
              <Articles />
              <Tutorials />
              <SubscriptionForm />
              <Footer />
            </>
          }
        />
        <Route path="/" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
    <ToastContainer />
  </Container>
);

export default App;
