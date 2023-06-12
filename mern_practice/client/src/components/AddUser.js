import React, { useState } from "react";
import Swal from "sweetalert2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import OnDeviceTrainingOutlinedIcon from "@mui/icons-material/OnDeviceTrainingOutlined";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
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

  const addCrudUser = async (e) => {
    const { name, email, password, job, mobile } = inpval;
    e.preventDefault();
    if (name === "") {
      Swal.fire("please fill the name field");
    } else if (email === "") {
      Swal.fire("please fill the email field");
    } else if (!email.includes("@")) {
      Swal.fire("please enter valid email");
    } else if (password === "") {
      Swal.fire("please fill the password field");
    } else if (password.length < 6) {
      Swal.fire("please enter valid password");
    } else if (job === "") {
      Swal.fire("please fill the job field");
    } else if (mobile === "") {
      Swal.fire("please fill the mobile field");
    } else {
      Swal.fire({
        icon: "success",
        title: "congrats...",
        text: "user successfully added",
      });

      const res = await fetch("http://localhost:5001/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, job, mobile }),
      });
      const data = await res.json();
      console.warn(data);
      if (res.status === 422 || !data) {
        Swal.fire("something went wrong");
      } else {
        Swal.fire({
          icon: "success",
          title: "congrats...",
          text: "user successfully registered",
        });
        navigate("/all");
      }
    }
  };

  return (
    <>
      <h2
        style={{
          marginTop: 30,
          marginLeft: 150,
        }}
      >
        ADD-USER for crud operation
      </h2>
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

          <button type="submit" class="btn btn-primary" onClick={addCrudUser}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
