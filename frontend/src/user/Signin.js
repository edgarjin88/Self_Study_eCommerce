import React, {useState} from "react";
import Layout from "../core/Layout";
import { signin } from "../auth";
import {Link, Redirect } from "react-router-dom";



const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer:false,
  });

  const { email, error, password, loading, redirectToReferrer} = values;


  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // prevState not required in this case

  const clickSubmit = e => {
    e.preventDefault();

    setValues({ ...values, loading:true, error: false });

    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {

        setValues({
          ...values,
          redirectToReferrer: true
        });
      }
    });
  };

  const signUpform = () => (
    <form>
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

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showLoading = () => {
    return (
      loading && (<div className="alert alert-info">
        <h2>Loading...</h2>
      </div>)
    );
  };

  const redirectUser = () =>{
    if(redirectToReferrer){
      return <Redirect to="/"/>
    }
  } // redirect. 
  return (
    <Layout title="Sign Up" description="Sign Up">
      {showLoading()}
      {showError()}
      {signUpform()}
      {redirectUser()}
      {/* making number of object here. Is this the best practice? */}

      {/* {values} so JSON.stringify to show would not
       work as it is an object */}
    </Layout>
  );
};

export default Signin; 