

export const addItem = (item, next) =>{
  let cart = []
  if(typeof window !== 'undefined'){ 
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem("cart")); 
    }
    cart.push({
      ...item, 
      count: 1
    })

    cart = Array.from(new Set(cart.map((p) =>p._id))) 
    .map( id =>{
      return cart.find(p => p._id ===id)  
    })

    
    localStorage.setItem('cart', JSON.stringify(cart))
    next(); // just callback name. name can be changed. 

  }
}

export const itemTotal = () =>{
  if(typeof window !== 'undefined'){
    if(localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')).length
      //turn it to list, and length. 
      //it was previously key : []
    }
  }
  return 0; 
}

export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
      //turn it to list, and length.
      //it was previously key : []
    }
  }
  return []; 
};

export const updateItem = (productId, count)=>{
  let cart = []
  if(typeof window !== 'undefined'){
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    }

    cart.map((product, i)=>{
      if(product._id === productId){
        cart[i].count = count // localStorage data is retrieved, and count updated, and storedBack by using setItem. 
      }
    })
    localStorage.setItem('cart', JSON.stringify(cart)); 
  }
  return cart
}


export const removeItem = (productId) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1); // splice, and remove
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return cart
};



export const emptyCart = next =>{
  if(typeof window !== 'undefined'){
    localStorage.removeItem('cart')
    next()
  }
}