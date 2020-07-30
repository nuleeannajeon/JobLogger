import React from 'react';
import './App.css';
import Navbar from './components/Navbar/index';
import Jumbotron from './components/Jumbotron/index';
import About from './components/About/index';

function App() {
  return (
    <div>
      <Navbar />
      <Jumbotron />
      <About />
    </div>
  );
}

export default App;
