import React from "react";
// BrowserRouter HashRouter
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import { IRoute } from "../routes/config";
import { LayoutRouteList } from "../routes/index";
import "./index.less";

function LayoutPage(props: any) {
  const currentRoute = props.location.hash && props.location.hash.split("#");
  console.log(LayoutRouteList);
  return (
    <Router>
      <div className="header">header</div>
      <div className="wrapper">
        {LayoutRouteList.map((route: IRoute) => (
          <Route
            path={route.path}
            exact={route.exact}
            key={route.path}
            component={route.component}
          />
        ))}
      </div>

      {!props.location.hash || currentRoute[1] === "/" ? (
        <Redirect to="/home/index" />
      ) : (
        <Redirect to={currentRoute[1]} />
      )}
    </Router>
  );
}

export default LayoutPage;
