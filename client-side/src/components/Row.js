import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Link from '@material-ui/core/Link'
import 'react-dropdown/style.css';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { BiCloudDownload }  from 'react-icons/bi';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table'


import api from '../api';

export default class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: props,
            notOpen: true
        };
        console.log("This is props", this.state.row.row.item)
        console.log("This is open", this.state.open)
        this.deleteItem = this.deleteItem.bind(this)
        this.setOpen = this.setOpen.bind(this)
    };
    theme = createMuiTheme({
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

    state = {
        needsRefresh: false,
        table: null
    };

    componentDidMount() {
        
    }
    setOpen(){
        
        console.log("This is open inside setOpen", this.state.notOpen)
        if (this.state.notOpen) {
            this.state.notOpen = false
        } else {
            this.state.notOpen = true
            console.log("This is open inside setOpen-else", this.state.notOpen)
        }
    }

    deleteItem() {

    }
    render() {
        return (
            <React.Fragment>
              <TableRow size="large" theme={this.theme}>
                <TableCell>
                  <IconButton
                      aria-label="expand row"
                      size="small" onClick={() => this.setState({open: this.setOpen()})}>
                    {this.state.notOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row">
                  {this.state.row.row.item}
                </TableCell>
                <TableCell
                  align="center">
                  <Link href={`/item/${this.state.row.row.item}`}>
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
                  label={this.state.row.row.status}
                  color="primary"
                  variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <BiCloudDownload size="30">
                  </BiCloudDownload>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={!this.state.notOpen} timeout="auto" unmountOnExit>
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
                          {this.state.row.row.history.map((historyRow) => (
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
}