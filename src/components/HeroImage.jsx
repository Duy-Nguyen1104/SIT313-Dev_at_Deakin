// src/components/HeroImage.js
import React from "react";
import { Image } from "semantic-ui-react";

const HeroImage = () => (
  <div className="hero-image-container">
    <Image src="https://picsum.photos/1200/400" className="hero-image" />
  </div>
);

export default HeroImage;
