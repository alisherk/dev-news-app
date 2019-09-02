import React, { useState, useContext } from 'react';
import FirebaseContext from '../../firebase/context';

function ForgotPassword() {
  
  const { firebase } = useContext(FirebaseContext);
  const [resetPass, setResetPass] = useState('');
  const [isPassReset, setPassReset] = useState(false);
  const [passResetErr, setPassResetErr] = useState(null);

  const handleResetPass = async () => {
    try {
      await firebase.resetPassword(resetPass);
      setPassReset(true);
      setPassResetErr(null); 
    } catch (err) {
      console.log(err.message);
      setPassResetErr(err.message);
      setPassReset(false);
    }
  };

  return (
    <div>
      <div className='input-field'>
        <input
          type='text'
          id='email'
          autoComplete='off'
          className='validate'
          name='email'
          onChange={event => setResetPass(event.target.value)}
        />
        <label htmlFor='email'>Provide valid email</label>
        {isPassReset && (
          <span className='green-text'> Check email to reset password </span>
        )}
        {passResetErr && <span className='red-text'> {passResetErr} </span>}
      </div>
      <div className='input-field'>
        <button
          className='btn orange waves-effect waves-light'
          onClick={handleResetPass}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
