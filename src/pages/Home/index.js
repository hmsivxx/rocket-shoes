import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { MdAddShoppingCart } from "react-icons/md";
import { ProductList } from "./styles";

import * as CartActions from "../../store/modules/cart/actions";
import { formatPrice } from "../../util/format";
import api from "../../services/api";

const Home = ({ amount, addToCart }) => {
  const [products, setProducts] = useState([]);
  // const { amount } = props;

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("products");

      const data = response.data.map((product) => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));

      setProducts(data);
    };

    getData();
  }, []);

  function handleAddProduct(product) {
    // const { addToCart } = props;

    addToCart(product);
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} width={300} />

          <strong>{product.title}</strong>
          <span>{product.formattedPrice}</span>

          <button
            type="button"
            onClick={() => handleAddProduct(product)}
          >
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />{" "}
              {amount[product.id] || 0}
            </div>

            <span>Add to cart</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
