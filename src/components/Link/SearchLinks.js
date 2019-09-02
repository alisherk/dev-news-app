import React, { useState, useEffect, useContext, Fragment } from 'react';
import FirebaseContext from '../../firebase/context';
import LinkItem from '../Link/LinkItem';

function SearchLinks() {

  const [filter, setFilter] = useState('');
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [links, setLinks] = useState([]);
  const [errors, setErrors] = useState('');
  const { firebase } = useContext(FirebaseContext);


  useEffect(() => {
    const getInitialLinks = () => {
      firebase.db
        .collection('links')
        .get()
        .then(snap => {
          const links = snap.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
          });
          setLinks(links);
        })
        .catch(err => console.log(err));
    };
    getInitialLinks();
  }, []);

  const validateSearchField = event => {
    if (!event.target.value) {
      setErrors('This search field can not be empty'); 
    } else {
      setErrors('');
    }
  };

  const handleSearch = event => {
    event.preventDefault();
    validateSearchField(event); 
    const query = filter.toLowerCase().trim();
    if(!query) {
      return; 
    }
    const matchedLinks = links.filter(link => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredLinks(matchedLinks);
    setErrors('');
  };

  return (
    <Fragment>
      <h4 className='teal-text lighten-2'> Search resources </h4>
      <form onSubmit={handleSearch}>
        <div className='input-field'>
          <input
            type='text'
            id='search'
            autoComplete='off'
            className='validate'
            name='search'
            onChange={e => setFilter(e.target.value)}
          />
          <label htmlFor='search'>Search links</label>
          <span className='red-text'> {errors} </span>
        </div>
        <button className='btn orange'> Find </button>
      </form>
      <div>
        {filteredLinks.map((filteredLink, index) => (
          <LinkItem
            key={filteredLink.id}
            showCount={false}
            link={filteredLink}
            index={index}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default SearchLinks;
