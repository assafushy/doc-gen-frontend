import React, { useState , useEffect } from "react";

import { headingLevelOptions } from "../../store/data/dropDownOptions";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";


const dropdownStyles = {
  dropdown: { width: 300 },
};

const PipelineSelector = ({
  store,
  contentControlTitle,
  skin,
  pipelineList,
  pipelineRunHistory,
  editingMode,
  addToDocumentRequestObject,
  contentControlIndex
}) => {
  const [selectedPipeline, setSelectedPipeline] = useState({
    key: "",
    text: "",
  });

  useEffect(() => {
    UpdateDocumentRequestObject();
    });

  function UpdateDocumentRequestObject(){
    addToDocumentRequestObject(
      {
        type:"change-description-table",
        title: contentControlTitle,
        skin: skin,
        headingLevel: contentHeadingLevel,
        data: {
          from:selectedPipelineRunStart.key,
          to:selectedPipelineRunEnd.key,
          rangeType:"pipeline",
          linkTypeFilterArray:null
        },
      },
      contentControlIndex
      );
  }

  const [selectedPipelineRunStart, setSelectedPipelineRunStart] = useState({
    key: "",
    text: "",
  });

  const [selectedPipelineRunEnd, setSelectedPipelineRunEnd] = useState({
    key: "",
    text: "",
  });

  const [contentHeadingLevel, setContentHeadingLevel] = useState(1);

  return (
    <div>
      <Dropdown
        placeholder="Select an Heading level"
        label="Select an Heading level"
        value={contentHeadingLevel}
        options={headingLevelOptions}
        styles={dropdownStyles}
        onChange={async (event, newValue) => {
          setContentHeadingLevel(newValue.key);
        }}
      />
      <Dropdown
        placeholder="Select a Pipeline"
        label="Select a Pipeline"
        value={selectedPipeline.key}
        options={pipelineList.map((pipeline) => {
          return { key: pipeline.id, text: pipeline.name };
        })}
        styles={dropdownStyles}
        onChange={async (event, newValue) => {
          store.fetchPipelineRunHistory(newValue.key);
          setSelectedPipeline(newValue);
        }}
        />
        {selectedPipeline.key !== "" ? (
            <Dropdown
              placeholder= "Select start pipeline run"
              label= "Select start pipeline run"
              value = {selectedPipelineRunStart.key}
              options = {pipelineRunHistory.map((run) => {
                return { key: run.id, text: run.name}
                  })}
                styles={dropdownStyles}
                onChange={async (event, newValue) => {
                  setSelectedPipelineRunStart(newValue)}}
                />
                ) : null}      
        {selectedPipeline.key !== "" ? (
            <Dropdown
              placeholder= "Select end pipeline run"
              label= "Select end pipeline run"
              value = {selectedPipelineRunEnd.key}
              options = {pipelineRunHistory.map((run) => {
                return { key: run.id, text: run.name}
                  })}
                styles={dropdownStyles}
                onChange={async (event, newValue) => {
                    setSelectedPipelineRunEnd(newValue)
                  }}
                />
                ) : null}  
      <br />
      <br />

    </div>
  );
};

export default PipelineSelector;
