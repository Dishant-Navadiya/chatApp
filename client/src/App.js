import React from "react";
import Intro from "./component/Intro";
import Enter from "./component/Enter";
import Chat from "./component/chat";

import { BrowserRouter as Router, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Enter} />
      <Route path="/signup" component={Intro} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default App;
