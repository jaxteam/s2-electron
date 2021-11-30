import {combineReducers,createStore,applyMiddleware} from 'redux'
import { forwardToRenderer, triggerAlias, replayActionMain } from 'electron-redux';

const initialState={

}


function reducers(){
    
}

const todoApp = combineReducers(reducers);
 
const store = createStore(
  todoApp,
  initialState, // optional
  applyMiddleware(
    triggerAlias, // optional, see below
    // ...otherMiddleware,
    forwardToRenderer, // IMPORTANT! This goes last
  ),
);
 
replayActionMain(store);