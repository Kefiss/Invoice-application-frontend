import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import userService from "../services/user.service";
import Select from "react-select"
import roleService from "../services/role.service";

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [roles, setRoles] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleList, setRoleList] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();

    const saveUser = (e) => {
        e.preventDefault();
        const user = {username, password, email, roles, id};

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
            <h3>Pridėti useri</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="vardas"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Įveskite username"
                     />

                </div>
                {!id &&
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="password"
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Įveskite nauja slaptazodi"
                    /> 

                </div>}
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="įveskite el. paštą"
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
                        onChange={(e) => setRoles(e)} 
                        > 
                    </Select>
                </div>

                <br />
                <div>
                    <button onClick={(e) => saveUser(e)}
                    className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/users">Atgal į sąrašą</Link>
        </div>
    )
};

export default AddUser;