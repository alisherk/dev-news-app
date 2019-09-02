import React from 'react';

function CircleLoader(props) {
  return (
    <div className='row section'>
      <div className='col s12 l6 offset-l5 offset-s5'>
        <div className='preloader-wrapper big active'>
          <div className='spinner-layer spinner-blue-only'>
            <div className='circle-clipper left'>
              <div className='circle'></div>
            </div>
            <div className='gap-patch'>
              <div className='circle'></div>
            </div>
            <div className='circle-clipper right'>
              <div className='circle'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircleLoader;
