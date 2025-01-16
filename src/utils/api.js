export const BASE_URL = "https://norma.nomoreparties.space/api";

const checkResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getIngredientsApi = () => {
  return fetch(`${BASE_URL}/ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => checkResult(res))
    .then((data) => {
      return data.data;
    });
};

export const postOrder = (dataId) => {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: dataId,
    }),
  }).then((res) => checkResult(res));
};
