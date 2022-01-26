import React, { useState } from "react";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";

import CommitRangeSelector from "./CommitRangeSelector";
import CommitDateSelector from "./CommitDateSelector";
import PipelineSelector from "./PipelineSelector";
import ReleaseSelector from "./ReleaseSelector";
import { observer } from "mobx-react";

const dropdownStyles = {
  dropdown: { width: 300 },
};
const baseDataType = [
  {key: 0, text: "commit-range", type: "range"},
  {key: 1, text: "commit-date", type: "date"},
  {key: 2, text: "pipeline-range", type: "pipeline"},
  {key: 3, text: "release-range", type: "release"}];

const ChangeTableSelector = observer(({
  store,
  contentControlType,
  contentControlSkin,
  contentControlTitle,
  editingMode,
  addToDocumentRequestObject,
  contentControlIndex
}) => {
  const [selectedType, setselectedType] = useState("");

  return (
    <div>
      <Dropdown
        placeholder="Select Base Data Type"
        label="Select Base Data Type"
        options={baseDataType}
        styles={dropdownStyles}
        onChange={(event, newValue) => {
          setselectedType(newValue.type);
        }}
      />
      {selectedType === "range" ? (
        <CommitRangeSelector
          store={store}
          contentControlTitle={contentControlTitle}
          skin="change-table"
          repoList={store.repoList}
          gitRepoCommits={store.gitRepoCommits}
          editingMode={editingMode}
          addToDocumentRequestObject={addToDocumentRequestObject}
          contentControlIndex = {contentControlIndex}
        />
      ) : null}
      {selectedType === "date" ? (
        <CommitDateSelector
        contentControlTitle={contentControlTitle}
        skin="change-table"
        repoList={store.repoList}
        editingMode={editingMode}
        addToDocumentRequestObject={addToDocumentRequestObject}
        contentControlIndex = {contentControlIndex}
        />
      ) :null }
      {selectedType === "pipeline" ? (
        <PipelineSelector
        store={store}
        contentControlTitle={contentControlTitle}
        skin="change-table"
        pipelineList={store.pipelineList}
        pipelineRunHistory={store.pipelineRunHistory}
        editingMode={editingMode}
        addToDocumentRequestObject={addToDocumentRequestObject}
        contentControlIndex = {contentControlIndex}
        />
      ) :null }
      {selectedType === "release" ? (
        <ReleaseSelector
        store={store}
        contentControlTitle={contentControlTitle}
        skin="change-table"
        releaseDefinitionList={store.releaseDefinitionList}
        releaseDefinitionHistory={store.releaseDefinitionHistory}
        editingMode={editingMode}
        addToDocumentRequestObject={addToDocumentRequestObject}
        contentControlIndex = {contentControlIndex}
        />
      ) :null }

      <br />
      <br />
    </div>
  );
});

export default ChangeTableSelector;
