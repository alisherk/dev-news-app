import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getDomain } from '../../utils/index';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import FirebaseContext from '../../firebase/context';
import M from 'materialize-css';

function LinkItem({ link, index, history, showCount }) {
  const { firebase, user } = useContext(FirebaseContext);

  const handleVote = () => {
    if (!user) {
      history.push('/login');
    } else {
      const voteRef = firebase.db.collection('links').doc(link.id);
      voteRef
        .get()
        .then(doc => {
          if (doc.exists) {
            const prevVotes = doc.data().votes;
            const vote = { votedBy: { id: user.uid, name: user.displayName } };
            const updatedVotes = [...prevVotes, vote];
            const voteCount = updatedVotes.length;
            voteRef.update({ votes: updatedVotes, voteCount });
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  const postedByAuthUser = user && user.uid === link.postedBy.id;

  const handleDelete = () => {
    if (!postedByAuthUser) {
      return;
    } else {
      const linkRef = firebase.db.collection('links').doc(link.id);
      linkRef
        .delete()
        .then(() => {
          M.toast({ html: 'Your post is deleted!', classes: 'rounded' }, 3000);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  return (
    <ul className='collection'>
      <li className='collection-item'>
        <div>
          <h5>
            {showCount &&(
               `${index}.`
            )}
            {' '}{link.description}
          </h5>
          <a href={link.url} target='_blank' rel='noopener noreferrer'>
            {getDomain(link.url)}
          </a>
          <div className='section'>
            {showCount &&(
                 <span
                 className='orange btn-floating btn-small z-depth-0'
                 onClick={handleVote}
               >
                 <i className='material-icons'>thumb_up</i> 
               </span>
            )}
            {' '}
            <span>
              {link.voteCount} {link.voteCount === 1 ? 'vote' : 'votes'} {' '}
              for {link.postedBy.name} |{' '}
            </span>
            <span>
             Last voted  {distanceInWordsToNow(new Date (link.created))} ago
            </span>
            {' | '}
            <Link to={`/link/${link.id}`}>
              {link.comments.length > 0
                ? `${link.comments.length} comments`
                : 'discuss' || 'NA'}
            </Link>
            {postedByAuthUser && showCount && (
              <>
                <span
                  onClick={handleDelete}
                  className='right red lighten-1 btn-small z-depth-0'
                >
                  <i className='large material-icons'>delete</i>
                </span>
              </>
            )}
          </div>
        </div>
      </li>
    </ul>
  );
}

export default withRouter(LinkItem);
