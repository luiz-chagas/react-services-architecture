import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./ui/App";
import reportWebVitals from "./reportWebVitals";
import { AWSAuthService } from "./adapters/aws-amplify-auth";
// import { FirebaseAuthService } from "./adapters/firebase-auth";
// import { FakeAuthService } from "./adapters/fake-auth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// This is the perfect place for us to supply dependencies to our App

root.render(
  <React.StrictMode>
    <App authService={AWSAuthService} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
