import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from "react-icons/md";

import { formatPrice } from "../../util/format";
import * as CartActions from "../../store/modules/cart/actions";
import { Container, ProductTable, Total } from "./styles";

const Cart = ({ cart, removeFromCart, updateAmount, total }) => {
  function increment(product) {
    updateAmount(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmount(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Product</th>
            <th>Qty</th>
            <th>SubTotal</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <strong>{product.formattedPrice}</strong>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline
                      size={20}
                      color="#7159C1"
                      onClick={() => decrement(product)}
                    />
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={product.amount}
                  />
                  <button type="button">
                    <MdAddCircleOutline
                      size={20}
                      color="#7159C1"
                      onClick={() => increment(product)}
                    />
                  </button>
                </div>
              </td>

              <td>
                <strong>{product.subTotal}</strong>
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                >
                  <MdDelete size={20} color="7159C1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finish Purchase</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.map((product) => ({
    ...product,
    subTotal: formatPrice(product.amount * product.price),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
