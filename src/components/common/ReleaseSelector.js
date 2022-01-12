import React, { useState } from "react";

import { headingLevelOptions } from "../../store/data/dropDownOptions";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";


const dropdownStyles = {
  dropdown: { width: 300 },
};

const ReleaseSelector = ({
  store,
  contentControlTitle,
  type,
  releaseList,
  releaseHistory,
  editingMode,
  addToDocumentRequestObject,
}) => {
  const [SelectedRelease, setSelectedRelease] = useState({
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
        value={SelectedRelease.key}
        options={releaseList.map((release) => {
          return { key: release.id, text: release.name };
        })}
        styles={dropdownStyles}
        onChange={async (event, newValue) => {
          setSelectedRelease(newValue);
          store.fetchReleaseHistory(newValue.id);
        }}
      />
      {SelectedRelease.key !== "" ? (
            <Dropdown
              placeholder= "Select start release"
              label= "Select start release"
              value = {selectedReleaseHistoryStart.key}
              options = {releaseHistory.map((run) => {
                return { key: run.Id, text: run.name}
                  })}
                styles={dropdownStyles}
                onChange={async (event, newValue) => {
                    setSelectedReleaseHistoryStart(newValue);
                  }}
                />
                ) : null}      
        {SelectedRelease.key !== "" ? (
            <Dropdown
              placeholder= "Select end release"
              label= "Select end release"
              value = {selectedReleaseHistoryEnd.key}
              options = {releaseHistory.map((run) => {
                return { key: run.Id, text: run.name}
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
