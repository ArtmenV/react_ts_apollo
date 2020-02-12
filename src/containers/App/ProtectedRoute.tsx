import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { SessionContext } from '../../context/global/sessionCtx';

interface ProtectedRouteProps extends RouteComponentProps {
  redirectUnauthenticatedTo?: string;
}

/**
 * ProtectedRoute component.
 * This hooks into the local apollo graphql state and checks if a user
 * is present and authenticated in the state. If yes it allows navigation
 * to the route, otherwise it redirects the user to the login page or other
 * page defined in `props.redirectUnauthenticatedTo`.
 * @param Component {JSX.Element} the page element that requires authentication to access
 * @param data {Object} result of graphql local state query
 * @param rest {Object} props or the Route component
 * @constructor
 */
function ProtectedRoute({ component: Component, ...rest }) {
  const sessionCtx = React.useContext(SessionContext);
  return (
    <Route
      {...rest}
      render={(props: ProtectedRouteProps) => {
        if (sessionCtx.me) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: props.redirectUnauthenticatedTo || '/login',
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
}

export default ProtectedRoute;
