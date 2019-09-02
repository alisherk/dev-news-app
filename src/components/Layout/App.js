import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CreateLink from '../Link/CreateLink';
import Login from '../Auth/Login';
import ForgotPassword from '../Auth/ForgotPassword';
import LinkList from '../Link/LinkList';
import LinkDetail from '../Link/LinkDetail';
import SearchLinks from '../Link/SearchLinks';
import NotFound from '../Layout/NotFound';
import Header from './Header';
import useAuth from '../Auth/useAuth';
import firebase, { FirebaseContext } from '../../firebase'; 

function App() {
  const user = useAuth(); 
  return (
    <BrowserRouter>
    <FirebaseContext.Provider value={{ user, firebase }}> 
      <Header />
      <div className='container section'>
      <Switch>
          <Route exact path='/' render={() => <Redirect to='/new/1' />} />
          <Route path='/create' component={CreateLink} />
          <Route path='/login' component={Login} />
          <Route path='/forgot' component={ForgotPassword} />
          <Route path='/top' component={LinkList} />
          <Route path='/search' component={SearchLinks} />
          <Route path='/new/:page' component={LinkList} />
          <Route path='/link/:linkid' component={LinkDetail} />
          <Route path='*' component={NotFound} />
      </Switch>
      </div>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
