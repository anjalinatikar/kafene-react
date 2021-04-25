import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { setAuth, isAuth } from '../../utils/auth';
import './Navbar.css';

function Navbar(props) {

    const handleLogout = () => {
        setAuth(false);
        return props.history.push('/');
    }

    const  isActive = {
        'orders': false,
        'products': false,
        'users': false
    };
    const pageName=props.location.pathname.slice(1);
    isActive[pageName]=true;
    return (
        <div className="Topbar">
            <div className="LeftMenu">
                <div className="LogoWrapper">
                    <Link to='/'>
                        <img src="https://raw.githubusercontent.com/pawankumargali/kafene/main/images/logo.png" 
                            alt="Logo" 
                        />
                    </Link>
                    <p className="BrandName">Kafene</p>
                </div>
                
                {isAuth() &&
                <nav>
                    <Link className={isActive['orders'] ? "MenuItem MenuItemActive" : "MenuItem"} to='/orders' >Orders</Link>
                    <Link className={isActive['products'] ? "MenuItem MenuItemActive" : "MenuItem"} to='/products' >Products</Link>
                    <Link className={isActive['users'] ? "MenuItem MenuItemActive" : "MenuItem"} to='/users' >Users</Link>
                    <button 
                        id="logout-btn" 
                        className="LogoutBtn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </nav> 
                }
            </div>
        </div>
    )
}

export default withRouter(Navbar);
