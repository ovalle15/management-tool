import React from 'react';
import Row from '../components/Row';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import api from '../api';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';


import '../components/css/display.css';


class TableComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            needsRefresh : false
        } 
        console.log("this is props in tableComp", props)
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
           console.log("This is the state in Table Comp ====>", this.state)
           this.addRow = this.addRow.bind(this)
        })
    }
    addRow() {
        let input = window.prompt("Enter Protocol Number");
        if (input) {
            console.log("This is input", input);
            const newRow = {history: [], item: input, status: "", updatedAt: new Date()}
            console.log("This is new row", newRow)
            const newItem = api.insertItem(newRow);
            return newItem.then(resp => {
                console.log(resp)
            })

        } 
  
    }

    render() {
        
        return (
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
            </TableContainer>

        );
    }
}
export default TableComp;



