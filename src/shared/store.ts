import { stateSyncEnhancer, } from 'electron-redux'
import { combineReducers, createStore } from 'redux';
import {counter} from './reducer'

const todoApp = counter;
const initialState =10 
const store = createStore(
  counter,
  stateSyncEnhancer()
);

export default store
