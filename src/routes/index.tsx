import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { rootRoutes, routes, IRoute } from "./config";

/**
 * 获取一级路由
 */
function getLayoutRouteList() {
  return routes.map((route: IRoute) => {
    const { path, redirect, exact, children, component } = route;
    if (component) {
      return { path, redirect, exact, component };
    }
    let comp;
    if (redirect && children) {
      const childRoute = children.find((child) => child.path === redirect);
      if (childRoute) {
        comp = childRoute.component;
        return { path, redirect, exact, component: comp };
      } else {
        console.warn("children中没有要redirect的子路由");
      }
    }
    return { path, redirect, exact, component: comp };
  });
}

export const LayoutRouteList = getLayoutRouteList();

// 导出根路由
function Routes() {
  return (
    <Router>
      <Switch>
        {rootRoutes.map((route) =>
          route.auth ? (
            <route.auth
              key={route.path}
              {...route}
              component={route.component}
            />
          ) : (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          )
        )}
      </Switch>
    </Router>
  );
}

export default Routes;
