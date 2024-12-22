import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={`${styles.header} mt-10`}>
      <div className={styles.header_container}>
        <nav className={`${styles.nav} mt-5 mb-5`}>
          <div className={styles.nav_container}>
            <a href="/" className={`${styles.link} mr-5 ml-5`}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2 pr-2">
                Конструктор
              </p>
            </a>
            <a href="/" className={`${styles.link} mr-5 ml-5`}>
              <ListIcon type="primary" />
              <p className="text text_type_main-default text_color_inactive pl-2">
                Лента заказов
              </p>
            </a>
          </div>
          <Logo className="mr-30" />
          <a href="/" className={`${styles.link} mr-5 ml-20`}>
            <ProfileIcon type="primary" />
            <p className="text text_type_main-default text_color_inactive pl-2">
              Личный кабинет
            </p>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
