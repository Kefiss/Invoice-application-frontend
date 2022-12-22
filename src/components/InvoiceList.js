import React, { useEffect, useState} from "react";
import invoiceService from "../services/invoice.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const user = AuthService.getCurrentUser().roles;
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    
    invoiceService
      .getAll()
      .then((response) => {
        console.log("Printing Invoices data", response.data);
        setInvoices(response.data);
      })
      .catch((error) => {
        console.log("Upsss", error);
        return 
      });
      
  };

  const handleDelete = (id) => {
    invoiceService
      .remove(id)
      .then((response) => {
        console.log("Invoice deleted");
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

  const filtered = invoices.filter(c => {
    return c.customerId.vardas.toLowerCase().includes(searchInput.toLowerCase()) || c.customerId.pavarde.toLowerCase().includes(searchInput.toLowerCase());
  });
 
  return (
    <div className="container">
      <h3>Sąskaitų sąrašas</h3>
      <hr />
      <div>
      <input
          type="search"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput} />
        <Link to = "/invoices/add" className="btn btn-outline-primary btn-block btn-lg mb-2">Pridėti sąskaitą</Link>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>Sąskaitos numeris</th>
              <th>Sąskaitos data</th>
              <th>Klientas</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
          {filtered.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.myDate}</td>
                <td>{invoice.customerId.vardas + " " + invoice.customerId.pavarde}</td>
                <td>
                <Link to={`/invoices/invoicepreview/${invoice.id}`} className="btn btn-outline-info mr-2">
                    Peržiura
                  </Link>
                
                  <Link to={`/invoices/edit/${invoice.id}`} className="btn btn-outline-success">
                    Atnaujinti
                  </Link>
                  {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MODERATOR")) &&
                  <button 
                    className="btn btn-outline-danger ml-2"
                    onClick={(e) => {
                      handleDelete(invoice.id);
                    }}
                  >
                    Ištrinti
                  </button>}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
