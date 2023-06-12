import React, { useEffect, useState } from "react";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { NavLink } from "react-router-dom";

const AllUsers = () => {
  const [userdetail, setUserdetail] = useState([]);

  const getData = async () => {
    const res = await fetch("http://localhost:5001/alluser");

    const data = await res.json();
    setUserdetail(data);
    console.warn(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = async (id) => {
    const res = await fetch(`http://localhost:5001/delete/${id}`, {
      method: "delete",
    });
    const data = await res.json();
    if (data) {
      getData();
    }
  };
  /*
     const deleteUser = (id)=>{
         const result = await fetch(`http://localhost/delete/${id}`,{
            method:"delete"
         })
         const res = await result.json()

         if(res){
            getData
         }
     }
  
  */

  return (
    <div className="container">
      <h2 style={{ marginLeft: 440, marginTop: 25 }}>All_Users_Details</h2>
      <hr style={{ marginLeft: 300 }}></hr>
      <div className="mt-5" style={{ width: 1000, marginLeft: 120 }}>
        <table class="table table-striped ">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">job</th>

              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {userdetail.map((item, id) => {
              return (
                <>
                  <tr>
                    <th scope="row">{id}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.job}</td>
                    <td className="d-flex justify-content-between">
                      <NavLink to={`/view/${item._id}`}>
                        <button className="btn btn-success ">
                          <RemoveRedEyeTwoToneIcon />
                        </button>
                      </NavLink>
                      <NavLink to={`/edit/${item._id}`}>
                        <button className="btn btn-primary">
                          <EditTwoToneIcon />
                        </button>
                      </NavLink>

                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUser(item._id)}
                      >
                        <DeleteForeverIcon />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
