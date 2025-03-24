import useForm from "../../hooks/useForm.ts";
import Form from "../../components/form/form.tsx";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { resetPassword } from "../../utils/api.ts";
import styles from "../pages.module.css";

function ResetPage() {
  const { stateForm, handleChange } = useForm();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(stateForm)
      .then(() => {
        localStorage.removeItem("resetPassword");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!localStorage.getItem("resetPassword")) {
    return <Navigate to="/forgot-password" />;
  }

  return (
    <div className={styles.container}>
      <Form
        onSubmit={handleSubmit}
        title="Восстановление пароля"
        textBtn="Сохранить"
      >
        <PasswordInput
          name="password"
          autoComplete="on"
          extraClass="mb-6"
          value={stateForm.password || ""}
          placeholder={"Введите новый пароль"}
          icon="ShowIcon"
          onChange={handleChange}
        />
        <Input
          name="token"
          autoComplete="on"
          extraClass="mb-6"
          value={stateForm.token || ""}
          placeholder={"Введите код из письма"}
          onChange={handleChange}
        />
      </Form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}
export default ResetPage;
