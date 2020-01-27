import React, { useState, useEffect, Fragment } from 'react';


const RadioBox = ({prices, handleFilters}) =>{
  const [value, setValue] = useState(0); 
  const handleChange = (e)=>{
    handleFilters(e.target.value)
    setValue(e.target.value)
  }
  return prices.map((p, i)=>{
    // console.log('p:', p)
    return (
      <div key={p.name + i} className="list-unstyled">
        <input
          id={p.name + i}
          onChange={handleChange}
          type="radio"
          className="mr-2 ml-4"
          value={`${p._id}`}
          name={p}
          // if all the input has the same name, you can select only one radio input. 
        />
        <label htmlFor={p.name + i} className="form-check-label">
          {p.name}
        </label>
      </div>
    );
  })

}

export default RadioBox; 