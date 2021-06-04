import React from 'react';
import Button from '@material-ui/core/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import api from '../api';
import '../components/css/display.css';


class SelectFile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            uploadedFile : null
        }

        this.uploadFile = this.uploadFile.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.trimExtension = this.trimExtension.bind(this);

    }

    uploadFile(event) {
       console.log("this is events", event.target.files[0])
        this.setState({ uploadedFile:  event.target.files[0]})
    }

    trimExtension () {
        var filename = this.state.uploadedFile.name
        const trimmedFilename = filename.split('.').slice(0, -1).join('.')
        return trimmedFilename
    }

    onClickHandler = () => {
        console.log("this is files onClickHandler===>",this.state.uploadedFile)
        var item = this.trimExtension();
        const data = new FormData()
        data.append('item', item)
        data.append('file', this.state.uploadedFile)

        const yml = api.uploadItem(data);
        return yml.then(resp => {
            if (resp) {
                console.log("This is is the response from the request", resp)
                window.alert("Trial history saved")
            } return resp;
        })
    }

    render () {
        console.log("this is files onrender ===>",this.state.uploadedFile)
        return  <div>
                    <label
                        htmlFor="formFile"
                        className="label-Input"
                        style={{
                            display: "block",
                            margin: "10px 10px 0"
                        }}
                    >
                        Choose a .yml file to upload
                    </label>
                    <input
                        style={{marginLeft: '107px'}}
                        type="file"
                        className="input-file"
                        id="formFile"
                        accept=".yml"
                        onChange={this.uploadFile}
                    />
                    <br></br>

                    <div
                        className="Input_Button"
                        style={{ marginTop: "10px" }}
                    >
                        <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={this.onClickHandler}>
                            Upload
                        </Button>
                    </div>
                </div>
    }
}
export default SelectFile;
