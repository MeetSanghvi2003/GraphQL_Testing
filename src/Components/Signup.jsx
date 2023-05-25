import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP_USER } from "../gqlOpt/mutation";

const Signup = () => {
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  const [datas, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setData({ ...datas, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        email: datas.email,
        password: datas.password,
        firstname: datas.firstname,
        lastname: datas.lastname,
      },
    })
      .then((resp) => console.log(resp))
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setData({
        ...data,
        email: "",
        password: "",
        lastname: "",
        firstname: "",
      });
    }, 1000);
  };

  return (
    <>
      {data && (
        <div className="green card-panel">
          {data.signupUser.firstname} is Registered successfully !
        </div>
      )}
      <div className="container mycontainer">
        {error ? <div className="red card-panel">{error.message}</div> : ""}
        <h5>Sign Up!!</h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field">
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                value={datas.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={datas.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={datas.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={datas.password}
                onChange={handleChange}
              />
            </div>
            <p>
              Already Have an Account? <Link to="/login">Login</Link>
            </p>

            <button className="btn deep-purple" type="submit">
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
