import useForm from "../../hooks/useForm.ts";
import Form from "../../components/form/form.tsx";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "../pages.module.css";
import { useAppDispatch } from "../../services/store.ts"; 
import { registrationUserThunk } from "../../services/auth/auth-slice.ts";

function RegistrationPage() {
  const dispatch = useAppDispatch();
  const { stateForm, handleChange } = useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registrationUserThunk(stateForm));
  };

  return (
    <div className={styles.container}>
      <Form
        onSubmit={handleSubmit}
        title="Регистрация"
        textBtn="Зарегистрироваться"
      >
        <Input
          name="name"
          autoComplete="on"
          extraClass="mb-6"
          type={"text"}
          value={stateForm.name || ""}
          placeholder={"Имя"}
          onChange={handleChange}
        />
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
        Уже зарегистрированы?
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}
export default RegistrationPage;
