import React from 'react';
import AboutUs from './AboutUs';
import Founders from './Founders';

const About = () => {
  return (
    <div className='mt-10 ml-24 flex flex-col min-h-screen'>
      <div>
        <AboutUs />
      </div>
      <div>
        <Founders />
      </div>
    </div>
  );
};

export default About;