import React from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import SignUp from './SignUp';

const App = () => {
  return (
    <div>
      <div>
        <NavBar />
        <SignUp />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
