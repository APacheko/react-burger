import { useState } from "react";

 const useForm = () => {
  const [stateForm, setStateForm] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setStateForm({
      ...stateForm,
      [name]: value,
    });
  };

  return {
    stateForm,
    handleChange,
    setStateForm,
  };
};

export default useForm