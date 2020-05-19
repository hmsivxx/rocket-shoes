import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { MdShoppingBasket } from "react-icons/md";
import { Container, Cart } from "./styles";

import logo from "../../assets/images/logo.svg";

const Header = ({ cartSize }) => {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="rocket-shoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>My cart</strong>
          <span>{cartSize} items</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
};

export default connect((state) => ({
  cartSize: state.cart.length,
}))(Header);