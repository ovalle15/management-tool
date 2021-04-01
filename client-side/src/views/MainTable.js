import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Dropdown from 'react-dropdown';
import Link from '@material-ui/core/Link'
import 'react-dropdown/style.css';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { BiCloudDownload, BiWindowAlt }  from 'react-icons/bi';
import Chip from '@material-ui/core/Chip';

import api from '../api';

const rows = []

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        "&:hover": {
          backgroundColor: "rgba(33, 150, 243, 0.5)"
        }
      }
    }
  }
})
// const trial_status = [
//     {
//       label: 'In Progress',
//       value: 'inProgress',
//     },
//     {
//       label: 'Needs Review',
//       value: 'needsReview',
//     },
//     {
//       label: 'Upload',
//       value: 'readyUpload',
//     },
//     {
//         label: 'Needs Updates',
//         value: 'needsUpdates',
//     }
//   ];

// function createData(item, status) {
//   return {
//     status,
//     item,
//     history: [
//       { reviewed: '2020-01-05', reviewer: 'Harry', comments: 3 },
//       { reviewed: '2020-01-02', reviewer: 'Tali', comments: 1 },
//       { reviewed: '2020-01-02', reviewer: 'Tali', comments: 1 },
//       { reviewed: '2020-01-02', reviewer: 'Tali', comments: 1 },
//       { reviewed: '2020-01-02', reviewer: 'Tali', comments: 1 },
//       { reviewed: '2020-01-02', reviewer: 'Tali', comments: 1 },
//       { reviewed: '2020-01-02', reviewer: 'Tali', comments: 1 },
//     ],
//   };
// }
function setLocalStorage(row) {
    window.localStorage.setItem("items", JSON.stringify(row))
}
function fetchFromLocalStorage(){
    var data = JSON.parse(window.localStorage.getItem("items"))
    console.log("This is data", data)
    dataRowCreation(data)
}

function dataRowCreation(data) {

    for (var obj of data) {
        var item = obj.item
        var status = obj.status 
        var hist = obj.history
        rows.push({"item": item, "status": status, "history": hist})
    }
    console.log("this is rows", rows)
    return rows
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);


//   const data = api.getAllItems();
//   console.log("This is the data from the db ===>", data)


//   console.log("This is row ===>", row);
fetchFromLocalStorage()

  return (
    <React.Fragment>
      <TableRow size="large" theme={theme}>
        <TableCell>
          <IconButton
              aria-label="expand row"
              size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row">
          {row.item}
        </TableCell>
        <TableCell
          align="center">
          <Link href={`/item/${row.item}`}>
            <Button
                variant="outlined"
                color="primary">
                review
            </Button>
          </Link>
        </TableCell>
        <TableCell
          align="center">
          <Chip
          label={row.status}
          color="primary"
          variant="outlined"
          />
        </TableCell>
        <TableCell>
          <BiCloudDownload size="30">
          </BiCloudDownload>
        </TableCell>
        <TableCell>
            <IconButton
                aria-label="delete">
              <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>

              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableCell align="left">Last Reviewed</TableCell>
                    <TableCell align="left">Reviewer</TableCell>
                    <TableCell align="left">Comments</TableCell>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.reviewed}>
                      <TableCell align="left" component="th" scope="row">
                        {historyRow.reviewed}
                      </TableCell>
                      <TableCell align="left">{historyRow.reviewer}</TableCell>
                      <TableCell align="left">{historyRow.comments}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    status: PropTypes.arrayOf(
        PropTypes.shape({
           label:PropTypes.string.isRequired,
           value: PropTypes.string.isRequired
        })
    ).isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        comments: PropTypes.number.isRequired,
        reviewer: PropTypes.string.isRequired,
        reviewed: PropTypes.string.isRequired,
      }),
    ).isRequired,
    protocol: PropTypes.string.isRequired
  }).isRequired,
};

// const rows = [
//   createData('01-001', 'NeedsReview'),
//   createData('01-002', 'Updated'),
//   createData('01-003', 'Upload'),
//   createData('10-004', 'In Progress'),
//   createData('10-005', 'Needs Updates')
// ];

// setLocalStorage(rows)
fetchFromLocalStorage()

export default function MainTable() {

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableBody>
          {rows.map((row) => (
            <Row key={row.item} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
