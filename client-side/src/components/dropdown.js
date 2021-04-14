import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


const Styles = makeStyles(() => ({

    FormControl: {
        float: 'left',
        minWidth: 200,
        marginTop: "2%",
        marginLeft: "80%" ,
        marginBottom: "5%"

    },
}));

export default function Dropdown() {
    const trial_status = [
        {
          label: 'In Progress',
          value: 'inProgress',
        },
        {
          label: 'Needs Review',
          value: 'needsReview',
        },
        {
          label: 'Upload',
          value: 'readyUpload',
        },
        {
          label: 'Needs Updates',
          value: 'needsUpdates',
        }
      ];
    const classes = Styles();
    const [status, setStatus] = React.useState('');
    console.log('status ===>', status)
    const [open, setOpen] = React.useState(false);

    const handleChange = (e) => {
        setStatus(e.target.value);
        console.log("this is e", e)
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div >
            <Button onClick={handleOpen}>
            
            </Button>
            <FormControl className={classes.FormControl}>
                <InputLabel id="open-select-label"> Status </InputLabel> 
                <Select 
                    labelId="open-select-label"
                    id="open-select-label"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={status}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    {trial_status.map((sta, key) => (
                        <MenuItem key = {sta.value} value={sta.value}>{sta.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}