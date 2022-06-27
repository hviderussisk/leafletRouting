import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import tableReducer from './tableReducer';
import { watcherLeads } from './sagas/dataTableService';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import { watcherSelects } from './sagas/dataSelectService';
import selectReducer from './selectReducer';
import coordsReducer from './coordsReducer';


let sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    dataTableReducer: tableReducer,
    dataSelectReducer: selectReducer,
    coords: coordsReducer
})

const store = configureStore({
    middleware: [sagaMiddleware,logger ],
    reducer: reducer,
  });

sagaMiddleware.run(watcherLeads);
sagaMiddleware.run(watcherSelects);

window.state = store.getState();
export default store;