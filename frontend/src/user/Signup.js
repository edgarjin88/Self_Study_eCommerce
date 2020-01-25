import React , {useState} from 'react';
import Layout from '../core/Layout';
import {Link} from 'react-router-dom'; 
import { signup } from '../auth';

const Signup = () =>{
  const [values, setValues] = useState({
    name: '',
    email: '',
    password:'',
    error: '',
    success: false
  }); 
  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value});
  }

  // prevState not required in this case
  const {name, email, password, success, error} = values; 

  
  const clickSubmit =(e)=>{
    e.preventDefault(); 
    setValues({...values, error:false}); 
    signup({name, email, password})
    .then(data =>{
      if(data.error){
        setValues({...values, error: data.error, success:false})
      }else{
        setValues({
          ...values,
          name: '',
          email:'',
          password:'',
          error:'',
          success:true
        })
      }
    })
  }  

  
  const signUpform = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          value={name}
          onChange={handleChange("name")}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          value={email}
          onChange={handleChange("email")}
          type="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          value={password}
          onChange={handleChange("password")}
          type="password"
          className="form-control"
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
  const showError =()=>{
    return (
      <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
    )
  }

    const showSuccess = () => {
      return (
        <div
          className="alert alert-info"
          style={{ display: success ? "" : "none" }}
        >
          New Account is created. Please <Link to='/signin'>Sign in.</Link>
        </div>
      );
    };
  return (
    <Layout title="Sign Up" description="Sign Up">
      {showSuccess()}
      {showError()}
      {signUpform()}
    {JSON.stringify(values)} 
    {/* {values} would not work as it is an object */}
    
  
    </Layout>
  );
}

export default Signup; 