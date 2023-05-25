import { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./Components/Protected";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import CreateQuote from "./Components/createQuote";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protected Component={Home} />}></Route>
          <Route
            path="/profile"
            element={<Protected Component={Profile} />}
          ></Route>
          <Route
            path="/create"
            element={<Protected Component={CreateQuote} />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
