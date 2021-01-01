import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import LogIn from "./components/LogIn.component";
import Navbar from "./components/navbar.component";
import ItemsList from "./components/items-list.component";
import ShoppingCart from "./components/ShoppingCart.component";
import CreateUser from "./components/create-user.component";
import CreateItem from "./components/create-item.component";
import WorkerOrders from "./components/WorkerOrders.component";
import UserOrders from "./components/UserOrders.component";

function App() {
  return (
    <Router>
          <Navbar />
          <br/>
          <Route path = "/" exact component = {LogIn}/>
          <Route path = "/item" exact component = {ItemsList}/>
          <Route path = "/cart" exact component = {ShoppingCart}/>
          <Route path = "/user" exact component = {CreateUser}/>
          <Route path = "/create" exact component = {CreateItem}/>
          <Route path = "/workerOrders" exact component = {WorkerOrders}/>
          <Route path = "/userOrders" exact component = {UserOrders}/>
    </Router>
  );
}



export default App;
