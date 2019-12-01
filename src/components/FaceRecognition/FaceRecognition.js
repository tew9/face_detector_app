import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({ image, box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='img' alt='face_image' src={image} width='400px' height='auto'></img>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}> </div>
      </div>
    </div>
      
  );
}

export default FaceRecognition;