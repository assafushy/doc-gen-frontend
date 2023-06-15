import React, { useState, useEffect } from "react";
import { PrimaryButton } from "office-ui-fabric-react";
import { headingLevelOptions } from "../../store/data/dropDownOptions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextFieldM from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";

const CommitRangeSelector = ({
  store,
  contentControlTitle,
  skin,
  repoList,
  gitRepoCommits,
  editingMode,
  addToDocumentRequestObject,
  contentControlIndex
}) => {
  const [selectedRepo, setSelectedRepo] = useState({
    key: "",
    text: "",
  });

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
          from:selectedStartCommit.key,
          to:selectedEndCommit.key,
          rangeType:"commitSha",
          linkTypeFilterArray:null
        },
      },
      contentControlIndex
      );
  }

  const [selectedStartCommit, setSelectedStartCommit] = useState({
    key: "",
    text: "",
  });

  const [selectedEndCommit, setSelectedEndCommit] = useState({
    key: "",
    text: "",
  });

  const [contentHeadingLevel, setContentHeadingLevel] = useState(1);

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
          store.fetchGitRepoCommits(newValue.key);
          setSelectedRepo(newValue);
        }}
      />
{selectedRepo.key !== "" ? (
  <Tooltip title="Select the commit from which you want to start comparing changes. This is usually an older commit." arrow placement="right">
    <Autocomplete
      disableClearable
      style={{ marginBlock: 8 , width: 300 }}
      autoHighlight
      openOnFocus
      options = {gitRepoCommits.slice().reverse().map((commit) => {
        return { key: commit.commitId, text: `(${commit.commitId.substring(0,4)}) - ${commit.comment}`}
      })}          
      getOptionLabel={(option) => `${option.text}`}
      renderInput={(params) => (
        <TextFieldM
        {...params} 
        label="Select Oldest Commit" 
        variant="outlined"
        />
      )}
      onChange={async (event, newValue) => {
        setSelectedStartCommit(newValue);
      }}
    />
  </Tooltip>
) : null}

{selectedRepo.key !== "" ? (
  <Tooltip title="Select the commit up to which you want to view changes. This is usually a more recent commit." arrow placement="right">
    <Autocomplete
      disableClearable
      style={{ marginBlock: 8 , width: 300 }}
      autoHighlight
      openOnFocus
      options = {gitRepoCommits.map((commit) => {
        return { key: commit.commitId, text: `(${commit.commitId.substring(0,4)}) - ${commit.comment}`}
      })}
      getOptionLabel={(option) => `${option.text}`}
      renderInput={(params) => (
        <TextFieldM
        {...params} 
        label="Select Newest Commit" 
        variant="outlined"
        />
      )}
      onChange={async (event, newValue) => {
        setSelectedEndCommit(newValue);
      }}
    />
  </Tooltip>
) : null}

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

export default CommitRangeSelector;