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
          type={selectedType}
          repoList={store.repoList}
          gitRepoCommits={store.gitRepoCommits}
          editingMode={editingMode}
          addToDocumentRequestObject={addToDocumentRequestObject}
        />
      ) : null}
      {selectedType === "date" ? (
        <CommitDateSelector
        contentControlTitle={contentControlTitle}
        type={selectedType}
        repoList={store.repoList}
        editingMode={editingMode}
        addToDocumentRequestObject={addToDocumentRequestObject}
        />
      ) :null }
      {selectedType === "pipeline" ? (
        <PipelineSelector
        store={store}
        contentControlTitle={contentControlTitle}
        type={selectedType}
        pipelineList={store.pipelineList}
        pipelineRunHistory={store.pipelineRunHistory}
        editingMode={editingMode}
        addToDocumentRequestObject={addToDocumentRequestObject}
        />
      ) :null }
      {selectedType === "release" ? (
        <ReleaseSelector
        store={store}
        contentControlTitle={contentControlTitle}
        type={selectedType}
        releaseList={store.releaseList}
        releaseHistory={store.releaseHistory}
        editingMode={editingMode}
        addToDocumentRequestObject={addToDocumentRequestObject}
        />
      ) :null }

      <br />
      <br />
    </div>
  );
});

export default ChangeTableSelector;
