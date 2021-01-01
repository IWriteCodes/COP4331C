import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        
        if (localStorage.getItem("UserType").localeCompare("user") === 0)
        {
            return (
                <nav className = "navbar navbar-dark bg-info navbar-expand-lg">
                    <Link to = "/" className = "navbar-brand">Restaurant System</Link>
                    <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li className = "navbar-item">
                        <Link to = "/item" className = "nav-link">Items</Link>
                        </li>
                        <li className = "navbar-item">
                        <Link to = "/cart" className = "nav-link">Shopping Cart</Link>
                        </li>
                        <li className = "navbar-item">
                        <Link to = "/userOrders" className = "nav-link">Orders</Link>
                        </li>
                    </ul>
                    </div>
                </nav>
            )
        }
        else
        {
            return (
                <nav className = "navbar navbar-dark bg-info navbar-expand-lg">
                    <Link to = "/" className = "navbar-brand">Restaurant System</Link>
                    <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li className = "navbar-item">
                        <Link to = "/workerOrders" className = "nav-link">Orders</Link>
                        </li>
                    </ul>
                    </div>
                </nav>
            );
        }   
    }
}
