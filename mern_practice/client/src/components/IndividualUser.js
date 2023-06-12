import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import OnDeviceTrainingOutlinedIcon from "@mui/icons-material/OnDeviceTrainingOutlined";

const IndividualUser = () => {
  const { id } = useParams("");
  const [detail, setDetail] = useState([]);

  const getDetail = async () => {
    const res = await fetch(`http://localhost:5001/indi/${id}`);

    const data = await res.json();
    setDetail(data);
    console.warn(data);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="main">
      <h2 style={{ marginLeft: 600 }}>User-Details</h2>
      <hr style={{ marginLeft: 435 }}></hr>
      <div className="card" style={{ width: 450, marginLeft: 500 }}>
        <div className="card-body">
          <h4 className="card-title">IndividualUserDetail</h4>
          <div className="card-detail">
            <h6>
              <AccountCircleIcon />- Name : <span>{detail.name}</span>
            </h6>
            <h6>
              <EmailOutlinedIcon />- Email : <span>{detail.email}</span>
            </h6>
            <h6>
              <LockOutlinedIcon />- Password : <span>{detail.password}</span>
            </h6>
            <h6>
              <WorkOutlinedIcon />- Job : <span>{detail.job}</span>
            </h6>
            <h6>
              <OnDeviceTrainingOutlinedIcon />- Mobile :{" "}
              <span>{detail.mobile}</span>
            </h6>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-success">edit</button>

            <button className="btn btn-danger">delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualUser;
