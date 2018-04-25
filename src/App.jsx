import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Navigation from './shared/Navigation.jsx';
import Home from './Home/Home.jsx';
import Heroes from './Heroes/Heroes.jsx';
import Streams from './Streams/Streams.jsx';

function App() {

  return (
    <Router>
      <div className="app">
        <Navigation />

        <Route exact path="/" component={Home} />
        <Route path="/heroes" component={Heroes} />
        <Route path="/streams" component={Streams} />
      </div>
    </Router>
  );

}

export default App;
