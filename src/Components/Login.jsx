import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNIN_USER } from "../gqlOpt/mutation";

const Login = () => {
  const [signinUser, { data, loading, error }] = useMutation(SIGNIN_USER);
  const [datas, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setData({ ...datas, [name]: value });
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await signinUser({
      variables: {
        email: datas.email,
        password: datas.password,
      },
    })
      .then((resp) => {
        if (resp.data.signinUser.token) {
          let token = resp.data.signinUser.token;
          localStorage.setItem("token", token);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
    if (!loading) {
      setData({ ...datas, email: "", password: "" });
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="container mycontainer">
        {error ? <div className="red card-panel">{error.message}</div> : ""}
        <h5>Login!!</h5>
        <form onSubmit={handleLogin}>
          <div className="row">
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
              Don't Have an Account <Link to="/signup">Signup</Link>
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

export default Login;
