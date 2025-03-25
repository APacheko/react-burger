import useForm from "../../hooks/useForm.ts";
import Form from "../../components/form/form.tsx";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "../pages.module.css";
import { useAppDispatch } from "../../services/store.ts";
import { loginUserThunk } from "../../services/auth/auth-slice.ts";

function LoginPage() {
  const dispatch = useAppDispatch();
  const { stateForm, handleChange } = useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
