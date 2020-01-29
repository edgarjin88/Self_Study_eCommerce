import { API } from "../config";



export const read = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
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

export const update = async (userId, token, user) => {
  try {
    const response = await fetch(`${API}/user/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    });
   
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

// update user in local storage as well. 
//because this app calling the user infor from LocalStorage
export const updateUser = (user, next)=>{
  if(typeof window !== 'undefined'){
    if(localStorage.getitem('jwt')){
      let auth = localStorage.getItem('jwt')
      auth.user = user
      localStorage.setItem('jwt', JSON.stringify(auth))
      next()
    }
  }
}
