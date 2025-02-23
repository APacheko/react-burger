import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../../services/auth/auth-slice.js";

type Props = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

const ProtectedRouteElement = ({ onlyUnAuth = false, component }: Props) => {
  //@ts-ignore.
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
export const OnlyUnAuth = ({ component }: Props) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
