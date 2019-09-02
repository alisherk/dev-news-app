import { useEffect, useState } from 'react';
import firebase from '../../firebase';

function useAuth() {
  
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubsribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
          setAuthUser(user);
      } else {
          setAuthUser(null);
      }
    });
    return () => unsubsribe()
  }, []);

  return authUser; 
}

export default useAuth;
