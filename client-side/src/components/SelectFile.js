import React from 'react';
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
            } return resp;
        })
    }
    render () {
        console.log("this is files onrender ===>",this.state.uploadedFile)
        return  <div>
                    <label htmlFor="formFile" className="label-Input">
                    </label>
                    <input 
                        type="file" 
                        className="input-file"
                        id="formFile"
                        accept=".json" 
                        onChange={this.uploadFile}
                    />
                    <br></br>
           
                    <div className="Input_Button">
                        <button className="btn btn-outline-info" type="button" onClick={this.onClickHandler}>Upload</button>
                    </div>
                </div>
    }
}
export default SelectFile;
