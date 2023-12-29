import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const SidebarConfig = ({ menuItems }) =>{
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);
  
  const theme = useSelector((state) => state.theme);

  const handleMenuItemClick = (menuItemUrl) =>{
    setActiveMenuItem(menuItemUrl);
  };

  return(
    <ListGroup className="mt-2">
      {menuItems?.map((menuItem, index) =>(
        <Link key={index} to={menuItem.url}
        className={`list-group-item list-group-item-action ${
        activeMenuItem.includes(menuItem.url) ? "active" : ""} ${theme ? "" : "dark"}`}
        onClick={() => handleMenuItemClick(menuItem.url)}
        aria-current={
          activeMenuItem.includes(menuItem.url) ? "true" : "false"
        }>
          <i className={`${menuItem.icon} fa-fw pe-2`}/>{menuItem.name}
        </Link>
      ))}
    </ListGroup>
  );
};

export default SidebarConfig;