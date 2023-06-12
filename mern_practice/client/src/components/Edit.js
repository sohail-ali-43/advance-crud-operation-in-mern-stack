import React, { useEffect, useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import OnDeviceTrainingOutlinedIcon from "@mui/icons-material/OnDeviceTrainingOutlined";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams("");
  //   const [detail, setDetail] = useState([]);
  const [inpval, setINP] = useState({
    name: "",
    email: "",
    password: "",
    job: "",
    mobile: "",
  });

  const setData = (e) => {
    console.warn("e.target.value");
    const { name, value } = e.target;

    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const getDetail = async () => {
    const res = await fetch(`http://localhost:5001/indi/${id}`);

    const data = await res.json();
    setINP(data);
    console.warn(data);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const updateUser = async () => {
    const { name, email, passwors, job, mobile } = inpval;

    const res2 = await fetch(`http://localhost:5001/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, passwors, job, mobile }),
    });

    const data2 = await res2.json();
    console.warn(data2);

    if (res2.status === 422 || !data2) {
      alert("something went wrong");
    } else {
      alert("user data is updated");
    }
    navigate("/all");
  };

  return (
    <>
      <h2 style={{ marginTop: 30, marginLeft: 300 }}>EDIT-USER</h2>
      <hr></hr>
      <div className="container mt-5">
        <form className=" mi-5" style={{ width: 500 }}>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              <AccountCircleIcon />
              Name
            </label>
            <input
              type="text"
              class="form-control"
              value={inpval.name}
              onChange={setData}
              name="name"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              <EmailOutlinedIcon />
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              value={inpval.email}
              onChange={setData}
              name="email"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              <LockOutlinedIcon />
              Password
            </label>
            <input
              type="password"
              class="form-control"
              value={inpval.password}
              onChange={setData}
              name="password"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              <WorkOutlinedIcon />
              Job
            </label>
            <input
              type="text"
              class="form-control"
              value={inpval.job}
              onChange={setData}
              name="job"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              <OnDeviceTrainingOutlinedIcon />
              Mobile
            </label>
            <input
              type="text"
              class="form-control"
              value={inpval.mobile}
              onChange={setData}
              name="mobile"
            />
          </div>
          <NavLink to="/all">
            <button type="update" onClick={updateUser} class="btn btn-primary">
              update
            </button>
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default Edit;
