import PropTypes from "prop-types";
import styles from "./form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function Form({ title, textBtn, onSubmit, children }) {
  

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">{title}</h1>
      <form className="form">{children}</form>
      
      <Button onClick={onSubmit} extraClass='mb-20' htmlType="button" type="primary" size="medium">
        {textBtn}
      </Button>
    </div>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  textBtn: PropTypes.string,
  children: PropTypes.any,
  onSubmit: PropTypes.func,
  error: PropTypes.bool
};

export default Form;
