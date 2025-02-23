import styles from "./not-found.module.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className={styles.not_found}>
      <h1 className={styles.not_found__title}>404</h1>
      <p className={styles.not_found__subtitle}>Страница не найдена</p>
      <Link to="/" className={styles.not_found__link}>
        Вернуть в бургерную
      </Link>
    </section>
  );
}

export default NotFound;
