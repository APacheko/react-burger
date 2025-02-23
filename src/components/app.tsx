import { useEffect } from "react";

import AppHeader from "./app-header/app-header";
import Profile from "./profile/profile";
import Preloader from "./preloader/preloader";
import IngredientDetails from "./modals/ingredient-details";
import { checkUserAuth } from "../services/auth/auth-slice.js";
import { OnlyAuth, OnlyUnAuth } from "./protected-route/protected-route";
import {
  LoginPage,
  RegistrationPage,
  ForgotPage,
  ResetPage,
  MainPage,
  ProfilePage,
  IngredientPage,
  NotFound,
} from "../pages/pages.tsx";
import { getIngredientsThunk } from "../services/ingredients/ingredients-slice.js";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Modal from "./modals/modal";
import useModal from "../hooks/useModal";

function App() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  function close() {
    closeModal();
    navigate(-1);
  }

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route
          path="/profile"
          element={<OnlyAuth component={<ProfilePage />} />}
        >
          <Route path="/profile" element={<Profile />} />
          <Route path="orders" element={<Preloader />} />
        </Route>
        <Route
          path="/profile"
          element={<OnlyAuth component={<ProfilePage />} />}
        />
        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<RegistrationPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPage />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPage />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={close}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
