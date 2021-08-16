import React from "react";
import "./App.css";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Catalogue from "./components/Catalogue";
import Questionnaire from "./components/Questionnaire";
import Vehicle from "./components/Vehicle";
import Result from "./components/Result";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import useCart from "./useCart";

export const CartContext = React.createContext(1);

const App = () => {
  const consoleLogCart = useCart();
  return (
    <Router>
      <CartContext.Provider value={consoleLogCart}>
        <Switch className="App">
          <RouteWrapper
            path="/vehicles/:id"
            component={Vehicle}
            layout={Layout}
          />
          <RouteWrapper
            path="/vehicles"
            component={Catalogue}
            layout={Layout}
          />
          <RouteWrapper
            path="/questions"
            component={Questionnaire}
            layout={Layout}
          />
          <RouteWrapper path="/cart" component={Cart} layout={Layout} />
          <RouteWrapper path="/result" component={Result} layout={Layout} />
          <RouteWrapper path="/" component={Home} layout={Layout} />
        </Switch>
      </CartContext.Provider>
    </Router>
  );
};

function RouteWrapper({ component: Component, layout: Layout, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

export default App;
