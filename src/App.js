import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LoggedInRedirect from './components/Routes/LoggedInRedirect';
import PrivateRoute from './components/Routes/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Orders from './pages/Orders/Orders';
import Order from './pages/Order';
import Products from './pages/Products/Products';
import Product from './pages/Product';
import Users from './pages/Users/Users';

const App = () => 
(
  <Router>
    <Navbar />
    <Switch>
      <LoggedInRedirect path="/" exact Component={Login} />
      <PrivateRoute exact path="/orders" Component={Orders} />
      <PrivateRoute exact path="/order/:orderId" Component={Order} />
      <PrivateRoute exact path="/products" Component={Products} />
      <PrivateRoute exact path="/product/:productId" Component={Product} />
      <PrivateRoute exact path="/users" Component={Users} />
    </Switch> 
  </Router>
);

export default App;
