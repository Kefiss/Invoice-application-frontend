import React, { useEffect, useState } from "react";
import userService from "../services/user.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomersList = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    userService
      .getAll()
      .then((response) => {
        console.log("Printing User data", response.data);
        setUsers(response.data);
 
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    userService
      .remove(id)
      .then((response) => {
        console.log("user deleted");
        init();
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  
  };

  const filtered = users.filter(c => {
    return c.username.toLowerCase().includes(searchInput.toLowerCase()) || c.roles.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div className="container">
      <h3>Useriu sąrašas</h3>
      <hr />
      <div>
      <input
          type="search"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput} />
        <Link
          to="/users/add"
          className="btn btn-outline-primary btn-block btn-lg mb-2"
        >
          Pridėti useri
        </Link>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Roles</th>
              <th>Veiksmai</th> 
            </tr>
          </thead>
          <tbody>
          {filtered.map((users) => (
              <tr key={users.id}>
                <td>{users.username}</td>
                <td>{users.roles.name}</td>
                <td> 
                  <Link
                    to={`/users/edit/${users.id}`}
                    className="btn btn-outline-success mt-2 mr-2"
                  >
                    Atnaujinti
                  </Link>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={(e) => {
                      handleDelete(users.id);
                    }}
                  >
                    Ištrinti
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersList;