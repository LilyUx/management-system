import { IAction } from "..";
import SessionStorage from "../../utils/storage";

export interface IUserInfo {
  email?: string;
  phone?: string;
  username: string;
  remark: string;
  permission: string;
  token: string;
  id: number;
}

export interface IUserState {
  isLogin: boolean;
  userInfo: IUserInfo;
}

export const USER_KEY = "dne-licences-user";
const localUser = SessionStorage.getValue(USER_KEY);
const defaultUser = localUser || {
  isLogin: false,
  userInfo: {
    id: 0,
    username: "",
    token: "",
  },
};

export const userReducer = (
  state = { ...defaultUser },
  action: IAction<any>
) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      const currentState = {
        isLogin: true,
        userInfo: payload,
      };
      SessionStorage.setValue(USER_KEY, currentState);
      return currentState;
    case "LOGOUT":
      SessionStorage.clear();
      return { ...defaultUser, isLogin: false };
    default:
      return state;
  }
};
