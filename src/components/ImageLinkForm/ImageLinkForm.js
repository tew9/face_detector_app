import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({ onInputChange, onButtonClick }) => {
  return (
    <div>
        <p className='f3 black '>
            {"This Brain will detect face in a given picture"}
        </p>
        <div className="center">
            <div className='pa4 br3 center form shadow-5'>
                <input className='f4 pa2 w-70 ' type='text' onChange= { onInputChange } />
                <button className='w-30 grow f4 ma2 link pv2 dib white bg-purple'
                  onClick = { onButtonClick }> Detect
                </button>
            </div> 
        </div>
    </div>
  );
}

export default ImageLinkForm;