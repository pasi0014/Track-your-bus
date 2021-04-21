import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RoutesList from "./components/RoutesList";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen justify-between">
        <div>
          <Navbar />
        </div>

        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/stopInfo" component={RoutesList} />
        </Switch>

        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
