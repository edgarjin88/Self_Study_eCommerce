import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./ApiAdmin";


const AddProdduct = ()=>{

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createProduct: "",
    redirectToProfile: false,
    formData: ""
  });
  
  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values; 
  // load categoreis and set form data

  const init = () =>{
    getCategories().then(data =>{ //from json(), returning a promise 
      if(data.error){
        setValues({...values, error: data.error})
      } else{
        console.log('category: ', data.data)
        setValues({...values, categories: data.data, formData: new FormData()})
      }
      //hum. Not sure to request server for categories everytime rerendering. 
    })
  }

  useEffect(()=>{
    init()

  }, [])

  // useEffect(()=>{
  //   setValues({...values, formData: new FormData}) // populate FormData when rerender this component. 
  // }, [])

  const handleChange = name =>(event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value; 
    // if file, get the first one, otherwise, the hardcoded text value
    formData.set(name, value) // not sure this is the best approach or not. This should happen only when submit
    //is this still modifying state? or just playing with destructured variable?
    setValues({...values, [name]:value})
  }

  const clickSubmit = e => {
    e.preventDefault();
    setValues({...values, error: '', loading: true})
    createProduct(user._id, token, formData)
    .then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      }else{
        setValues({
          ...values, name:'', description: '', photo:'', price:'', quantity:'', loading:false,
          createdProduct: data.name,
          formData: new FormData()
        })
      }
    })

    const options = document.getElementsByClassName("defaultselect");
    // console.log("options :", options);
    [].forEach.call(options, option => { // not apply. because Im using forEach to a option only. 
      // console.log("option :", option);
      return (option.selected = true);
    });
  }

    const newPostForm = ()=>{
      return (
        <form className="mb-3" onSubmit={clickSubmit}>
          <h4>Post Photo</h4>
          <div className="form-group">
            <label className="btn btn-secondary">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image/*"
              />
            </label>
          </div>

          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              value={name}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Description</label>
            <textarea
              onChange={handleChange("description")}
              className="form-control"
              value={description}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Price</label>
            <input
              type="text"
              onChange={handleChange("price")}
              className="form-control"
              value={price}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Category</label>
            <select
              onChange={handleChange("category")}
              // handle change would not fire if you not actually pick up something
              // to avoid, set the initial value?
              className="form-control"
            >
              <option className="defaultselect">Pelase select</option>
              {categories &&
                categories.map((c, i) => {
                  return (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="form-group">
            <label className="text-muted">Quantity</label>
            <input
              onChange={handleChange("quantity")}
              type="number"
              className="form-control"
              value={quantity}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Shipping</label>
            <select
              onChange={handleChange("shipping")}
              className="form-control"
            >
              <option className="defaultselect">Pelase select</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <button className="btn btn-outline-primary">Create Product</button>
        </form>
      );
    }

    const showError =() =>(
      <div className="alert alert-danger" style={{display: error ? "" : 'none'}}>{error}</div>
    )
    const showSuccess = () => (
      <div
        className="alert alert-success"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h2>{`${createdProduct} is created`}</h2>
      </div>
    );
    const showLoading =() =>(
      loading && <div className="alert alert-success"><h2>Loading...</h2></div>
    )
    return (
      <Layout
        title="Add a new product"
        description={`G'day ${user.name}, ready to add a new product?`}
      >
        <div className="row">
          {showError()}
          {showLoading()}
          {showSuccess()}
          <div className="col-md-8 offset-md-2">{newPostForm()}</div>
        </div>
      </Layout>
    );
  
}

export default AddProdduct


