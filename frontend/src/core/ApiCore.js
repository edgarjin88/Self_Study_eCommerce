import {API} from '../config';
import queryString from 'query-string'
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


export const list = async params => {
  const query = queryString.stringify(params);
  //whatever the params, it would be query. 
  console.log('qpery; ', query)
  try {
    const response = await fetch(`${API}/products/search?${query}`, {
      method: "GET"
    });
    return response.json();
  }
  catch (err) {
    console.log(err);
  }
};


export const read = productId => {
         return fetch(`${API}/product/${productId}`, {
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


export const listRelated = productId => {
         return fetch(`${API}/products/related/${productId}`, {
           method: "GET"
         })
           .then(response => {
            //  console.log('response success:', response)
             return response.json(); 
            //  
            // 

           })
           .catch(err => {
             console.log(err);
           });
       };

export const getBrainTreeClientToken = async (userId, token) => {
  try {
    const response = await fetch(`${API}/braintree/getToken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    //  console.log('response success:', response)
    return response.json();
  }
  catch (err) {
    console.log(err);
  }
};


export const processPayment = async (userId, token, paymentData) => {
  try {
    const response = await fetch(`${API}/braintree/payment/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify(paymentData)
    });
    //  console.log('response success:', response)
    return response.json();
  } catch (err) {
    console.log(err);
  }
};


export const createOrder = async (userId, token, createOrderData) => {
  try {
    const response = await fetch(`${API}/order/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({order:createOrderData})
    });
   
    return response.json();
  } catch (err) {
    console.log(err);
  }
};



