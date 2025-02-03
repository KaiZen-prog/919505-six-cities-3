import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {NameSpace} from '../common/const';
import {appData} from './app-data';
import {appProcess} from './app-process';
import {createAPI} from '../services/api';
import {redirect} from './middlewares/redirect';
import {userProcess} from './user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: appData.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.User]: userProcess.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {extraArgument: createAPI()}
    }).concat(redirect)
});
