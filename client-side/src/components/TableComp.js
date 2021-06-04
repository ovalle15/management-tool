import React from 'react';
import Row from '../components/Row';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import api from '../api';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import LogOut from './auth/LogOut'



import '../components/css/display.css';


class TableComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            needsRefresh : false
        }
        this.addRow = this.addRow.bind(this)
        this.formatDate = this.formatDate.bind(this)
    }

    componentDidMount() {
        this.setState({needsRefresh : !this.state.needsRefresh})
        const tb = api.getAllItems()
        return tb.then(resp => {
           const table = resp.data.items;
           this.setState({
               needsRefresh: !this.state.needsRefresh,
               rows: table
           })
        })
    }

    formatDate() {
        const newDate = new Date();
        var month = '' + ("0" + (newDate.getMonth() + 1)).slice(-2);
        var day = '' + newDate.getDate();
        var year = newDate.getFullYear();
        var hour = newDate.getHours();
        var minutes = newDate.getMinutes();
        if (minutes.length < 2) {
            minutes = "0" + newDate.getMinutes();
        } else {
            minutes = newDate.getMinutes();
        }
        var ampm = hour >= 12 ? 'pm': 'am';
        hour = hour % 12;
        var finalDateTime = [month, day, year].join('/') +
        " " + hour + ":" + minutes + " " + ampm
        console.log("This finalDate", finalDateTime)
        return finalDateTime
    }
    addRow() {
        let input = window.prompt("Enter Protocol Number");
        if (input) {
            console.log("This is input", input);
            const newRow = {history: [], item: input, status: "", updatedAt: this.formatDate()}
            console.log("This is new row", newRow)
            this.state.rows.push(newRow)
            this.setState({rows: this.state.rows})
            const newItem = api.insertItem(newRow);
            return newItem.then(resp => {
                if (resp) {
                    console.log("A new row has been created", resp.data)
                } return resp;
            })
            .catch(err=> {
                console.error(err);
                return err;
            })
        }
    }
    render() {

        return (
            <div>
                <div>
                    <LogOut></LogOut>
                </div>
                <TableContainer>
                    <Table aria-label="collapsible table">
                        <TableBody>
                        {this.state.rows.map((row) => (
                            <Row key={row.item} row={row} />
                        ))}
                        </TableBody>
                    </Table>
                    <br></br>

                    <Fab aria-label='Add'  color='primary' size="medium" onClick= {this.addRow}>
                        <AddIcon />
                    </Fab>
                    <h1 className="entry-trial">
                            New trial entry
                    </h1>

                </TableContainer>

            </div>

        );
    }
}
export default TableComp;



