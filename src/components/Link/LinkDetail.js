import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../firebase/context';
import LinkItem from './LinkItem';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import CircleLoader from '../Layout/CircleLoader';

function LinkDetail(props) {
  const [link, setLink] = useState('');
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('')
  const { firebase, user } = useContext(FirebaseContext);

  //grab link id on history params
  const linkid = props.match.params.linkid;
  const linkRef = firebase.db.collection('links').doc(linkid);

  useEffect(() => {
    const getLinks = () => {
      linkRef
        .get()
        .then(doc => {
          setLink({ id: doc.id, ...doc.data() });
        })
        .catch(err => console.log(err));
    };
    getLinks();
  }, []);

  const handleAddComment = () => {
    if (!user) {
      props.history.push('/login');
    } else {
      linkRef
        .get()
        .then(doc => {
          if (doc.exists) {
            const prevComments = doc.data().comments;
            if(!commentText) {
              return setError('This field can not be empty')
            }
            const comment = {
              postedBy: { id: user.uid, name: user.displayName },
              created: Date.now(),
              text: commentText
            };
            const updatedComments = [...prevComments, comment];
            linkRef.update({ comments: updatedComments });
            setLink(prevState => ({
              ...prevState,
              comments: updatedComments
            }));
            setCommentText('');
            setError('');
          }
        })
        .catch(err => console.log(err));
    }
  };

  

  return !link ? (
    <CircleLoader />
  ) : (
    <div>
      <div className='section'>
        <LinkItem showCount={false} link={link} />
      </div>
      <div className='input-field'>
        <textarea
          id='textarea1'
          className='materialize-textarea'
          rows='20'
          cols='60'
          value={commentText}
          onChange={event => setCommentText(event.target.value)}
        />
        <label htmlFor='textarea1'>Add comment</label>
        <span className='red-text'> {error} </span>
      </div>
      <div className='row'>
        <div className='col s12 l6 offset-l5 offset-m4'>
          <button className='btn orange' onClick={handleAddComment}>
            Add comment
          </button>
        </div>
      </div>
      {link.comments && link.comments.map((comment, index) => (
        <ul key={index} className='collection'>
          <li>
            <h6>{comment.postedBy.name} posted <i className="tiny material-icons">access_time</i> {' '}
              {distanceInWordsToNow(new Date(comment.created))} ago
            </h6>
            <span>{comment.text}</span>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default LinkDetail;
