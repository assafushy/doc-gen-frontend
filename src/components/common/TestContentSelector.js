import React, { useState } from "react";

import { headingLevelOptions } from "../../store/data/dropDownOptions";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import FormContorlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { PrimaryButton } from "office-ui-fabric-react";

const dropdownStyles = {
  dropdown: { width: 300 },
};

const TestContentSelector = ({
  contentControlTitle,
  type,
  skin,
  testPlansList,
  editingMode,
  addToDocumentRequestObject,
  linkTypeFilterArray,
}) => {
  const [selectedTestPlan, setSelectedTestPlan] = useState({
    key: "",
    text: "",
  });
  const [includeAttachments, setincludeAttachments] = useState(false);
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
        placeholder="Select a Test Plan"
        label="Select a Plan"
        value={selectedTestPlan.key}
        options={testPlansList.map((testplan) => {
          return { key: testplan.id, text: testplan.name };
        })}
        styles={dropdownStyles}
        onChange={async (event, newValue) => {
          setSelectedTestPlan(newValue);
        }}
      />

      <FormContorlLabel
        control={
          <Checkbox
            value={includeAttachments}
            onChange={(event, checked) => {
              setincludeAttachments(checked);
            }}
          />
        }
        label="Include Attachments"
      />

      <FormContorlLabel
        control={<Checkbox />}
        label="Enable suite specific selection "
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
                  planId: selectedTestPlan.key,
                  includeAttachments: includeAttachments,
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

export default TestContentSelector;
