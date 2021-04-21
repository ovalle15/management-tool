import React from 'react';
import Row from '../components/Row';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import api from '../api';

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
           console.log(resp)
           const table = resp.data.items;
           console.log(table)
           this.setState({
               needsRefresh: !this.state.needsRefresh,
               rows: table
           })
        })
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
            </TableContainer>

        );
    }
}
export default TableComp;



