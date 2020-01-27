import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage';


const Card = ({product}) =>{
  return (
    <div className="col-4 mb-4">
      <div className="card">
        <div className="card-header card-header-1 ">
          <strong>{product.name}</strong>
        </div>
        <div className="card-body">
          <ShowImage item={product} url="product" />
          <p>{product.description.substring(0, 100)}</p>
          {/* onClick readMore, without Substring */}
          <p>$ {product.price}</p>

          <Link to="/">
            <button className="btn btn-outline-primary mt-2 mb-4 mr-2">
              View Product
            </button>
          </Link>
          <button className="btn btn-outline-warning mt-2 mb-4 mr-2">
            Add to Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card; 
