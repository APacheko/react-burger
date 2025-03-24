import { useDispatch } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./profile-page.module.css";
import { logoutUserThunk } from "../../services/auth/auth-slice.js";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    dispatch(logoutUserThunk());
    navigate("/login");
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <nav className={`${styles.nav} mr-15`}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              (isActive ? styles.link_active : styles.link) +
              " text text_type_main-medium"
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              (isActive ? styles.link_active : styles.link) +
              " text text_type_main-medium"
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to=""
            onClick={logout}
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </NavLink>
          <p className="text text_type_main-default text_color_inactive mt-20">
            {pathname === "/profile/orders"
              ? "В этом разделе вы можете просмотреть свою историю заказов"
              : "В этом разделе вы можете изменить свои персональные данные"}
          </p>
        </nav>
        <Outlet />
      </div>
    </main>
  );
}

export default ProfilePage;
