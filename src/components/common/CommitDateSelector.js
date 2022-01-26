import React, { useState , useEffect} from "react";

import { headingLevelOptions } from "../../store/data/dropDownOptions";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";

import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';


const dropdownStyles = {
  dropdown: { width: 300 },
};

const CommitDateSelector = ({
  contentControlTitle,
  skin,
  repoList,
  editingMode,
  addToDocumentRequestObject,
  contentControlIndex
}) => {
  const [selectedRepo, setSelectedRepo] = useState({
    key: "",
    text: "",
  });
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());

  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [contentHeadingLevel, setContentHeadingLevel] = useState(1);

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
            repoId:selectedRepo.key,
            from:selectedStartDate,
            to:selectedEndDate,
            rangeType:"date",
            linkTypeFilterArray:null
          },
        },
        contentControlIndex
        );
    }
    
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker 
          autoOk
          label="StartDate"
          disableFuture
          value={selectedStartDate}
            onChange={setSelectedStartDate}
          />

          <DatePicker 
          autoOk
          label="EndDate"
          disableFuture
          value={selectedEndDate}
            onChange={setSelectedEndDate} 
          />
        </MuiPickersUtilsProvider>
      <br />
      <br />
    </div>
  );
};

export default CommitDateSelector;
