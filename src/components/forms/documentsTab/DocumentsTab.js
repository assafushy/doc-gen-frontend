import React from "react";
import { observer } from "mobx-react";

import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const dropdownStyles = {
  dropdown: { width: 300 },
};

const DocumentsTab = observer(({ store }) => {
  return (
    <div>
      <Dropdown
        placeholder="Select a TeamProject"
        label="Select a TeamProject"
        value={store.teamProject}
        options={store.teamProjectsList.map((teamProject) => {
          return { key: teamProject.id, text: teamProject.name };
        })}
        styles={dropdownStyles}
        onChange={(event, newValue) => {
          store.setTeamProject(newValue.key, newValue.text);
        }}
      />
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Document Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Changed Date</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.documents.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    <a href={row.url}>{row.name}</a>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.lastModified}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
});
export default DocumentsTab;
