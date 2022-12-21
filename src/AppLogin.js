import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import ItemsList from "./components/ItemsList";
import InvoiceList from "./components/InvoiceList";
import AddInvoice from "./components/AddInvoice";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import AddItem from "./components/AddItem";
import AddCustomer from "./components/AddCustomer";
import CustomersList from "./components/CustomersList";
import InvoicePreview from "./components/InvoicePreview";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
class AppLogin extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showUserBoard: false,
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      showInvoices: false,
      showItems: false,
      showCustomers: false,
      showUsers: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        //showUserBoard: user.roles.includes("ROLE_USER"),
        //showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        //showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showInvoices: user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_MODERATOR"),       
        showItems: user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_MODERATOR"),
        showCustomers: user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_MODERATOR"),
        showUsers: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      showUserBoard: false,
      showInvoices: false,
      showItems: false,
      showCustomers: false,
      showUsers: false,
    });
  }

  render() {
    const { currentUser, showUserBoard, showModeratorBoard, showAdminBoard, showInvoices, showItems, showCustomers, showUsers } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Codeacademy
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>                
              </li>
            )}

            {showInvoices && (
              <li className="nav-item">
                <Link to={"/invoices"} className="nav-link">
                  Invoices
                </Link>
              </li>
            )}

            {showItems && (
              <li className="nav-item">
                <Link to={"/items"} className="nav-link">
                  Items
                </Link>
              </li>
            )}

            {showCustomers && (
              <li className="nav-item">
                <Link to={"/customers"} className="nav-link">
                  Customers
                </Link>
              </li>
            )}

            

            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}

          {showUsers && (
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/invoices" element={<InvoiceList />}></Route>
            <Route path="/invoices/add/" element={<AddInvoice />}></Route>
            <Route path="/invoices/edit/:id" element={<AddInvoice />}></Route>
            <Route path="/invoices/invoicepreview/:id" element={<InvoicePreview />}></Route>
        
            <Route path="/items" element={<ItemsList />}></Route>
            <Route path="/items/add/" element={<AddItem />}></Route>
            <Route path="/items/edit/:id" element={<AddItem />}></Route>
            <Route path="/customers" element={<CustomersList />}></Route>
            <Route path="/customers/add/" element={<AddCustomer />}></Route>
            <Route path="/customers/edit/:id" element={<AddCustomer />}></Route>
            <Route path="/users/add/" element={<AddUser />}></Route>
            <Route path="/users/edit/:id" element={<AddUser />}></Route>
            <Route path="/users" element={<UserList />}></Route>
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default AppLogin;