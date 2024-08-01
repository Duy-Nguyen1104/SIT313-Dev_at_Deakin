
import React from 'react';
import { Menu, Input, Button } from 'semantic-ui-react';
import './Header.css';  // Import custom CSS for specific styles

const Header = () => (
  <Menu borderless className="header-menu" fixed="top">
    <Menu.Item header className="header-logo">
      DEV@Deakin
    </Menu.Item>
    
    <Menu.Item className="header-search" position="right">
      <Input icon="search" placeholder="Search..." className="search-input" />
    </Menu.Item>
    
    <Menu.Item position="right" className="header-actions">
      <Button primary className="header-button">Post</Button>
      <Button className="header-button">Login</Button>
    </Menu.Item>
  </Menu>
);

export default Header;
