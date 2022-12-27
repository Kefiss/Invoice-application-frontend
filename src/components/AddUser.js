import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import userService from "../services/user.service";
import Select from "react-select"
import roleService from "../services/role.service";
import { t } from "i18next";

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [roles, setRoles] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleList, setRoleList] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const saveUser = (e) => {
        e.preventDefault();
        const user = {username, name, lastName, password, email, roles, id};
        if (id) {
            // update record
            userService.update(user, id)
                .then(response => {
                    console.log('User data updated successfully', response.data);
                    navigate('/users'); 
            })
            .catch(error => {
                console.log('Something went wrong3333', error);
            })
        } else {
            // create new record
            userService.create(user)
            .then(response => {
                console.log('User added successfully',  response.data);
                navigate('/users');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    }
    useEffect(() => {
        if (id) {
          userService.get(id)
                .then(user => {
                    setUsername(user.data.username);
                    setName(user.data.name);
                    setLastName(user.data.lastName);
                    setPassword(user.data.password);
                    setEmail(user.data.email);
                    setRoles(user.data.roles)              
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
        roleService.getAll()
            .then((response) => {
            setRoleList(response.data);
        })
        .catch((error) => {
            console.log("Ups", error);
        }); 
    },[])

    return(
        <div className="container">
            <h3>{t('adduser')}</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="vardas"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={t('enterUserName')}
                     />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="vardas"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('enterName')}
                     />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="pavardė"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={t('enterLastName')}
                     />
                </div>
                {!id &&
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="password"
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder={t('enterPassword')}
                    /> 
                </div>}
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder={t('enterEmail')}
                    /> 
                </div>
                <div className="form-group">
                    <Select     
                        value={roles}             
                        options={roleList}
                        getOptionLabel = {a => a.name}
                        getOptionValue={a => a}  
                        className=" col-4"
                        id="roles"
                        placeholder={t('select')}
                        onChange={(e) => setRoles(e)} 
                        > 
                    </Select>
                    </div>
                <br />
                <hr/>
                <div>
                    <button onClick={(e) => saveUser(e)}
                    className="btn btn-primary">{t('btnSave')}</button>
                    <button onClick={() => navigate('/users')} className="btn btn-info ml-2 ">
                    {t('btnBack')}
                    </button>
                </div>
            </form>
            <hr/>

        </div>
    )
};

export default AddUser;