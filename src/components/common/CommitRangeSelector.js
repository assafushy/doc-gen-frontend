import React, { useState , useEffect} from "react";

import { headingLevelOptions } from "../../store/data/dropDownOptions";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";

const dropdownStyles = {
  dropdown: { width: 300 },
};

const CommitRangeSelector = ({
  store,
  contentControlTitle,
  skin,
  repoList,
  gitRepoCommits,
  editingMode,
  addToDocumentRequestObject,
}) => {
  const [selectedRepo, setSelectedRepo] = useState({
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
          repoId:selectedRepo.key,
          from:selectedStartCommit.key,
          to:selectedEndCommit.key,
          rangeType:"commitSha",
          linkTypeFilterArray:null
        },
      },
      0
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
            store.fetchGitRepoCommits(newValue.key);
            setSelectedRepo(newValue);
        }}
      />
      {selectedRepo.key !== "" ? (
      <Dropdown
        placeholder= "Select start commit"
        label= "Select start commit"
        value = {selectedStartCommit.key}
        options = {gitRepoCommits.map((commit) => {
          return { key: commit.commitId, text: `(${commit.commitId.substring(0,4)}) - ${commit.comment}`}
            })}
          styles={dropdownStyles}
          onChange={async (event, newValue) => {
            setSelectedStartCommit(newValue);
          }}
          />
          ) : null}      
      {selectedRepo.key !== "" ? (
      <Dropdown
        placeholder= "Select end commit"
        label= "Select end commit"
        value = {selectedEndCommit.key}
        options = {gitRepoCommits.map((commit) => {
          return { key: commit.commitId, text: `(${commit.commitId.substring(0,4)}) - ${commit.comment}`}
        })}
        styles={dropdownStyles}
        onChange={async (event, newValue) => {
            setSelectedEndCommit(newValue);
          }}
        />
        ) : null}      

      <br />
      <br />

    </div>
  );
};

export default CommitRangeSelector;
