import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCart } from "./CartHelpers";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";




const Cart = () => {
  const [run, setRun] = useState(false) // to avoid infinit loop
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

    // useEffect(() => {
    //   setItems(getCart());
    // }, [items]);
// infinit loop 

  const showItems = items =>{
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr/>
        {items.map((product, i)=>{
          return (
            <Card
              cartUpdate={true}
              key={i}
              product={product}
              showRemoveProductButton={true}
              run={run}
              setRun={setRun}
              showAddToCartButton={false}
            />
          );
        })}
      </div>
    )
  }

  const noItemsMessage = () =>{
    return <h2>Your cart is empty. <br/>
    <Link to="/shop">Continue shopping</Link>
    </h2>
  }
  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          
          <h2 className="mb-4">Your cart summary</h2>
          <hr/>

          <Checkout products={items}/>
        </div>


      </div>
    </Layout>
  );
};

export default Cart
