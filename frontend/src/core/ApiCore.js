import {API} from '../config';

export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();

      // Body.json() is asynchronous and returns a Promise object that resolves to a JavaScript object. JSON.parse() is synchronous can parse a string and change the resulting returned JavaScript object.
    })
    .catch(err => {
      console.log(err);
    });
};



export const getFilterdProducts = (skip, limit, filters ={}) => {
  const data = {
    limit,
    skip,
    filters // eampty object for default
  };

  return fetch(`${API}/products/by/search/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) //passing filtered values
    //to json object
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log("err :", err);
    });
};

