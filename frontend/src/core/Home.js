import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./ApiCore";
import Card from "./Card";



function Home() {
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadProductsBySell = () =>{
    getProducts('sold').then(data => {
      if(data.error){
        setError(data.error)
      }else{
        setProductsBySell(data)
      }
    })
  } //lets get this function out of this component. 

    const loadProductsByArrival = () => {
      getProducts("createdAd").then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setProductsByArrival(data);
        }
      });
    };

    useEffect(()=>{
      loadProductsByArrival()
      loadProductsBySell()
    }, [])

  
  return (
    <Layout title="Home Page" 
    description="Node React E-commerce App" 
    className="container-fluid">  
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => {
          return <Card key={i} product={product} />;
        })}
      </div>
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => {
          return <Card key={i} product={product} />;
        })}
      </div>
    </Layout>
  );
}

export default Home;
