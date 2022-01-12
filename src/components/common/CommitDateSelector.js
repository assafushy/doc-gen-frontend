import React, { useState } from "react";

import { headingLevelOptions } from "../../store/data/dropDownOptions";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";

// import DatePicker from '@mui/lab/DatePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';


const dropdownStyles = {
  dropdown: { width: 300 },
};

const CommitDateSelector = ({
  contentControlTitle,
  type,
  repoList,
  editingMode,
  addToDocumentRequestObject,
}) => {
  const [selectedRepo, setSelectedRepo] = useState({
    key: "",
    text: "",
  });

  const [selectedDate, setSelectedDate] = useState({
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
        placeholder="Select a Repo"
        label="Select a Repo"
        value={selectedRepo.key}
        options={repoList.map((repo) => {
          return { key: repo.id, text: repo.name };
        })}
        styles={dropdownStyles}
        onChange={async (event, newValue) => {
        setSelectedRepo(newValue);
        }}
        
      />
{/* <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label="Basic example"
    value={selectedDate}
    onChange={(newValue) => {
      setSelectedDate(newValue);
    }}
    // renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider> */}
      <br />
      <br />

    </div>
  );
};

export default CommitDateSelector;
