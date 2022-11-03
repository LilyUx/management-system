import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { IUserState, userReducer } from "./module/user";

export interface IAction<T> {
  type: string;
  payload: T;
}

export interface IStoreState {
  user: IUserState;
}

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
