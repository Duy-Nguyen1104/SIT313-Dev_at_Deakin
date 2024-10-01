import React from "react";
import Header from "../components/Header";
import HeroImage from "../components/HeroImage";
import Articles from "../components/Articles";
import Tutorials from "../components/Tutorials";
import SubscriptionForm from "../components/SubscriptionForm";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function Home() {
  return (
    <div>
      <Header />
      <HeroImage />
      <Articles />
      <Tutorials />
      <SubscriptionForm />
      <Footer />
    </div>
  );
}

export default Home;
