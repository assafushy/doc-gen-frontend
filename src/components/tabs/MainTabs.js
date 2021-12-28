import React, { useState } from "react";
import { observer } from "mobx-react";

import DeveloperForm from "../forms/develeoperForm/DeveloperForm";
import DocFormGenerator from "../forms/docFormGenerator/DocFormGenerator";
import DocumentsTab from "../forms/documentsTab/DocumentsTab";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const MainTabs = observer(({ store }) => {
  const [selectedTab, setSelectedTab] = useState(4);

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => {
            setSelectedTab(newValue);
          }}
          aria-label="document tabs"
        >
          {store.documentTemplates.map((docForm, key) => {
            return <Tab label={docForm.documentTitle} value={key} />;
          })}
          <Tab label="Developer Tab" value={4} />
          <Tab label="Documents" value={99} />
        </Tabs>
      </AppBar>
      {store.documentTemplates.map((docForm, key) => {
        return selectedTab === key ? (
          <DocFormGenerator
            index={0}
            value={key}
            jsonDoc={docForm}
            store={store}
          />
        ) : null;
      })}
      {selectedTab === 4 ? (
        <DeveloperForm store={store} index={0} value={4} />
      ) : null}
      {selectedTab === 99 ? (
        <DocumentsTab store={store} index={0} value={4} />
      ) : null}
    </div>
  );
});

export default MainTabs;
