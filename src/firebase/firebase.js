import app from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/firestore'
import firebaseConfig from './config';

app.initializeApp(firebaseConfig);


class Firebase {
  constructor() {
    this.auth = app.auth();
    this.serverTimestamp = app.firestore.FieldValue.serverTimestamp; 
    this.db = app.firestore(); 
  }
  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({
       displayName: name
    });  
  }
  async login(email, password){
     return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async resetPassword(email) {
    await this.auth.sendPasswordResetEmail(email);
  }
}


const firebase = new Firebase();

export default firebase; 