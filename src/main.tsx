import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./components/app.tsx";
import "./main.css";
import {store} from "./services/store.ts";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
