import useForm from "../../hooks/useForm.js";
import Form from "../../components/form/form";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "../pages.module.css";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../../services/auth/auth-slice.js";

function LoginPage() {
  const dispatch = useDispatch();
  const { stateForm, handleChange } = useForm();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserThunk(stateForm));
  };

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit} title="Вход" textBtn="Войти">
        <EmailInput
          name="email"
          autoComplete="on"
          extraClass="mb-6"
          value={stateForm.email || ""}
          placeholder={"E-mail"}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          autoComplete="on"
          extraClass="mb-6"
          value={stateForm.password || ""}
          placeholder={"Пароль"}
          icon="ShowIcon"
          onChange={handleChange}
        />
      </Form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы - новый пользоваель?
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Забыли пароль?
        <Link to="/forgot-password" className={styles.link}>
          Воссттановить пароль
        </Link>
      </p>
    </div>
  );
}
export default LoginPage;
