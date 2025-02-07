import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import { getUser } from "../../services/auth/auth-slice";
import { useSelector } from "react-redux";

function AppHeader() {
  const { user } = useSelector(getUser);
  return (
    <header className={`${styles.header} mt-10`}>
      <div className={styles.header_container}>
        <nav className={`${styles.nav} mt-5 mb-5`}>
          <div className={styles.nav_container}>
            <NavLink to="/" className={`${styles.link} mr-5 ml-5`}>
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <p
                    className={`text text_type_main-default pl-2 ${
                      isActive ? "" : "text_color_inactive"
                    }`}
                  >
                    Конструктор
                  </p>
                </>
              )}
            </NavLink>
            <NavLink to="/lenta" className={`${styles.link} mr-5 ml-5`}>
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <p
                    className={`text text_type_main-default pl-2 ${
                      isActive ? "" : "text_color_inactive"
                    }`}
                  >
                    Лента заказов
                  </p>
                </>
              )}
            </NavLink>
          </div>
          <NavLink  to="/" className="mr-30">
            <Logo />
          </NavLink>

          <NavLink to="/profile" className={`${styles.link} mr-5 ml-20`}>
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                <p
                  className={`text text_type_main-default pl-2 ${
                    isActive ? "" : "text_color_inactive"
                  }`}
                >
                  {user ? user.name : "Личный кабинет"}
                </p>
              </>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
