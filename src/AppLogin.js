import React, { Component } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
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
import EventBus from "./common/EventBus";
import AddItem from "./components/AddItem";
import AddCustomer from "./components/AddCustomer";
import CustomersList from "./components/CustomersList";
import InvoicePreview from "./components/InvoicePreview";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import Recover from "./components/recovery.component";
import { withTranslation } from "react-i18next";
import LanguageSwitcher from "./language-switcher";
import NotFound from "./components/NotFound";


const isAdmin = (AuthService.getCurrentUser() != null && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN"))
const isModerator = (AuthService.getCurrentUser() != null && AuthService.getCurrentUser().roles.includes("ROLE_MODERATOR"))
const isUser = (AuthService.getCurrentUser() != null && AuthService.getCurrentUser().roles.includes("ROLE_USER"))
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
        showUserBoard: user.roles.includes("ROLE_USER"),
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
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
    const {t} = this.props;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Codeacademy
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                {t('home')}
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  {t('moderatorBoard')}
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  {t('adminBoard')}
                </Link>                
              </li>
            )}

            {showInvoices && (
              <li className="nav-item">
                <Link to={"/invoices"} className="nav-link">
                  {t('invoices')}
                </Link>
              </li>
            )}

            {showItems && (
              <li className="nav-item">
                <Link to={"/items"} className="nav-link">
                  {t('items')}
                </Link>
              </li>
            )}

            {showCustomers && (
              <li className="nav-item">
                <Link to={"/customers"} className="nav-link">
                  {t('customers')}
                </Link>
              </li>
            )}

            

            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  {t('user')}
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
                  {t('logOut')}
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  {t('logIn')}
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  {t('signUp')}
                </Link>
              </li>
            </div>
          )}
          <LanguageSwitcher/>
        </nav>

        <div className="container mt-3">
          <Routes>
          <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={isAdmin || isModerator || isUser ? <Profile /> : <Navigate to ="/login"/>} />
            
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            
            <Route path="/invoices" element={isAdmin || isModerator || isUser ? <InvoiceList /> : <Navigate to ="/login"/>}></Route>
            <Route path="/invoices/add/" element={isAdmin || isModerator || isUser ? <AddInvoice /> : <Navigate to ="/login"/>}></Route>
            <Route path="/invoices/edit/:id" element={isAdmin || isModerator || isUser ? <AddInvoice /> : <Navigate to ="/login"/>}></Route>
            <Route path="/invoices/invoicepreview/:id" element={isAdmin || isModerator || isUser ? <InvoicePreview /> : <Navigate to ="/login"/>}></Route>
            
            <Route path="/items" element={isAdmin || isModerator || isUser ? <ItemsList /> : <Navigate to ="/login"/>}></Route>
            <Route path="/items/add/" element={isAdmin || isModerator ? <AddItem /> : <Navigate to ="/login"/>}></Route>
            <Route path="/items/edit/:id" element={isAdmin || isModerator ? <AddItem /> : <Navigate to ="/login"/>}></Route>

            <Route path="/customers" element={isAdmin || isModerator || isUser ? <CustomersList /> : <Navigate to ="/login"/>}></Route>
            <Route path="/customers/add" element={isAdmin || isModerator ? <AddCustomer /> : <Navigate to ="/login"/>}></Route>
            <Route path="/customers/edit/:id" element={isAdmin || isModerator ? <AddCustomer /> : <Navigate to ="/login"/>}></Route>
           
            <Route path="/users/add/" element={isAdmin ? <AddUser /> : <Navigate to ="/login"/>}></Route>
            <Route path="/users/edit/:id" element={isAdmin ? <AddUser /> : <Navigate to ="/login"/>}></Route>
            <Route path="/users" element={isAdmin ? <UserList /> : <Navigate to ="/login"/>}></Route>
            <Route path="/recover" element={<Recover />}></Route>
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default withTranslation() (AppLogin);