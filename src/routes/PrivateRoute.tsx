import React, { ReactElement } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { IStoreState } from "../store";

interface IProps {
  isLogin: boolean;
  component: React.ComponentType<any>;
}

function PrivateRoute({
  isLogin,
  component: Component,
  ...restProps
}: IProps): ReactElement {
  return (
    <Route
      {...restProps}
      render={(props: RouteComponentProps) =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location.pathname },
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state: IStoreState) => ({
  isLogin: state.user.isLogin,
});

export default connect(mapStateToProps)(PrivateRoute);
