import React from 'react';
import axios from 'axios';
import api from '../api'
import Button from '@material-ui/core/Button';
import { runInThisContext } from 'vm';
const yaml = require('js-yaml')
const fs = require('fs')


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
        return <span>
            <input type="file" name="file" accept=".json" onChange={this.uploadFile}/>
            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
        </span>
    }
}
export default SelectFile;
