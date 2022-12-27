import React from "react";
import Select from "react-select"
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import invoiceService from "../services/invoice.service";
import customerService from "../services/customer.service";
import "bootstrap/dist/css/bootstrap.min.css";
import itemService from "../services/item.service";
import { t } from "i18next";



const AddInvoice = () => {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [myDate, setDate] = useState('');
    const [customer, setCustomer] = useState([]);
    const [invoiceItems, setInvoiceItems] = useState([{ item: "", quantity: "", price: "" }]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [customerId, setCustomers] = useState([]);
    const [items, setItems] = useState([]);
    
    const init = () => {
        customerService
            .getAll()
            .then((response) => {
                console.log("Printing Customer data", response.data);////
                setCustomer(response.data);
            })
            .catch((error) => {
                console.log("Ups", error);
            });

        itemService
            .getAll()
            .then((response) => {
                console.log("Printing Items data", response.data);/////
                setItems(response.data);
                
            })
            .catch((error) => {
                console.log("Ups", error);
            });  
    };

    const saveInvoice = (e) => {
        e.preventDefault();
        const invoice = {invoiceNumber, myDate, invoiceItems, customerId ,id } ;

        if (id) {
            invoiceService.update(invoice)
                .then(response => {
                    console.log('Invoice data updated successfully', response.data);////
                    navigate('/invoices'); 
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })}
        else {
            invoiceService.create(invoice)
                .then(response => {
                    console.log('Invoice added successfully',  response.data);
                    navigate('/invoices');
                })
                .catch(error => {
                    console.log('Something went wrong555', error);
                })
            }
        }

  
    useEffect(() => {
        init();
       
        if (id) {
          invoiceService.get(id)
            .then(invoice => {
                setInvoiceNumber(invoice.data.invoiceNumber);
                setDate(invoice.data.myDate);
                setCustomers(invoice.data.customerId);
                setInvoiceItems(invoice.data.invoiceItems);     
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    },[])


    let addFormFields = () => {  /////////////////////
        setInvoiceItems([...invoiceItems, { item: "", quantity: "", price: ""}])
      }
    
    let removeFormFields = (i) => {
        let newInvoiceItems = [...invoiceItems];
        newInvoiceItems.splice(i, 1);
        setInvoiceItems(newInvoiceItems)
    }

    let handleChange = (option, index, name) => {
        
        const value = option;
       
        const list = [...invoiceItems];
       list[index][name] = value;
        list[index]["price"] = option.bazineKaina;
        //
        if (option.price > 0) { 
            console.log("suveikeee")
            list[index][name] = value.price;
        }
        setInvoiceItems(list);
     }
     const filteredCustomerList = customer.filter((product) => {

        return product.klientoStatusas === 'Aktyvus'; 
      }); 

    const filteredItemList = items.filter((product) => {
          return product.statusas === 'Aktyvus';
  
    });

    return(
        <div className="container">
            <h3>{t('addInvoice')}</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                       type="date"
                       className="form-control col-4"
                       id="date"
                       value={myDate}
                       onChange={(e) => setDate(e.target.value)}
                       placeholder="Įveskite data"
                    /> 
                </div>
                
                <div className="form-group">
                    <Select     
                        value={customerId}             
                        options={filteredCustomerList}
                        getOptionLabel = {a => a.vardas + " " + a.pavarde}
                        getOptionValue={a => a}  
                        className=" col-4"
                        id="customer"
                        onChange={(e) => setCustomers(e)} 
                        > 
                    </Select>
                </div>
                
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="Invoice number"
                       value={invoiceNumber}
                       onChange={(e) => setInvoiceNumber(e.target.value)}
                       placeholder={t('enterInvoiceNumber')}
                    />
                </div>

                <div className="form-block"> 
                    {invoiceItems.map((element, index) => { 
                        return(
                            <div className="form-inline" key={index}>
                                <Select 
                                    className="col-4"
                                    name="item"
                                    options={filteredItemList}
                                    getOptionLabel = {a => a.pavadinimas}
                                    getOptionValue = {a => a}
                                    value={element.item}
                                    onChange={e => handleChange(e, index, "item")}
                                />
                            
                                <input 
                                    type="text"
                                    name="quantity"
                                    className="form-control col-4" 
                                    placeholder={t('enterQuantity')}  
                                    value={element.quantity}     
                                    onChange = {e => handleChange(e.target.value, index, "quantity")}                              
                                />
                                <input 
                               //defaultValue={ element.item.bazineKaina = element.price}
                               
                                    type="number" 
                                    name="price"
                                    className="form-control col-2 ml-2" 
                                    options={items}   
                                    //{price=element.item.bazineKaina}                                
                                    placeholder={element.item.bazineKaina}
                                    //value={element.price = element.item.bazineKaina}
                                    //defaultValue={element.item.bazineKaina || element.price}
                                    value={element.price}
                                    
                                      
                                    onChange = {e => handleChange(e.target.value, index, "price")}                              
                                />
                                 
                                {invoiceItems.length > 1 &&(
                                    <button type="button"  className="btn btn-success" onClick={() => removeFormFields(index)}>{t('btnDelete')}</button> 
                                )}
                            </div>
                        )})
                    }
                
                <button 
                        className="btn btn-danger mt-2" 
                        type="button" 
                        onClick={() => addFormFields()}> {t('btnAdd')}
                    </button>
                    <button onClick={(e) => saveInvoice(e)}
                    className="btn btn-primary ml-2 mt-2">{t('btnSave')}
                    </button>
                    <button onClick={() => navigate('/invoices')} className="btn btn-info ml-2 mt-2">
                    {t('btnBack')}
                    </button>
                    
                </div>
                <br />
                <div>
                
                   
                </div>
            </form>
            <hr/>
    
        </div>
    )
};

export default AddInvoice;