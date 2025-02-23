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
import {
  getUser,
  updateUserDataThunk,
} from "../../services/auth/auth-slice.js";

function Profile() {
  //@ts-ignore.
  const { user } = useSelector(getUser);
  const dispatch = useDispatch();
  const { stateForm, setStateForm, handleChange } = useForm();
  const [isChange, setIsChange] = useState(false);

  const updataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setIsChange(true);
  };

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      target.blur();
    }
  }

  useEffect(() => {
    setStateForm(user);
  }, [user]);

  const handleUpdateUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserDataThunk(stateForm));
    setIsChange(false);
  };

  const cancelChange = () => {
    setStateForm(user);
    setIsChange(false);
  };

  return (
    <form onSubmit={handleUpdateUser}>
      <Input
        name="name"
        icon="EditIcon"
        autoComplete="on"
        extraClass="mb-6"
        type={"text"}
        value={stateForm.name || ""}
        placeholder={"Имя"}
        onChange={updataChange}
        onKeyUp={handleKeyUp}
      />
      <EmailInput
        name="email"
        isIcon={true}
        autoComplete="on"
        extraClass="mb-6"
        value={stateForm.email || ""}
        placeholder="Логин"
        onChange={updataChange}
        onKeyUp={handleKeyUp}
      />
      <PasswordInput
        name="password"
        autoComplete="on"
        extraClass="mb-6"
        value={stateForm.password || ""}
        placeholder="Пароль"
        icon="EditIcon"
        onChange={updataChange}
        onKeyUp={handleKeyUp}
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
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}
export default Profile;
