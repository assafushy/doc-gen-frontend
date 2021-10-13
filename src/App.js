import React from "react";
import MainTabs from "./components/tabs/MainTabs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ store }) {
  return (
    <div className="App">
      <ToastContainer />
      <MainTabs store={store} />
    </div>
  );
}

export default App;
