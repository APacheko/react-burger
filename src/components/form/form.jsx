import PropTypes from "prop-types";
import styles from "./form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function Form({ title, textBtn, onSubmit, children }) {
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

Form.propTypes = {
  title: PropTypes.string,
  textBtn: PropTypes.string,
  children: PropTypes.any,
  onSubmit: PropTypes.func,
  error: PropTypes.bool,
};

export default Form;
