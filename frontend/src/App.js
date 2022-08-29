import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menubar from "./component/Menubar";
import {Container} from "semantic-ui-react";

function App() {
  return (
      <Container className="ui container">
          <Router>
              <Menubar/>
              <Routes>
                  <Route exact path="/" element={<Home/>}/>
                  <Route exact path="/login" element={<Login/>}/>
                  <Route exact path="/register" element={<Register/>}/>
              </Routes>
          </Router>
      </Container>
  );
}

export default App;
