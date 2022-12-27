import React, { useEffect, useState} from "react";
import invoiceService from "../services/invoice.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";
import { t } from "i18next";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filterInvoiceValue] = useState('All');
  const filteredInvoiceList = invoices.filter((product) => {
    if(filterInvoiceValue === 'Aktyvus'){
      return product.klientoStatusas === 'Aktyvus';
    } else if(filterInvoiceValue === 'Neaktyvus'){
      return product.klientoStatusas === 'Neaktyvus';
    } else {
      return product;
    }
  });
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

  const filtered = filteredInvoiceList.filter(c => {
    return c.customerId.vardas.toLowerCase().includes(searchInput.toLowerCase()) || c.customerId.pavarde.toLowerCase().includes(searchInput.toLowerCase());
  }); 
 
  return (
    <div className="container">
      <h3>{t('invoiceList')}</h3>
      <hr />
      <input
          className=" btn-outline-primary bg-white text-secondary btn-block btn-lg mb-2"
          type="search"
          placeholder={t('invoiceSearch')}
          onChange={handleChange}
          value={searchInput} />
      <hr /> 
      {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MANAGER"))}   
      <div>
        <Link to = "/invoices/add" className="btn btn-outline-primary btn-block btn-lg mb-2">{t('addInvoice')}</Link>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
          <tr>
              <th>{t('invoiceNumber')}</th>
              <th>{t('invoiceDate')}</th>
              <th>{t('customer')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
          {filtered.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.myDate}</td>
                <td>{invoice.customerId.vardas + " " + invoice.customerId.pavarde}</td>
                <td style={{textAlign:"center"}}>
                <Link to={`/invoices/invoicepreview/${invoice.id}`} className="btn btn-outline-info mr-2">
                    {t('preview')}
                  </Link>
                
                  <Link to={`/invoices/edit/${invoice.id}`} className="btn btn-outline-success">
                    {t('btnEdit')}
                  </Link>
                  {(user.includes("ROLE_ADMIN") || user.includes("ROLE_MANAGER")) &&
                  <button 
                    className="btn btn-outline-danger ml-2"
                    onClick={(e) => {
                      handleDelete(invoice.id);
                    }}
                  >
                    {t('btnDelete')}
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
