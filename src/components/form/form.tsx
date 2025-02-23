import styles from "./form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ReactNode, FormEvent } from "react";

type Props = {
  title: string;
  textBtn: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

function Form({ title, textBtn, onSubmit, children }: Props) {
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">{title}</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        {children}
        <Button
          extraClass="mb-20"
          htmlType="submit"
          type="primary"
          size="medium"
        >
          {textBtn}
        </Button>
      </form>
    </div>
  );
}

export default Form;
