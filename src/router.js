import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'dva/router';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
};

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      getComponent(nextState, cb){
        require.ensure([], require => {
          registerModel(app, require('./models/layout'));
          cb(null, require('./routes/layout'))
        }, 'layout')
      },
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/login'));
          cb(null, { component: require('./routes/login') })
        }, 'login')
      },
      childRoutes: [
        {
          path: 'essay/list',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/essay/list'));
              cb(null, require('./routes/essay/list'))
            }, 'essayList')
          }
        },
        {
          path: 'essay/detail',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/essay/detail'));
              cb(null, require('./routes/essay/detail'))
            }, 'essayDetail')
          }
        },
        {
          path: 'resume/my',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/resume/my'));
              cb(null, require('./routes/resume/my'))
            }, 'resumeMy')
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
