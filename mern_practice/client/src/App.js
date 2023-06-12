import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import "./App.css";
import Login from "./components/Login";
import AddUser from "./components/AddUser";
import AllUsers from "./components/AllUsers";
import PrivateComponent from "./components/PrivateComponent";
import IndividualUser from "./components/IndividualUser";
import Edit from "./components/Edit";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateComponent />}>
            <Route path="/add" element={<AddUser />} />
            <Route path="/all" element={<AllUsers />} />
            <Route path="/view/:id" element={<IndividualUser />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
