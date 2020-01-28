import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage';
import moment from 'moment'; 
import { addItem } from './CartHelpers';




const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton =true
}) => {
  const [redirect, setRedirect] = useState(false);

  const showViewButton = () => {
    return (
      showViewProductButton && (
        <Link className="mr-2" to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mt-2 mb-4 mr-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const showAddToCart = showAddToCartButton => {
    return showAddToCartButton && (
      <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
        Add to Cart
      </button>
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };


  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span>Out of Stock</span>
    );
  };

  return (
    <div className="card">
      <div className="card-header name">
        <strong>{product.name}</strong>
      </div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2"> {product.description.substring(0, 100)}</p>
        {/* onClick readMore, without Substring */}
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>

        <div className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </div>
        {showStock(product.quantity)}
        <br />
        {showViewButton()}
        {showAddToCart(showAddToCartButton)}
      </div>
    </div>
  );
};

export default Card; 
