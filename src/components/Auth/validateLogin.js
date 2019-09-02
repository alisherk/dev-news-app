export default function validateLogin(values) {

  
  let errors = {};
  //errors
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/^[a-z\d.-]+@[a-z\d.-]+\.[a-z]{2,}$/.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 5 ) {
    errors.password = 'Password must be more than 5 characters';
  }
  return errors;
}
