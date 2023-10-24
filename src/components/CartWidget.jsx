import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

const CartWidget = () => {
  return (
    <div className="d-flex align-items-center">
      <FontAwesomeIcon icon={faShoppingBasket} className="me-2" />
      <span className="badge bg-primary">1</span>
    </div>
  );
};

export default CartWidget;