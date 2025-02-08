import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../../services/auth/auth-slice";

const ProtectedRouteElement = ({ onlyUnAuth = false, component }) => {
  const { user, isAuthChecked } = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);

OnlyUnAuth.propTypes = {
  component: PropTypes.element,
};

ProtectedRouteElement.propTypes = {
  component: PropTypes.element,
  onlyUnAuth: PropTypes.bool,
};
