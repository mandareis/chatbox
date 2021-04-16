import * as React from "react";
import { Route } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/userSlice";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}
const LoggedInRoute = ({ component: Component, ...otherProps }: IProps) => {
  const history = useHistory();
  const user = useAppSelector(selectUser);

  React.useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);
  return (
    <Route
      {...otherProps}
      render={(routeProps) => <Component {...routeProps} />}
    />
  );
};
export default connect()(LoggedInRoute);
