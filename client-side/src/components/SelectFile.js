import React from 'react';
import Button from '@material-ui/core/Button';

class SelectFile extends React.Component {
    constructor(props) {
        super(props)
        this.uploadFile = this.uploadFile.bind(this);
    }
    uploadFile(event) {
        let file = event.target.files[0];
        console.log(file);

        if (file) {
            let data = new FormData(); 
            data.append('file', file);
        }
    }

    render () {
        return <span>
            <Button>
                <input type="file" name="myFile" onChange={this.uploadFile}/>
            </Button>
        </span>
    }

}
export default SelectFile;
