import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts, getCategories, getFilterdProducts } from "./ApiCore";
import Card from "./Card";
import Checkbox from './Checkbox'
import { prices } from "./FixedPrices";
import RadioBox from "./RadioBox";




const Shop =()=>{
  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState([false]); 
  const [limit, setLimit] = useState(6); 
  const [skip, setSkip] = useState(0); 
  const [size, setSize] = useState(0); 
  const [filteredResults, setFilteredResults] = useState([]); 

  const [myFilters, setMyFilters] = useState({
    filters:{category: [], price: []}
  })
    const init = () => {
      getCategories().then(data => {
        //from json(), returning a promise
        if (data.error) {
          setError(data.error);
        } else {
          
          setCategories(data.data)
        }
        //hum. Not sure to request server for categories everytime rerendering.
      });
    };

  const loadFilterdResults = newFilters => {
    // console.log("newFilters; ", newFilters);
    getFilterdProducts(skip, limit, newFilters)  //apiCall. 
    .then(data =>{
      if(data.error){
        setError(data.error)
      }else{
        setFilteredResults(data.data); 
        setSize(data.size);
        setSkip(0); 
        //setSkip === 0, to use it for loadMore later. 
      }
    })
  };

    const loadMore = () => {
      let toSkip = skip + limit;
      // console.log("newFilters; ", newFilters);
      getFilterdProducts(toSkip, limit, myFilters.filters) //apiCall.
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setFilteredResults([...filteredResults, ...data.data]);
            // ...data.data must be!
            //if you do just data.data, it would add one array, not each element
            setSize(data.size);
            setSkip(0);
            //setSkip === 0, to use it for loadMore later.
          }
        });
    };


    const loadMoreButton = () =>{
      return (
        size > 0 && size >= limit && (
          <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
        )
      )
    }

    useEffect(() => {
      init();
      loadFilterdResults(skip, limit, myFilters.filters); //myfilter.filters == {}, default object
    }, []);

    
    const handlePrice = value => {
      const data = prices; //hardcoded data
      let array = []; 
      for(let key in data){
        if(data[key]._id === parseInt(value)){
          array = data[key].array //array inside hardcoded data
        }
      }
      return array
    };

    const handleFilters = (filters, filterBy )=>{
      // console.log('in shop comp filter:', filters, filterBy); 
      const newFilters = {...myFilters}
      newFilters.filters[filterBy] =filters  //filter coming from a child component. 
      if(filterBy =="price"){
        let priceValues = handlePrice(filters)
        newFilters.filters[filterBy] = priceValues;
      }
      loadFilterdResults(myFilters.filters)
      setMyFilters(newFilters); 
    }
  

  return (
    <Layout
      title="Shop Page"
      description="Search and find the book of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            {
              <Checkbox
                categories={categories}
                handleFilters={filters => handleFilters(filters, "category")}
              />
            }
            {/* filters is coming from child comp.  */}
          </ul>

          <h4>Filter by price range</h4>
          <ul>
            {
              <RadioBox
                prices={prices}
                handleFilters={filters => handleFilters(filters, "price")}
              />
            }
            {/* filters is coming from child comp.  */}
          </ul>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
}

export default Shop