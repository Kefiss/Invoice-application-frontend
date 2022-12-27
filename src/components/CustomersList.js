import React, { useEffect, useState } from "react";
import customerService from "../services/customer.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";
import FilterCustomers from "./FilterCustomers";
import { t } from "i18next";


const CustomersList = () => {
  const [customers, setItems] = useState([]);
  const [filterCustomerValue, setFilterCustomerValue] = useState('All');
  const filteredCustomerList = customers.filter((product) => {
    if(filterCustomerValue === 'Aktyvus'){
      return product.klientoStatusas === 'Aktyvus';
    } else if(filterCustomerValue === 'Neaktyvus'){
      return product.klientoStatusas === 'Neaktyvus';
    } else {
      return product;
    }
  });

  const [searchInput, setSearchInput] = useState("");
  const user = AuthService.getCurrentUser().roles;
  const onFilterValueSelected = (filterValue) => {
    setFilterCustomerValue(filterValue) }


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
  const filtered = filteredCustomerList.filter(c => { //ciaa
    return c.vardas.toLowerCase().includes(searchInput.toLowerCase()) || c.pavarde.toLowerCase().includes(searchInput.toLowerCase());
  });
  return (
    <div className="container">
      <h3>{t('clist')}</h3>
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
          {t('addcustomer')}
        </Link>}
        <FilterCustomers filterValueSelected={onFilterValueSelected}></FilterCustomers>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
          <tr>
              <th>{t('cname')}</th>
              <th>{t('clastname')}</th>
              {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MODERATOR")) &&<>
              <th>{t('cemail')}</th>
              <th>{t('ctype')}</th>
              <th>{t('caddress')}</th>
              <th>{t('cphone')}</th></>}
              <th>{t('cstatus')}</th>
              {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MODERATOR")) &&
              <th>{t('actions')}</th>}
            </tr>
          </thead>
          <tbody>
          {filtered.map((customer) => ( //ciaa
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
                    {t('edit')}
                  </Link>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={(e) => {
                      handleDelete(customer.id);
                    }}
                  >
                    {t('delete')}
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
