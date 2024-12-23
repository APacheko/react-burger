import { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "./app-header/app-header";
import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import BurgerConstructor from "./burger-constructor/burger-constructor";

const BASE_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const getIngredients = () => {
    try {
      fetch(BASE_URL)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((res) => {
          const data = res;
          setIngredients(data.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <>
      <AppHeader />
      <main className={`${styles.main} pt-10`}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </>
  );
}

export default App;
