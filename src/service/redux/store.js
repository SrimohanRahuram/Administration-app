import {createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import myReducers from './reducers';

const rootReducer = combineReducers({
  myReducers,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
