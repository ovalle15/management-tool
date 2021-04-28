import React from 'react';
import axios from 'axios';
import api from '../api'
import Button from '@material-ui/core/Button';
const yaml = require('js-yaml')
const fs = require('fs')


class SelectFile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            uploadedFile : [], 
            loaded: 0
        }
        this.uploadFile = this.uploadFile.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        console.log("This is files ===>", this.state.files)
    }
    uploadFile(event) {
        this.state.uploadedFile.push(event.target.files)
       this.setState({
        uploadedFile: this.state.uploadedFile,
        loaded: 0
        })
        console.log("this is files after uploadFile",this.state.uploadedFile)
    }
    onClickHandler() {
        console.log("this is files onClickHandler===>",this.state.uploadedFile)
        const data = new FormData()
        data.append('file', this.state.uploadedFile[0])
        const yml = api.uploadItem(data);
        return yml.then(resp => {
            if (resp) {
                console.log("This is is the response from the request")
            } return resp;
        })

    }
    render () {
        console.log("this is files onrender ===>",this.state.uploadedFile)
        return <span>
            <input type="file" name="file" onChange={this.uploadFile}/>
            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
        </span>
    }
}
export default SelectFile;
