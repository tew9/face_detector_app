import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import brain from './brain.png'

const Logo = () => {
  return (
    <div>
        <Tilt className="Tilt ma3" options={{ max : 50 }} style={{ height: 100, width: 100 }} >
            <div className="Tilt-inner pa3"><img alt='logo' src ={brain}></img> </div>
            <div>Built with passion of learning new things, by Tango</div>
        </Tilt>
    </div>
  );
}

export default Logo;