import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="flex justify-center border-t-2">
      <div className="text-left">
        Copyright &#169; 2022. All rights reserved.
      </div>
      <FontAwesomeIcon
        icon={faGithub}
        className="object-cover w-10 h-10 mx-auto"
      ></FontAwesomeIcon>
      <div className="align-bottom text-right">Powered by XCodeStack.</div>
    </div>
  );
};

export default Footer;
