import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FormQuickStart } from "Components/FormQuickStart";
import { FormDropdownCheckboxRadio } from "Components/FormDropdownCheckboxRadio";
import { FormDropdownCheckboxRadioUI } from "Components/FormDropdownCheckboxRadioUI";
import { FormBasic } from "Components/FormBasic";
import { FormMaterial } from "Components/FormMaterial";
import { FormMaterialBasic } from "Components/FormMaterialBasic";
import { FormLogin } from "Components/FormLogin";
import { FormLoginMaterial } from "Components/FormLoginMaterial";
import { FormProviderForm } from "Components/FormProviderForm";
import { FormProviderBasic } from "Components/FormProviderBasic";
// TextField
import { FormTextField } from "Components/TextField/FormTextField";
import { FormTextFieldMUI } from "Components/TextField/FormTextFieldMUI";
import { FormTextFieldMUI_Provider } from "Components/TextField/FormTextFieldMUI_Provider";
// Dropdown
import { FormDropdown } from "Components/Dropdown/FormDropdown";
import { FormDropdownMUI } from "Components/Dropdown/FormDropdownMUI";
import { FormDropdownMUI_Provider } from "Components/Dropdown/FormDropdownMUI_Provider";
// Checkbox
import { FormCheckbox } from "Components/Checkbox/FormCheckbox";
import { FormCheckboxMUI } from "Components/Checkbox/FormCheckboxMUI";

import "./App.css";

const Home = () => {
  return <h1>HOME</h1>;
};

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <h1>Text Field</h1>
          <li>
            <Link to="/text-field">Text Field</Link>
          </li>
          <li>
            <Link to="/text-field-mui">Text Field MUI</Link>
          </li>
          <li>
            <Link to="/text-field-mui-provider">Text Field MUI Provider</Link>
          </li>
        </ul>
        <hr />
        <ul>
          <h1>Dropdown</h1>
          <li>
            <Link to="/dropdown">Dropdown</Link>
          </li>
          <li>
            <Link to="/dropdown-mui">Dropdown MUI</Link>
          </li>
          <li>
            <Link to="/dropdown-mui-provider">Dropdown MUI Provider</Link>
          </li>
        </ul>
        <hr />
        <ul>
          <h1>Checkbox</h1>
          <li>
            <Link to="/checkbox">Checkbox</Link>
          </li>
          <li>
            <Link to="/checkbox-mui">Checkbox MUI</Link>
          </li>
        </ul>

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
            <Link to="/form-dropdown-checkbox-radio">
              Form - Dropdown, Checkbox and Radio with validation
            </Link>
          </li>
          <li>
            <Link to="/form-dropdown-checkbox-radio-ui">
              Form - Dropdown, Checkbox and Radio with validation and UI
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/form-mui-basic">Form Material + Yup</Link>
          </li>
          <li>
            <Link to="/form2">Form Material-1</Link>
          </li>
          <li>
            <Link to="/form3">Form Login</Link>
          </li>
          <li>
            <Link to="/form-login-material">Form Login Material</Link>
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
          <Route
            path="/form-dropdown-checkbox-radio"
            component={FormDropdownCheckboxRadio}
          />
          <Route
            path="/form-dropdown-checkbox-radio-ui"
            component={FormDropdownCheckboxRadioUI}
          />
          <Route path="/form-mui-basic" component={FormMaterialBasic} />
          <Route path="/form2" component={FormMaterial} />

          <Route path="/form3" component={FormLogin} />
          <Route path="/form-login-material" component={FormLoginMaterial} />
          <Route path="/form5" component={FormProviderBasic} />
          <Route path="/form6" component={FormProviderForm} />

          <Route path="/text-field" component={FormTextField} />
          <Route path="/text-field-mui" component={FormTextFieldMUI} />
          <Route
            path="/text-field-mui-provider"
            component={FormTextFieldMUI_Provider}
          />
          <Route path="/dropdown" component={FormDropdown} />
          <Route path="/dropdown-mui" component={FormDropdownMUI} />
          <Route
            path="/dropdown-mui-provider"
            component={FormDropdownMUI_Provider}
          />
          <Route path="/checkbox" component={FormCheckbox} />
          <Route path="/checkbox-mui" component={FormCheckboxMUI} />
        </Switch>
      </div>
    </Router>
  );
}
