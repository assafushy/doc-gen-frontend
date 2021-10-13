import React, { useState } from "react";

import { headingLevelOptions } from "../../store/data/dropDownOptions";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { PrimaryButton } from "office-ui-fabric-react";

const dropdownStyles = {
  dropdown: { width: 300 },
};

const QueryContentSelector = ({
  contentControlTitle,
  type,
  skin,
  sharedQueriesList,
  editingMode,
  addToDocumentRequestObject,
  linkTypeFilterArray = null,
}) => {
  const [contentHeadingLevel, setContentHeadingLevel] = useState(1);
  const [selectedSharedQuery, setselectedSharedQuery] = useState({
    key: "",
    text: "",
  });
  return (
    <div>
      <Dropdown
        placeholder="Select an Heading level"
        label="Select an Heading level"
        value={contentHeadingLevel}
        options={headingLevelOptions}
        styles={dropdownStyles}
        onChange={(event, newValue) => {
          setContentHeadingLevel(newValue.key);
        }}
      />
      <Dropdown
        placeholder="Select a Query"
        label="Select a Query"
        value={selectedSharedQuery.id}
        options={sharedQueriesList.map((query) => {
          return { id: query.id, text: query.queryName };
        })}
        styles={dropdownStyles}
        onChange={(event, newValue) => {
          setselectedSharedQuery(newValue.id.toString());
        }}
      />
      <br />
      <br />
      {/* works only in document managing mode */}
      {editingMode ? (
        <PrimaryButton
          text="Add Content To Document"
          onClick={() => {
            addToDocumentRequestObject(
              {
                title: contentControlTitle,
                skin: skin,
                headingLevel: contentHeadingLevel,
                data: {
                  type: type,
                  queryId: selectedSharedQuery,
                },
              },
              null,
              linkTypeFilterArray
            );
          }}
        />
      ) : null}
    </div>
  );
};
export default QueryContentSelector;
