import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './components/Home';
import MainPlaceHolder from './components/MainPlaceHolder';

/*  @note:
    so Home is the main app.
    MainPlaceHolder is a placeholder, an empty component
    code splitted components are for setting dialogue, etc...
*/

const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: { component: MainPlaceHolder },
  childRoutes: [
    // for now, not in use
    /*{
      path: 'artists/new',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistCreate')
          .then(module => cb(null, module.default));
      }
    },
    {
      path: 'artists/:id',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistDetail')
          .then(module => cb(null, module.default));
      }
    },
    {
      path: 'artists/:id/edit',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistEdit')
          .then(module => cb(null, module.default));
      }
    }*/
  ]
};

const Routes = () => {
  return (
    <Router history={browserHistory} routes={componentRoutes} />
  );
};

export default Routes;
