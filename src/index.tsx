import "./index.css";
import { App } from "./ui/App";
import { AWSAuthService } from "./adapters/aws-amplify-auth";
import { LocalTaskStorage } from "./adapters/task-storage";
import { LocalUserStorage } from "./adapters/user-storage";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// This is the perfect place for us to supply dependencies to our App

root.render(
  <React.StrictMode>
    <App
      authService={AWSAuthService}
      userStorageService={LocalUserStorage}
      taskStorageService={LocalTaskStorage}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
