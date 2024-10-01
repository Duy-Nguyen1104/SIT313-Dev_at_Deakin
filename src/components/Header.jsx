import React from "react";
import { Menu, Input, Button } from "semantic-ui-react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onPost = () => {
    navigate("/post");
  };

  const onQuestions = () => {
    navigate("/questions");
  };

  const onPlans = () => {
    navigate("/plans");
  };

  return (
    <Menu borderless className="header-menu" fixed="top">
      <Menu.Item header className="header-logo">
        DEV@Deakin
      </Menu.Item>

      <Menu.Item className="header-logo" position="right">
        Welcome back, {formData.name}
      </Menu.Item>

      <Menu.Item className="header-search" position="right">
        <Input icon="search" placeholder="Search..." className="search-input" />
      </Menu.Item>

      <Menu.Item position="right" className="header-actions">
        <Button primary className="header-button" onClick={onPost}>
          Post
        </Button>

        <Button color="orange" className="header-button" onClick={onQuestions}>
          Find Questions
        </Button>

        <Button color="yellow" className="header-button" onClick={onPlans}>
          Plans
        </Button>

        <Button className="header-button" onClick={onLogout}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
