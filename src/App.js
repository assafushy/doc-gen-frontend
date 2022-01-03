import React from "react";
import MainTabs from "./components/tabs/MainTabs";
import SettingsPage from "./components/settings/SettingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

function App({ store }) {
  const [cookies, setCookie] = useCookies(["azuredevopsUrl", "azuredevopsPat"]);

  const login = (selectedUrl, selectedPat) => {
    setCookie("azuredevopsUrl", selectedUrl);
    setCookie("azuredevopsPat", selectedPat);
  };

  return (
    <div className="App">
      <ToastContainer />
      {cookies.azuredevopsUrl && cookies.azuredevopsPat ? (
        <MainTabs store={store} />
      ) : (
        <SettingsPage login={login.bind(this)} />
      )}
    </div>
  );
}

export default App;
