import React, { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../../firebase/context';
import LinkItem from './LinkItem';
import CirclLoader from '../Layout/CircleLoader';
import { LINKS_PER_PAGE } from '../../utils/index';
import axios from 'axios';
import NotFound from '../Layout/NotFound';

function LinkList(props) {

  const { firebase } = useContext(FirebaseContext);
  const [colSize, setColSize] = useState(0);
  const [localSize, setLocalSize] = useState(LINKS_PER_PAGE);
  const [links, setLinks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [isData, setIsData] = useState(true);
  const isNewPage = props.location.pathname.includes('new');
  const isTopPage = props.location.pathname.includes('top');
  const page = Number(props.match.params.page);
  const linkRef = firebase.db.collection('links');
  //this increments links count on next button
  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 1

  useEffect(() => {
    getCollSize();
    const unsubscribe = getLinks();
    return () => unsubscribe();
  }, [isTopPage, page]);

  //this func gets the number of docs from firestore links collection
  const getCollSize = () => {
    return linkRef.get().then(snap => {
      const size = snap.size;
      setColSize(size);
    });
  };

  const getLinks = () => {
    setLoader(true);
    if (isTopPage) {
      return linkRef
        .orderBy('voteCount', 'desc')
        .limit(5)
        .onSnapshot(handleSnapshot);
    } else if (page === 1) {
      return linkRef
        .orderBy('created', 'desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else if (cursor) {
      return linkRef
        .orderBy('created', 'desc')
        .startAfter(cursor.created)
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else {
      const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;
      axios
        .get(
          `https://us-central1-hook-news-b6f64.cloudfunctions.net/getCursor?offset=${offset}`
        )
        .then(response => {
          const links = response.data;
          const lastLink = links[links.length - 1];
          setLinks(links);
          setCursor(lastLink);
          setLoader(false);
        }).catch(err => {
          console.log(err); 
          setLoader(false);
          setIsData(false); 
        })
      return () => {};
    }
  };

  const handleSnapshot = snapshot => {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    if(links.length === 0) setIsData(false);
    const lastLink = links[links.length - 1];
    setLinks(links);
    setCursor(lastLink);
    setLoader(false);
  };


  const nextPage = () => {
    setLocalSize(size => size + links.length);
    if (localSize <= colSize) {
      props.history.push(`/new/${page + 1}`);
    } else {
      setLocalSize(LINKS_PER_PAGE); 
      props.history.push('');
    }
  };


  if (loader) return <CirclLoader top={30} />;

  return (
    <div>
      {!isData && (
        <NotFound />
      )}
      {links &&
        links.map((link, index) => (
          <LinkItem
            key={link.id}
            showCount={true}
            link={link}
            index={index + pageIndex}
          />
        ))}
      {isNewPage && links.length !== 0 && (
        <div className='section'>
          <button className='btn orange' onClick={nextPage}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default LinkList;
