import PrivateRoute from "./PrivateRoute";
import Layout from "../layout";
import Login from "../pages/login";
import Home from "../pages/home";

export interface IRouteMeta {
  title?: string;
  icon?: string;
  isNav?: boolean;
  noMenu?: boolean; // 是否显示在左侧菜单中，true：不显示
}

export interface IRouteBase {
  path: string;
  component?: any;
  redirect?: string;
  auth?: any;
  meta?: IRouteMeta;
  exact?: boolean;
}

export interface IRoute extends IRouteBase {
  children?: IRoute[];
}

export const rootRoutes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: Layout,
    auth: PrivateRoute,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
  },
];

/**
 * 一级路由可有两种定义方式
 * - 有children, 就没有component
 * - 没有children, 一定会有component
 * 这是一个互斥的结果
 */
export const routes: IRoute[] = [
  // 左侧菜单中的路由
  {
    path: "/home/index",
    exact: true,
    component: Home,
  },
];
