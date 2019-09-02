import React, { useContext } from 'react';
import userFormValidation from '../Auth/useFormValidation';
import validateCreateLink from '../Auth/validateCreateLink';
import { FirebaseContext } from '../../firebase';

const INITIAL_STATE = {
  description: '',
  url: ''
};

function CreateLink(props) {
  const { firebase, user } = useContext(FirebaseContext);

  const handleCreateLink = () => {
    if (!user) {
      props.history.push('/login');
    } else {
      const { url, description } = values;
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName
        },
        voteCount: 0, 
        votes: [],
        comments: [],
        created: Date.now()
      };
      firebase.db.collection('links').add({...newLink, 
      
      }); 
      props.history.push('/');
    }
  };

  const { handleSubmit, handleChange, values, errors, handleBlur } = userFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  return (
    <form onSubmit={handleSubmit}>
      <h4 className='teal-text lighten-2'> Share your resource </h4>
      <div className='input-field'>
        <input
          id='description'
          type='text'
          autoComplete='off'
          name='description'
          onChange={handleChange}
          className={(errors.description && 'invalid') || 'validate'}
        />
        <label htmlFor='description'>Description of your resource</label>
        <span className='red-text'>{errors.description}</span>
      </div>
      <div className='input-field'>
        <input
          id='url'
          type='url'
          autoComplete='off'
          name='url'
          onChange={handleChange}
          onBlur={handleBlur}
          values={values.url}
          className={(errors.url && 'invalid') || 'validate'}
        />
        <label htmlFor='url'>URL for your resource</label>
        <span className='red-text'>{errors.url}</span>
      </div>
      <div className='input-field'>
        <button className='btn orange' type='submit'>
          Create link
        </button>
      </div>
    </form>
  );
}

export default CreateLink;
