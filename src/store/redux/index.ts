import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
    createReactNavigationReduxMiddleware,
  } from 'react-navigation-redux-helpers';
import { servicesReducer } from './reducers/services';

import saga from './sagas';
import { SERVICE_LOAD } from './actions';

const initialStore = {
};

const appReducer = combineReducers({
//  tasks: tasksReducer,
  services: servicesReducer,
});

const navMiddleware = createReactNavigationReduxMiddleware(
  (state:any) => state.nav,
);

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(appReducer, initialStore, applyMiddleware(sagaMiddleware, navMiddleware));

sagaMiddleware.run(saga);

export const dispatch = store.dispatch;
