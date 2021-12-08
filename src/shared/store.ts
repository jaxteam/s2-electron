import { configureStore,combineReducers, MiddlewareArray, createStore } from '@reduxjs/toolkit'
import { stateSyncEnhancer } from 'electron-redux'
import logger from 'redux-logger'
import { useDispatch } from 'react-redux'
import counter from './slice/counterSlice'

const rootReducer = combineReducers({counter})
export const store = configureStore({
  reducer: rootReducer,
  middleware:new MiddlewareArray().concat(logger),
  devTools:false,
  preloadedState:{},
  enhancers:[stateSyncEnhancer()]
})

// const store1 = createStore(
//   counter,
//   stateSyncEnhancer()
// );

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 

export default store
