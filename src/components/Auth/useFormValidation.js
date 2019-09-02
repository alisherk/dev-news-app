import { useState, useEffect } from 'react';

function useFormValidation(initialState, validate, authenticate) {
    
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmittin] = useState(false);

  useEffect(() => {
    if(isSubmitting){
     const noErrors = Object.keys(errors).length === 0; 
      if (noErrors){
        authenticate(); 
        setSubmittin(false); 
      } else {
        setSubmittin(false);
      }
    }
  }, [errors])

  function handleChange(event) {
    event.persist();
    setValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));   
    const validationError = validate(values); 
    setErrors(validationError); 
  }

  function handleBlur(){
    const validationErrors = validate(values); 
    const noErrors = Object.keys(errors).length === 0; 
    if (noErrors) setErrors(validationErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationError = validate(values); 
    setErrors(validationError); 
    setSubmittin(true);
  }
  return { values, isSubmitting, errors, handleBlur, handleChange, handleSubmit };
}

export default useFormValidation;
