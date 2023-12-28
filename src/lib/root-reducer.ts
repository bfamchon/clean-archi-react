import { reducer as authReducer } from '@/lib/auth/reducer';
import { reducer as watchBoxesReducer } from '@/lib/watch-box/reducer';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  watchBoxes: watchBoxesReducer,
  auth: authReducer
});

export type RootReducer = ReturnType<typeof rootReducer>;
