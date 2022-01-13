import React from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import Login from './Login';

const App = () => {
  return (
    <div>
      <div>
        <NavBar />
        <Login />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
