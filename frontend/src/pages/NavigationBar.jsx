import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
//import { CurrentUserContext } from './CurrentUserContext';


function NavigationBar() {
    const navigate = useNavigate();

    return (
      <nav>
        <ul style={{ display: 'flex', flexDirection: 'colum' }}>

          <li style={{ display: 'inline', marginRight: '100px' }}>
            <Link to="/" style={{ fontSize: '40px', fontFamily: 'Arial' }}>Home</Link>
          </li>

          <li style={{ display: 'inline', marginTop: '18px', marginLeft: '100px' }}>
            <button className="" style={{ fontSize: '16px', fontFamily: 'Helvetica' }}>Men</button>
          </li>
          <li style={{ display: 'inline', marginTop: '18px', marginRight: '10px' }}>
            <button className="" style={{ fontSize: '16px', fontFamily: 'Helvetica' }}>Women</button>
          </li>

          <li style={{ display: 'inline', marginTop: '18px', marginRight: '10px' }}>
           <button className="" style={{ fontSize: '16px', fontFamily: 'Helvetica' }} onClick={() => navigate("/login")}>Login/Sign Up</button>
          </li>

          

        </ul>
      </nav>
    );
  }

export default NavigationBar;