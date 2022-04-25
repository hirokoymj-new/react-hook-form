import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FormQuickStart } from "Components/FormQuickStart";
import { FormBasic } from "Components/FormBasic";
import { FormMaterial } from "Components/FormMaterial";
import { FormLogin } from "Components/FormLogin";
import { FormLoginMaterial } from "Components/FormLoginMaterial";
import { FormProviderForm } from "Components/FormProviderForm";
import { FormProviderBasic } from "Components/FormProviderBasic";

import "./App.css";

const Home = () => {
  return <h1>HOME</h1>;
};

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/form0">Form Quick Start</Link>
          </li>
          <li>
            <Link to="/form1">Form Basic</Link>
          </li>
          <li>
            <Link to="/form2">Form Material-1</Link>
          </li>
          <li>
            <Link to="/form3">Form Login</Link>
          </li>
          <li>
            <Link to="/form4">Form Login Material</Link>
          </li>
          <li>
            <Link to="/form5">Form Provider Basic</Link>
          </li>
          <li>
            <Link to="/form6">Form Provider</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/form0" component={FormQuickStart} />
          <Route path="/form1" component={FormBasic} />
          <Route path="/form2" component={FormMaterial} />
          <Route path="/form3" component={FormLogin} />
          <Route path="/form4" component={FormLoginMaterial} />
          <Route path="/form5" component={FormProviderBasic} />
          <Route path="/form6" component={FormProviderForm} />
        </Switch>
      </div>
    </Router>
  );
}
