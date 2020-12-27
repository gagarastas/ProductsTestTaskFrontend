import './App.css';
import React, {Component} from "react";
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import AddingProductForm from "./components/AddingProductForm";
import ChangingProductForm from "./components/ChangingProductForm";
import Products from "./components/Products";

class App extends Component {
  render() {
    const { history } = this.props

    return (
      <div className="App">
        <Switch>
          <Route history={history} path='/addProduct' component={AddingProductForm} />
          <Route history={history} path='/changeProduct/:id' component={ChangingProductForm} />
          <Route history={history} path='/' component={Products} />
        </Switch>

      </div>
    );
  }
}


export default withRouter(App);