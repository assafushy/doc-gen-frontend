import React, { useState , useEffect} from "react";
import { headingLevelOptions } from "../../store/data/dropDownOptions";
import FormContorlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { PrimaryButton } from "office-ui-fabric-react";


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const TestContentSelector = ({
  store,
  contentControlTitle,
  type,
  skin,
  testPlansList,
  testSuiteList,
  editingMode,
  addToDocumentRequestObject,
  linkTypeFilterArray,
  contentControlIndex,
}) => {
  const [selectedTestPlan, setSelectedTestPlan] = useState({
    key: "",
    text: "",
  });
  const [selectedTestSuites, setSelectedTestSuites] = useState([]);
  const [includeAttachments, setIncludeAttachments] = useState(false);
  const [isSuiteSpecific, setIsSuiteSpecific] = useState(false);
  const [contentHeadingLevel, setContentHeadingLevel] = useState(1);

  useEffect(() => {
    if (editingMode === false){  
      UpdateDocumentRequestObject();
    }
  });

  function UpdateDocumentRequestObject(){
    let testSuiteIdList = undefined
    if(isSuiteSpecific)
    {
        testSuiteIdList = selectedTestSuites.map((data) => {
        return data.id
      })
    }
    addToDocumentRequestObject(
      {
        type: type,
        title: contentControlTitle,
        skin: skin,
        headingLevel: contentHeadingLevel,
        data: {
          testPlanId:selectedTestPlan.key,
          testSuiteArray:testSuiteIdList,
          includeAttachments:includeAttachments
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
          <TextField
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
        style={{ marginBlock: 8, width: 300 }}
        autoHighlight
        openOnFocus
        options={testPlansList.map((testplan) => {
          return { key: testplan.id, text: testplan.name};
        })}
                getOptionLabel={(option) => `${option.text}`}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a Test Plan"
            variant="outlined"
          />
        )}
        onChange={async (event, newValue) => {
          store.fetchTestSuitesList(newValue.key)
          setSelectedTestPlan(newValue);
        }}
      />
      <FormContorlLabel
        control={
          <Checkbox
            value={includeAttachments}
            onChange={(event, checked) => {
              setIncludeAttachments(checked);
            }}
          />
        }
        label="Include Attachments"
      />

      <FormContorlLabel
        control={
        <Checkbox 
          value={includeAttachments}
          onChange={(event, checked) => {
            setIsSuiteSpecific(checked);
          }}
          />
        }
        label="Enable suite specific selection "
      />
{isSuiteSpecific ? (
<Autocomplete
      style={{ marginBlock: 8, width: 300 }}
      multiple
      options={testSuiteList}
      disableCloseOnSelect
      autoHighlight
      groupBy={(option) => option.parent}
      getOptionLabel={(option) => `${option.name} - (${option.id})`}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {`${option.name} - (${option.id})`}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField 
        {...params} 
        label="With suite cases" 
        variant="outlined"
        />
        )}
        onChange={async (event, newValue) => {
          setSelectedTestSuites(newValue);
        }}
    />
    ) : null}
      <br />
      <br />
      {/* works only in document managing mode */}
      {editingMode ? (
        <PrimaryButton
          text="Add Content To Document"
          onClick={() => {
            UpdateDocumentRequestObject();
          }}
        />
      ) : null}
    </div>
  );
};

export default TestContentSelector;
