import React from 'react';

function Loader(props) {
  return (
    <div className='progress col s12 l6 offset-l3'
    style={{ marginTop: `${props.top}px` }}
    >
      <div className='indeterminate' />
    </div>
  );
}

export default Loader;
