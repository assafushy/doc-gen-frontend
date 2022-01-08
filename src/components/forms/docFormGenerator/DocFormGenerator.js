import React from "react";
import { observer } from "mobx-react";

import Grid from "@material-ui/core/Grid";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";

import TemplateSelector from "../../common/TemplateSelector";
import TestContentSelector from "../../common/TestContentSelector";
import QueryContentSelector from "../../common/QueryContentSelector";
import TraceTableSelector from "../../common/TraceTableSelector";

const dropdownStyles = {
  dropdown: { width: 300 },
};

const DocFormGenerator = observer(
  ({ index, value, jsonDoc = { contentControls: [] }, store }) => {
    const generateFormControls = (formControl) => {
      switch (formControl.skin) {
        case "test-std":
          return (
            <TestContentSelector
              contentControlTitle={formControl.title}
              type={formControl.data.type}
              skin={formControl.skin}
              testPlansList={store.testPlansList}
              editingMode={false}
              addToDocumentRequestObject={store.addContentControlToDocument}
            />
          );
        case "trace-table":
          return (
            <TraceTableSelector
              store={store}
              contentControlTitle={formControl.title}
              contentControlArrayCell={null}
              editingMode={false}
              addToDocumentRequestObject={store.addToDocumentRequestObject}
            />
          );
        case "table":
          return (
            <QueryContentSelector
              contentControlTitle={formControl.title}
              type={formControl.data.type}
              skin={formControl.skin}
              sharedQueriesList={store.sharedQueries}
              editingMode={false}
              addToDocumentRequestObject={store.addContentControlToDocument}
              linkTypeFilterArray={null}
            />
          );
        case "paragraph":
          return (
            <QueryContentSelector
              contentControlTitle={formControl.title}
              type={formControl.data.type}
              skin={formControl.skin}
              sharedQueriesList={store.sharedQueries}
              editingMode={false}
              addToDocumentRequestObject={store.addContentControlToDocument}
              linkTypeFilterArray={null}
            />
          );
        default:
          return null;
      }
    };

    return (
      <div>
        <Dropdown
          placeholder="Select a TeamProject"
          label="Select a TeamProject"
          value={store.teamProject}
          options={store.teamProjectsList.map((teamProject) => {
            console.log(teamProject);
            return { key: teamProject.id, text: teamProject.name };
          })}
          styles={dropdownStyles}
          onChange={(event, newValue) => {
            store.setTeamProject(newValue.key,newValue.text);
          }}
        />

        <Dropdown
          placeholder="Select a Template"
          label="Select a Template"
          value={store.selectedTemplate.name}
          options={store.templateList.map((template)=> {
                return { key: template.url, text: template.name };
          })}
          styles={dropdownStyles}
          onChange= {(event,newValue)=>{
            store.setSelectedTemplate(newValue)}}
          />

        <br />
        <Grid container spacing={3}>
          {jsonDoc.contentControls
            ? jsonDoc.contentControls.map((contentControl, key) => {
                return (
                  <Grid item xs={3}>
                    <typography fontWeight="fontWeughtBold" fontSize={20} m={1}>
                      {contentControl.title}:
                    </typography>
                    {generateFormControls(contentControl)}
                  </Grid>
                );
              })
            : null}
        </Grid>
      </div>
    );
  }
);

export default DocFormGenerator;