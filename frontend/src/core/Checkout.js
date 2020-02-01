import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import {
  getProducts,
  getBrainTreeClientToken,
  processPayment,
  createOrder
} from "./ApiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from 'braintree-web-drop-in-react'
import { emptyCart } from "./CartHelpers";



  const Checkout = ({products})=>{
  const [data, setData] = useState({
    loading:false,
    success: false,
    clientToken: null,
    error: '',
    instance: {}, //braintree object
    address: ''
  })

  const getToken = (userId, token)=>{
    getBrainTreeClientToken(userId, token).then(response=>{
      if (response.error) {
        setData({ ...data, error: response.error });
      } else {
                // console.log("data4 :", response);

        setData({ ...data, clientToken: response.clientToken });
      }
    })
  }
  
  const buy = () =>{
    setData({ ...data, loading: true });
    let nonce; 
    // console.log('data 11:', data)
    if(data.instance !== undefined){
      console.log('data.instance :', data.instance);
          let getNonce = data.instance
            .requestPaymentMethod()
            .then(response => {
              // console.log('payment Data: ', data);
              nonce = response.nonce;

              const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
              };

              processPayment(userId, token, paymentData)
                .then(response => {
                  console.log('transaction id ', response.transaction);
                  const createOrderData = {
                    products:products,
                  transaction_id: response.transaction.id,
                  amount:response.transaction.amount,
                  address: data.address
                }
                // console.log(
                //   "before fire processPayment: ",
                //   // createOrderData
                // );

                  createOrder(userId, token, createOrderData)
                  setData({ ...data, success: response.success });
                  emptyCart(()=>{
                    //next call back function 
                    console.log('payment success and empty cart');
                    setData({success:true, loading: false });
                  })
                  //empty cart
                  //create order
                })
                .catch(error => {
                  console.log(error);
                  setData({ loading: false });
                });
            })
            .catch(error => {
              // console.log(error);
              setData({  error: error.message });
            });
    }

  }
  const showLoading =(loading) => loading && <h2>Loading...</h2>

  const handleAddress = event =>{
    setData({...data, address: event.target.value}); 
    console.log('address: ', data.address);
  }
  const showDropIn= () =>{
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="gorm-group mb-3">
              <label className="text-muted">Delivery address:</label>
              <textarea
                onChange={handleAddress}
                className="form-control"
                value={data.address}
                placeholder="Type your delivery address here..."
              />
            </div>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: "vault" // for paypal
                }
              }}
              onInstance={instance => (data.instance = instance)}
              //data.instance == state, will be passed to onInstance
              //function executed in the child comp.
              // inatance arg passed in child comp.
            />
            <button onClick={buy} className="btn btn-success btn-block">
              Pay
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  const showError = error =>{
    return(
      <div className="alert alert-danger" style={{display: error? '': 'none'}}>{error}</div>
    )
  }

  
  const showSuccess = success => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        Thanks! Your payment was successful!
      </div>
    );
  };

  useEffect(()=>{
    getToken(userId, token)
  }, [])
  // const {[user._id]:userIduserId, token} = isAuthenticated() && isAuthenticated()
  
  const userId= isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token
  console.log('user Id:', userId);

  const getTotal = () =>{ 
    return products.reduce((current, next)=>{
      return current + next.count * next.price
    }, 0)
  }

  const showCheckout = ()=>{
          
           return isAuthenticated() ? (
           <div className="btn btn-success">{showDropIn()}</div>
            ) : (
              <Link to="/signin">
                <button className="btn btn-primary">Sign in to Checkout</button>
              </Link>
            );
  }

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );

}

export default Checkout