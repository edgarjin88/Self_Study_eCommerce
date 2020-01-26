import { API } from "../config";

export const signup = user => {
  console.log(user);
  //without return, promise would not be available.
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log("err :", err);
    });
};


export const signin = user => {

  //without return, promise would not be available.
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log("err :", err);
    });
};

export const authenticate = (data, next) =>{
  if(typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data)) // still use JSON to save in local storage
    next(); 

  }
}


export const signout = (next)=>{
  //use the redirect functioni in next callback
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt"); 
      next();
      return fetch(`${API}/signout`, {
        method: "GET"
      })
      .then(response =>{
        console.log('signout', response)
      })
      .catch( err => console.log('error :', err))
    }
}


export const isAuthenticated = () =>{
  if(typeof window === 'undefined') {
    return false; 
  }
  if(localStorage.getItem('jwt')){
    return JSON.parse(localStorage.getItem('jwt')); 
    // but, is it safe to store? 
    //but it just call the jwt token where do we sent it to server?
    // it has tocken, email, user as well as value because I stored whole JSON object
  }else{
    return false;
  }
}
