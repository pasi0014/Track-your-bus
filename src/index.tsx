import React from 'react';
import ReactDOM from 'react-dom';
import "./tailwind.output.css";
import { BrowserRouter, Switch } from "react-router-dom";

import App from './App';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

