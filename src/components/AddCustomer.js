import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import customerService from "../services/customer.service";
import { t } from "i18next";

const AddCustomer = () => {
  const [vardas, setFirstName] = useState('');
    const [pavarde, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [tipas, setType] = useState('');
    const [adresas, setAddress] = useState('');
    const [telNumeris, setPhone] = useState('');
    const [klientoStatusas, setCustomerStatus] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();


    const customer = {vardas, pavarde, email, tipas, adresas, telNumeris, klientoStatusas, id};
    const saveCustomer = (e) => {
        e.preventDefault();
        console.log(customer);
        
        if (id) {
            // update record
            customerService.update(customer)
                .then(response => {
                    console.log('Employee data updated successfully', response.data);
                    navigate('/customers'); 
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        } else {
            // create new record
            customerService.create(customer)
            .then(response => {
                console.log('Employee added successfully',  response.data);
                navigate('/customers');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    }

    useEffect(() => {
        console.log(customer)
        if (id) {
          customerService.get(id)
                .then(customer => {
                    setFirstName(customer.data.vardas);
                    setLastName(customer.data.pavarde);
                    setEmail(customer.data.email);
                    setType(customer.data.tipas);
                    setAddress(customer.data.adresas);
                    setPhone(customer.data.telNumeris);
                    setCustomerStatus(customer.data.klientoStatusas);
                    
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    },[])

    return(
        <div className="container">
            <h3>{t('addCustomer')}</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="vardas"
                        value={vardas}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={t('enterCustomerName')}
                     />

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="pavarde"
                       value={pavarde}
                       onChange={(e) => setLastName(e.target.value)}
                       placeholder={t('enterCustomerLastName')}
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder={t('enterCustomerEmail')}
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="tipas"
                       value={tipas}
                       onChange={(e) => setType(e.target.value)}
                       placeholder={t('enterCustomerType')}
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="adresas"
                       value={adresas}
                       onChange={(e) => setAddress(e.target.value)}
                       placeholder={t('enterCustomerAddress')}
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="telNumeris"
                       value={telNumeris}
                       onChange={(e) => setPhone(e.target.value)}
                       placeholder={t('enterCustomerPhone')}
                    /> 

                </div>
                <div className="form-group ">
                    <select className="form-control col-4" onChange={(e) => setCustomerStatus(e.target.value)}>
                     <option value="Aktyvus">{t('active')}</option>
                    <option value="Neaktyvus">{t('blocked')}</option>
                    </select>   
                </div>
                <br />
                <hr/>
                <div>
                    <button onClick={(e) => saveCustomer(e)}
                    className="btn btn-primary">Save</button>
                    <button onClick={() => navigate('/customers')} className="btn btn-info ml-2 ">
                    {t('btnBack')}
                    </button>
                </div>
            </form>
            <hr/>
        </div>
    )
};

export default AddCustomer;
