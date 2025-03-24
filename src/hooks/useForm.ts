import { useState } from "react";

type TProfileFormInputs = {
  name?: string | null | undefined;
  email?: string | null | undefined ;
  password?: string ;
  token?: string ;
};

const useForm = () => {
  const [stateForm, setStateForm] = useState<TProfileFormInputs>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

export default useForm;
