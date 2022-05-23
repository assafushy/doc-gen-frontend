import React, { useState , useEffect} from "react";

import { headingLevelOptions } from "../../store/data/dropDownOptions";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";


const dropdownStyles = {
  dropdown: { width: 300 },
};

const ReleaseSelector = ({
  store,
  contentControlTitle,
  skin,
  releaseDefinitionList,
  releaseDefinitionHistory,
  editingMode,
  addToDocumentRequestObject,
  contentControlIndex
}) => {

  useEffect(() => {
    if (editingMode === false){  
      UpdateDocumentRequestObject();
    }
  });
  
  function UpdateDocumentRequestObject(){
    addToDocumentRequestObject(
      {
        type:"change-description-table",
        title: contentControlTitle,
        skin: skin,
        headingLevel: contentHeadingLevel,
        data: {
          from:selectedReleaseHistoryStart.key,
          to:selectedReleaseHistoryEnd.key,
          rangeType:"release",
          linkTypeFilterArray:null
        },
      },
      contentControlIndex
      );
  }

  const [SelectedReleaseDefinition, setSelectedReleaseDefinition] = useState({
    key: "",
    text: "",
  });

  const [selectedReleaseHistoryStart, setSelectedReleaseHistoryStart] = useState({
    key: "",
    text: "",
  });

  const [selectedReleaseHistoryEnd, setSelectedReleaseHistoryEnd] = useState({
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
        placeholder="Select a Release"
        label="Select a Release"
        value={SelectedReleaseDefinition.key}
        options={releaseDefinitionList.map((releaseDefinition) => {
          return { key: releaseDefinition.id, text: releaseDefinition.name };
        })}
        styles={dropdownStyles}
        onChange={async (event, newValue) => {
          setSelectedReleaseDefinition(newValue);
          console.log(newValue);
          store.fetchReleaseDefinitionHistory(newValue.id);
        }}
      />
      {SelectedReleaseDefinition.key !== "" ? (
            <Dropdown
              placeholder= "Select start release"
              label= "Select start release"
              value = {selectedReleaseHistoryStart.key}
              options = {releaseDefinitionHistory.map((run) => {
                return { key: run.id, text: run.name}
                  })}
                styles={dropdownStyles}
                onChange={async (event, newValue) => {
                    setSelectedReleaseHistoryStart(newValue);
                  }}
                />
                ) : null}      
        {SelectedReleaseDefinition.key !== "" ? (
            <Dropdown
              placeholder= "Select end release"
              label= "Select end release"
              value = {selectedReleaseHistoryEnd.key}
              options = {releaseDefinitionHistory.map((run) => {
                return { key: run.id, text: run.name}
                  })}
                styles={dropdownStyles}
                onChange={async (event, newValue) => {
                    setSelectedReleaseHistoryEnd(newValue);
                  }}
                />
                ) : null}  
      <br />
      <br />

    </div>
  );
};

export default ReleaseSelector;
