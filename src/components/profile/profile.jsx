import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { getUser, updateUserDataThunk } from "../../services/auth/auth-slice";

function Profile() {
  const { user } = useSelector(getUser);
  const dispatch = useDispatch();
  const { stateForm, setStateForm, handleChange } = useForm();
  const [isChange, setIsChange] = useState(false);

  const updataChange = (e) => {
    handleChange(e);
    setIsChange(true);
  };

  useEffect(() => {
    setStateForm(user);
  }, [user]);

  const handleUpdateUser = () => {
    dispatch(updateUserDataThunk(stateForm));
    setIsChange(false);
  };

  const cancelChange = () => {
    setStateForm(user);
    setIsChange(false);
  };

  return (
    <form>
      <Input
        name="name"
        icon="EditIcon"
        autoComplete="on"
        extraClass="mb-6"
        type={"text"}
        value={stateForm.name || ""}
        placeholder={"Имя"}
        onChange={updataChange}
      />
      <EmailInput
        name="email"
        isIcon={true}
        autoComplete="on"
        extraClass="mb-6"
        value={stateForm.email || ""}
        placeholder="Логин"
        onChange={updataChange}
      />
      <PasswordInput
        name="password"
        autoComplete="on"
        extraClass="mb-6"
        value={stateForm.password || ""}
        placeholder="Пароль"
        icon="EditIcon"
        onChange={updataChange}
      />
      {isChange && (
        <div className={styles.container_btn}>
          <Button
            htmlType="button"
            type="secondary"
            size="small"
            onClick={cancelChange}
          >
            Отменить
          </Button>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleUpdateUser}
          >
            Сохраниь
          </Button>
        </div>
      )}
    </form>
  );
}
export default Profile;
