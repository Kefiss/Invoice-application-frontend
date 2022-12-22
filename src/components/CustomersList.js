import React, { useEffect, useState } from "react";
import customerService from "../services/customer.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";

const CustomersList = () => {
  const [customers, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const user = AuthService.getCurrentUser().roles;
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    customerService
      .getAll()
      .then((response) => {
        console.log("Printing Customer data", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    customerService
      .remove(id)
      .then((response) => {
        console.log("Customer deleted");
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

  const filtered = customers.filter(c => {
    return c.vardas.toLowerCase().includes(searchInput.toLowerCase()) || c.pavarde.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div className="container">
      <h3>Klientų sąrašas</h3>
      <hr />
      <div>
      <input
          type="search"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput} />
      {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MODERATOR")) && 
        <Link
          to="/customers/add"
          className="btn btn-outline-primary btn-block btn-lg mb-2"
        >
          Pridėti klientą
        </Link>}
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Pavardė</th>
              {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MODERATOR")) &&<>
              <th>Email</th>
              <th>Tipas</th>
              <th>Adresas</th>
              <th>Telefono numeris</th></>}
              <th>Kliento statusas</th>
              {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MODERATOR")) &&
              <th>Veiksmai</th>}
            </tr>
          </thead>
          <tbody>
          {filtered.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.vardas}</td>
                <td>{customer.pavarde}</td>
                {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MODERATOR")) &&<>
                <td>{customer.email}</td>
                <td>{customer.tipas}</td>
                <td>{customer.adresas}</td>
                <td>{customer.telNumeris}</td></>}
                <td>{customer.klientoStatusas}</td>
                {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MODERATOR")) &&
                <td>
                  <Link
                    to={`/customers/edit/${customer.id}`}
                    className="btn btn-outline-success mt-2 mr-2"
                  >
                    Atnaujinti
                  </Link>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={(e) => {
                      handleDelete(customer.id);
                    }}
                  >
                    Ištrinti
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersList;
