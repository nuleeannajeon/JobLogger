import React from 'react';
// import './App.css';
import Navbar from './components/Navbar/index';
import Jumbotron from './components/Jumbotron/index';
import About from './components/About/index';
import LabelBottomNavigation from './components/BottomNav/index';

function App() {
  return (
    <div>
      <Navbar />
      <Jumbotron />
      <About />
      <LabelBottomNavigation />
    </div>
  );
}

export default App;
