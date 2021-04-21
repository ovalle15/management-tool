import React from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
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


export default class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: props,
            notOpen: true,
            open: null,
        };
        // console.log("This is props", this.state.row.row.history)
        this.setOpen = this.setOpen.bind(this)
        this.getLastIndexFromHistory = this.getLastIndexFromHistory.bind(this)
        this.sortHistory = this.sortHistory.bind(this)
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
    setOpen(){
        if (this.state.notOpen) {
            this.state.notOpen = false
        } else {
            this.state.notOpen = true
        }
    }
    getLastIndexFromHistory() {
        const history = this.state.row.row.history
        return history[history.length - 1]
        
    }
    sortHistory () {
        const toSort = this.state.row.row.history
        const sorted = toSort.sort(function(a, b){
            var d1 = new Date(a.date) 
            var d2 = new Date(b.date)
            return d2 - d1 
        })
        
        console.log("This is sorted?", sorted)
        // return the first five elements 
        return sorted.slice(0, 5)
    }
    render() {
        console.log("Row ===>", this.state.row.row);
        console.log("History ===>", this.state.row.row.history);
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
                        </TableHead>
                        <TableBody>
                            <TableRow>
                            {this.sortHistory().map((items, index) => {
                                return (
                                    <ul key={index}>
                                    {Object.keys(items).map((key)=> {
                                        return (
                                           
                                            <TableRow key={key} >
                                                {items[key]}
                                            </TableRow>
                                            
                                        )  
                                    })}
                                    </ul>
                                )
                            })}
                            </TableRow>
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