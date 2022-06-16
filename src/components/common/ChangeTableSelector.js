import React, { useState } from "react";
import CommitRangeSelector from "./CommitRangeSelector";
import CommitDateSelector from "./CommitDateSelector";
import PipelineSelector from "./PipelineSelector";
import ReleaseSelector from "./ReleaseSelector";
import { observer } from "mobx-react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextFieldM from '@material-ui/core/TextField';

const baseDataType = [
  { key: 0, text: "commit-range", type: "range" },
  { key: 1, text: "commit-date", type: "date" },
  { key: 2, text: "pipeline-range", type: "pipeline" },
  { key: 3, text: "release-range", type: "release" },
];

const ChangeTableSelector = observer(
  ({
    store,
    contentControlType,
    contentControlSkin,
    contentControlTitle,
    editingMode,
    addToDocumentRequestObject,
    contentControlIndex,
  }) => {
    const [selectedType, setselectedType] = useState("");

    return (
      <div>
        <Autocomplete
          disableClearable
          style={{ marginBlock: 8, width: 300 }}
          autoHighlight
          openOnFocus
          options={baseDataType}
          getOptionLabel={(option) => `${option.text}`}
          renderInput={(params) => (
            <TextFieldM
              {...params}
              label="Select Base Data Type"
              variant="outlined"
            />
          )}
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
            contentControlIndex={contentControlIndex}
          />
        ) : null}
        {selectedType === "date" ? (
          <CommitDateSelector
            contentControlTitle={contentControlTitle}
            skin="change-table"
            repoList={store.repoList}
            editingMode={editingMode}
            addToDocumentRequestObject={addToDocumentRequestObject}
            contentControlIndex={contentControlIndex}
          />
        ) : null}
        {selectedType === "pipeline" ? (
          <PipelineSelector
            store={store}
            contentControlTitle={contentControlTitle}
            skin="change-table"
            pipelineList={store.pipelineList}
            pipelineRunHistory={store.pipelineRunHistory}
            editingMode={editingMode}
            addToDocumentRequestObject={addToDocumentRequestObject}
            contentControlIndex={contentControlIndex}
          />
        ) : null}
        {selectedType === "release" ? (
          <ReleaseSelector
            store={store}
            contentControlTitle={contentControlTitle}
            skin="change-table"
            releaseDefinitionList={store.releaseDefinitionList}
            releaseDefinitionHistory={store.releaseDefinitionHistory}
            editingMode={editingMode}
            addToDocumentRequestObject={addToDocumentRequestObject}
            contentControlIndex={contentControlIndex}
          />
        ) : null}

        <br />
        <br />
      </div>
    );
  }
);

export default ChangeTableSelector;
