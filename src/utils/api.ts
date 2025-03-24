const baseUrl = "https://norma.nomoreparties.space/api";

const checkResult = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const request = (url: string, options: object) => {
  return fetch(baseUrl + url, options).then(checkResult);
};

export const refreshToken = () => {
  return request("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(baseUrl + url, options);
    return await checkResult(res);
  } catch (err) {
    if (!String(err).includes("jwt expired")) {
      const refreshData = await refreshToken();
      if (!refreshData.succes) {
        Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(baseUrl + url, options);
      return await checkResult(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUserData = () => {
  return fetchWithRefresh("/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const getIngredientsApi = () => {
  return request("/ingredients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => {
    return data.data;
  });
};

export const postOrder = (dataId: string) => {
  return fetchWithRefresh("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      ingredients: dataId,
    }),
  });
};

export const register = (data: object) => {
  return request("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data.user;
  });
};

export const login = (data: object) => {
  return request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data.user;
  });
};

export const updateUserData = (data: object) => {
  return fetchWithRefresh("/auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(data),
  });
};

export const logout = () => {
  return request("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  }).then(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  });
};

export const forgot = (data: object) => {
  return request("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const resetPassword = (data: object) => {
  return request("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getOrderByNumber = (number: number) => {
  return request(`/orders/${number}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => {
    return data;
  });
};