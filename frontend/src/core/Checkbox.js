import React, { useState, useEffect } from 'react';


const Checkbox=({categories, handleFilters})=>{
  const [checked, setChecked] = useState([]); //empty array!
  
  const handleToggle = c =>() =>{ 
    const currentCategoryId = checked.indexOf(c) // c== cateogry id, return first index or -1
    const newCheckedCategoryId = [...checked]; 

    if(currentCategoryId === -1){
      newCheckedCategoryId.push(c); 
    }else{
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    setChecked(newCheckedCategoryId); 
    handleFilters(newCheckedCategoryId)
  }


  return categories.map((c, i) => (
    <li className="list-unstyled">
      <input
        onChange={handleToggle(c._id)}
        id={c.name + i}
        type="checkbox"
        className="form-check-input"
        value={checked.indexOf(c._id === -1)}
      />
      <label htmlFor={c.name + i} className="form-check-label">
        {c.name}
      </label>
    </li>
  ));
}


export default Checkbox; 