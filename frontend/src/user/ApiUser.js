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
    console.log('user id :', userId)
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
    console.log('erro fired');
  }
};

// update user in local storage as well. 
//because this app calling the user infor from LocalStorage
export const updateUser = (user, next)=>{
  if(typeof window !== 'undefined'){
    if(JSON.parse(localStorage.getItem('jwt'))){
      
      let auth = JSON.parse(localStorage.getItem('jwt'))
      auth.user = user
      // localStorage.setItem('jwt', JSON.stringify(auth))
      console.log('local ', auth)
      next()
    }
  }
}

export const getPurchaseHistory = (userId, token) => {
  return fetch(`${API}/orders/by/user/${userId}`, {
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


// const purchaseHistory = history => {
//   return (
//     <div className="card mb-5">
//       <h3 className="card-header">Purchase history</h3>
//       <ul className="list-group">
//         <li className="list-group-item">
//           {history.map((h, i) => {
//             return (
//               <div>
//                 <hr />
//                 {h.products.map((p, i) => {
//                   return (
//                     <div key={i}>
//                       <h6>Product name: {p.name}</h6>
//                       <h6>Product price: ${p.price}</h6>
//                       <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
//                     </div>
//                   );
//                 })}
//               </div>
//             );
//           })}
//         </li>
//       </ul>
//     </div>
//   );
// };
