import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './FrontPage';
import Signin from './Signin';
import Login from './Login';
import Home from './Home';
import TicTacToe from './TicTacToe';
import power4 from './power4'; 

 function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FrontPage />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/TicTacToe" element={<TicTacToe />} />
        <Route exact path="/power4" element={<power4 />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
