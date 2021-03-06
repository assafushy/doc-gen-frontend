import React, { useState , useEffect} from "react";
import { PrimaryButton } from "office-ui-fabric-react";
import { headingLevelOptions } from "../../store/data/dropDownOptions";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextFieldM from '@material-ui/core/TextField';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

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
      <Autocomplete
        disableClearable
        style={{ marginBlock: 8, width: 300 }}
        autoHighlight
        openOnFocus
        options={headingLevelOptions}
        getOptionLabel={(option) => `${option.text}`}
        renderInput={(params) => (
          <TextFieldM
            {...params}
            label="Select an Heading level"
            variant="outlined"
          />
        )}
        onChange={async (event, newValue) => {
          setContentHeadingLevel(newValue.key);
        }}
      />
        <Autocomplete
          disableClearable
          style={{ marginBlock: 8 , width: 300 }}
          autoHighlight
          openOnFocus
          options={repoList.map((repo) => {
            return { key: repo.id, text: repo.name };
          })}
          getOptionLabel={(option) => `${option.text}`}
          renderInput={(params) => (
            <TextFieldM
            {...params} 
            label="Select a Repo" 
            variant="outlined"
            />
            )}
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

      {editingMode ? (
        <PrimaryButton
          text="Add Content To Document"
          onClick={() => {
            UpdateDocumentRequestObject()
          }}
        />
      ) : null}
    </div>
  );
};

export default CommitDateSelector;
