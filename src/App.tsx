import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FormExample, FormRegister } from "Components/FormDemo";
import { FormMaterial } from "Components/FormMaterial";

import "./App.css";

const Home = () => {
  return <h1>HOME</h1>;
};

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <Link to="/">Home</Link>
          <br />
          <Link to="/form1">Form Demo 1</Link>
          <br />
          <Link to="/form2">Form Demo 2</Link>
          <br />
          <Link to="/form4">Form Demo 4</Link>
          <br />
        </ul>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/form1" component={FormExample} />
          <Route path="/form2" component={FormRegister} />
          <Route path="/form4" component={FormMaterial} />
        </Switch>
      </div>
    </Router>
  );
}
