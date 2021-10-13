import React, { useState } from "react";
import { observer } from "mobx-react";

import { contentTypeOptions } from "../../../store/data/dropDownOptions";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react";
import Grid from "@material-ui/core/Grid";

import TestContentSelector from "../../common/TestContentSelector";
import QueryContentSelector from "../../common/QueryContentSelector";
import TraceTableSelector from "../../common/TraceTableSelector";
import fileDownload from "react-file-download";

const dropdownStyles = {
  dropdown: { width: 300 },
};

const DeveloperForm = observer(({ store }) => {
  const [contentControlTitle, setContentControlTitle] = useState(null);
  const [contentControlType, setContentControlType] = useState("queryTable");
  const [contentControlSkin, setContentControlSkin] = useState("");

  const addToDocumentRequestObject = (contentControlObject) => {
    console.log(contentControlObject);
    store.addContentControlToDocument(contentControlObject);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            label="Enter Form Name "
            required
            placeholder="Example: STD"
            onChange={(event, newValue) => {
              store.setDocumentTitle(newValue);
            }}
          />
          <Dropdown
            placeholder="Select a TeamProject"
            label="Select a TeamProject"
            value={store.teamProject}
            options={store.teamProjectsList.map((teamProject) => {
              return { key: teamProject.id, text: teamProject.name };
            })}
            styles={dropdownStyles}
            onChange={(event, newValue) => {
              store.setTeamProject(newValue.key, newValue.text);
              store.fetchDocuments();
            }}
          />
          <Dropdown
            placeholder="Select a Template"
            label="Select a Template"
            value={store.selectedTemplate.name}
            options={store.templateList.map((template) => {
              return { key: template.url, text: template.name };
            })}
            styles={dropdownStyles}
            onChange={(event, newValue) => {
              store.setSelectedTemplate(newValue);
            }}
          />
          <TextField
            label="Content Control Name "
            required
            placeholder="Example: system-capabilities"
            onChange={(event, newValue) => {
              setContentControlTitle(newValue);
            }}
          />
          {contentControlTitle ? (
            <div>
              <Dropdown
                placeholder="Select a content contorl type"
                value={contentControlType}
                label="Select a content control type"
                options={contentTypeOptions}
                onChange={(event, newValue) => {
                  setContentControlType(newValue.dataType);
                  setContentControlSkin(newValue.skinType);
                }}
              />
              {contentControlType === "test" &&
              contentControlSkin === "test-std" ? (
                <TestContentSelector
                  contentControlTitle={contentControlTitle}
                  teamProjectName={store.teamProject}
                  type={contentControlType}
                  skin={contentControlSkin}
                  testPlansList={store.testPlansList}
                  contentControlArrayCell={null}
                  editingMode={true}
                  addToDocumentRequestObject={addToDocumentRequestObject}
                />
              ) : null}
              {contentControlType === "query" ? (
                <QueryContentSelector
                  contentControlTitle={contentControlTitle}
                  teamProjectName={store.teamProject}
                  type={contentControlType}
                  skin={contentControlSkin}
                  sharedQueriesList={store.sharedQueries}
                  contentControlArrayCell={null}
                  editingMode={true}
                  addToDocumentRequestObject={addToDocumentRequestObject}
                />
              ) : null}
              {contentControlSkin === "trace-table" ? (
                <TraceTableSelector
                  store={store}
                  contentControlTitle={contentControlTitle}
                  contentControlArrayCell={null}
                  editingMode={true}
                  addToDocumentRequestObject={addToDocumentRequestObject}
                />
              ) : null}
            </div>
          ) : null}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <PrimaryButton
            text="Send To Document Generator"
            onClick={() => {
              store.sendRequestToDocGen();
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Request JSON:"
            multiline
            rows={15}
            value={`${JSON.stringify(store.requestJson)}`}
          />
          <br />
          <PrimaryButton
            text="Download Request JSON"
            onClick={() => {
              fileDownload(JSON.stringify(store.requestJson), "request.json");
            }}
          />
          <br />
          <br />
        </Grid>
      </Grid>
    </div>
  );
});

export default DeveloperForm;
