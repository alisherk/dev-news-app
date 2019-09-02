import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {

    return (
        <div> 
            <h4 className='teal-text'>404 No resource found</h4>
            <Link to='/'> Return home </Link> 
        </div>
    )

}

export default NotFound;