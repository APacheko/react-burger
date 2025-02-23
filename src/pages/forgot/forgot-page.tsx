import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/form/form.js";
import useForm from "../../hooks/useForm.js";
import { forgot } from "../../utils/api.js";
import styles from "../pages.module.css";

function ForgotPage() {
  const { stateForm, handleChange } = useForm();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgot(stateForm)
      .then(() => {
        localStorage.setItem("resetPassword", "true");
        navigate("/reset-password");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <Form
        onSubmit={handleSubmit}
        title="Восстановление пароля"
        textBtn="Восстановить"
      >
        <EmailInput
          name="email"
          autoComplete="on"
          extraClass="mb-6"
          value={stateForm.email || ""}
          placeholder={"Укажите e-mail"}
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
export default ForgotPage;
