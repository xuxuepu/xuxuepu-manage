import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'dva/router';
import Layout from './routes/layout';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
};

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: Layout,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/project/list'));
          cb(null, { component: require('./routes/project/list') })
        }, 'projectList')
      },
      childRoutes: [
        {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'));
              cb(null, require('./routes/login'))
            }, 'login')
          }
        },
        {
          path: 'project/list',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/project/list'));
              cb(null, require('./routes/project/list'))
            }, 'projectList')
          }
        },
        {
          path: 'project/details',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/project/details'));
              cb(null, require('./routes/project/details'))
            }, 'projectDetails')
          }
        }
      ]
    }
  ];

  return <Router history={history} routes={routes} />
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
};

export default Routers;
