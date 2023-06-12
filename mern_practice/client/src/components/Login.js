import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("local");
    if (auth) {
      navigate("/add");
    }
  }, []);

  const [inpval, setINP] = useState({
    email: "",
    password: "",
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

  const signin = async (e) => {
    const { email, password } = inpval;
    e.preventDefault();
    if (email === "") {
      Swal.fire("please fill the email field");
    } else if (!email.includes("@")) {
      Swal.fire("please enter valid email");
    } else if (password === "") {
      Swal.fire("please fill the password field");
    } else if (password.length < 6) {
      Swal.fire("password not matched");
    } else {
      Swal.fire({
        icon: "success",
        title: "congrats...",
        text: "user successfully registered",
      });

      const res = await fetch("http://localhost:5001/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.warn(data);
      if (res.status === 422 || !data) {
        Swal.fire("something went wrong");
      } else {
        localStorage.setItem("local", JSON.stringify(data));
        Swal.fire({
          icon: "success",
          title: "congrats...",
          text: "user successfully loggedin",
        });
        const auth = localStorage.getItem("local");
        if (auth) {
          navigate("/add");
        }
      }
    }
  };

  return (
    <>
      <h2 style={{ marginTop: 30, marginLeft: 200 }}>Login_page</h2>
      <hr></hr>
      <div className="container mt-5">
        <form className=" mi-5" style={{ width: 500 }}>
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

          <button type="submit" class="btn btn-primary" onClick={signin}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
