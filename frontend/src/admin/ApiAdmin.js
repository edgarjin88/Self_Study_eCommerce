import { API } from "../config";

export const createCategory = (userId, token, category) => {

  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
    //to json object
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log("err :", err);
    });
};



export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
    //to json object
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log("err :", err);
    });
};


export const getCategories = () =>{
  return fetch (`${API}/categories`, {
    method: "GET"
  })
  .then(response =>{
    return response.json() 
  
    // Body.json() is asynchronous and returns a Promise object that resolves to a JavaScript object. JSON.parse() is synchronous can parse a string and change the resulting returned JavaScript object.
  })
  .catch(err => {
    console.log(err)
  })
}



export const listOrders = (userId, token) => {
         return fetch(`${API}/order/list/${userId}`, {
           method: "GET",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
           }
         })
           .then(response => {
             return response.json();
           })
           .catch(err => {
             console.log(err);
           });
       };


  export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log('response: re', response);
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};


export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({status, orderId})
  })
    .then(response => {
      console.log('response: re', response);
      return response.json();
    })
    .catch(err => {
      console.log('response error: ', err);
    });
};



export const getProducts = () => {
  return fetch(`${API}/products?limit=100`, {
    method: "GET"
  })
    .then(response => {
      return response.json();

    })
    .catch(err => {
      console.log(err);
    });
};


export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};


export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log("response: re", response);
      return response.json();
    })
    .catch(err => {
      console.log("response error: ", err);
    });
};


export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product  // not json. form data, also may have images as well. 
  })
    .then(response => {
      console.log("response: re", response);
      return response.json();
    })
    .catch(err => {
      console.log("response error: ", err);
    });
};


