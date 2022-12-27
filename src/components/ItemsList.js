import React, { useEffect, useState } from "react";
import itemService from "../services/item.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";
import FilterItems from "./FilterItems";
import { t } from "i18next";

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const user = AuthService.getCurrentUser().roles;
  const [filterTextValue, setFilterTextValue] = useState('All');
  const filteredItemList = items.filter((product) => {
    if(filterTextValue === 'Aktyvus'){
      return product.statusas === 'Aktyvus';
    } else if(filterTextValue === 'Neaktyvus'){
      return product.statusas === 'Neaktyvus';
    } else {
      return product;
    }
  });

  const onFilterValueSelected = (filterValue) => { setFilterTextValue(filterValue)}
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    itemService
      .getAll()
      .then((response) => {
        console.log("Printing Items data", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    itemService
      .remove(id)
      .then((response) => {
        console.log("Item deleted");
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

  const filtered = filteredItemList.filter(c => {//ciaa
    return c.pavadinimas.toLowerCase().includes(searchInput.toLowerCase()) || c.aprasymas.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div className="container">
      <h3>{t('itemslist')}</h3>
      <hr />
      <div>
      <input
          type="search"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput} />
      {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MODERATOR")) &&
        <Link
          to="/items/add"
          className="btn btn-outline-primary btn-block btn-lg mb-2"
        >
          {t('addItem')}
        </Link>}
        <FilterItems filterValueSelected={onFilterValueSelected}></FilterItems>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
            <th>{t('itemname')}</th>
              <th>{t('itemcode')}</th>
              <th>{t('itemdesc')}</th>
              <th>{t('itemgroup')}</th>
              <th>{t('itemstatus')}</th>
              {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MODERATOR")) &&
              <th>{t('actions')}</th>}
            </tr>
          </thead>
          <tbody>
          {filtered.map((item) => (///// cia
              <tr key={item.id}>
                <td>{item.pavadinimas}</td>
                <td>{item.kodas}</td>
                <td>{item.aprasymas}</td>
                <td>{item.grupe}</td>
                <td>{item.statusas}</td>
                {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MODERATOR")) &&
                <td>
                  <Link
                    to={`/items/edit/${item.id}`}
                    className="btn btn-outline-success mt-2 mr-2"
                  >
                    {t('edit')}
                  </Link>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={(e) => {
                      handleDelete(item.id);
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

export default ItemsList;
