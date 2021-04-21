import React, {Component} from 'react';
import PostEditor from './PostEditor';
import Post from './Post';
import './css/display.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import api from '../api'



class PostDisplay extends Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        this.state = {
            dropDownStatus: "",
            notOpen: true,
            history:[
                {date: null, posts: []}
            ]
        }
        this.setOpen = this.setOpen.bind(this)
        this._handleChange = this._handleChange.bind(this)
        this.updateStatus = this.updateStatus.bind(this)
        console.log("THis is current state of posts ===>", this.state.history)   
    }
    trial_status = [
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
    componentDidMount(){
        const itemId = this.props.children[1]
        const item = api.getItemsById(itemId);
        return item.then(resp => {
            const discussionItem = resp.data.item;
            console.log("this is discItems===>", discussionItem.history)
            this.setState({dropDownStatus: discussionItem.status, history : discussionItem.history})
        })
    }  
    addPost(newPostBody) {
        const newStateFinal = {date: new Date().toUTCString(), posts: []}
        newStateFinal.posts.push(newPostBody)
        console.log("This is new state", newStateFinal)
        this.state.history.push(newStateFinal)
        this.setState({history: this.state.history})
        const objectToUpdate = { 
            item: this.props.children[1], 
            status: this.state.dropDownStatus, 
            history: this.state.history
        }
        this.updateStatus(objectToUpdate)
    }
    setOpen() {
        if (this.state.notOpen) {
            this.state.notOpen = false
        } else {
            this.state.notOpen = true
        }
    }
    
    updateStatus(obj){
        const itemId = this.props.children[1];
        const item = api.updateItemById(itemId, obj)
        return item.then(resp => {
            if (resp){
                const updatedItem = resp.data;
                console.log("This is updatedItem", updatedItem)
            } return resp;
        })
        .catch(err=> {
            console.error(err);
            return err;
        })
    }
    _handleChange(e) {
        this.setState({dropDownStatus : e.target.value})
        const objectToUpdate = { 
            item: this.props.children[1], 
            status: e.target.value, 
            history: this.state.history
        }
        this.updateStatus(objectToUpdate); 
    }  

    render(){
        console.log(" in render componenet ======>",this.state.history)
        return (
            <div>
                <br></br>
                <h3>Protocol Number : {this.props.children[1]} </h3>
                <br></br>
                <FormControl style={{minWidth: 150, marginTop: "2%", float: 'right', marginBottom: "2%", marginRight: "85%"}}>
                    <InputLabel> Status </InputLabel> 
                    <Select 
                        value={this.state.dropDownStatus}
                        defaultValue = {this.state.dropDownStatus}
                        labelId="open-select-label"
                        id="open-select-label"
                        open={this.setOpen()}
                        onChange={this._handleChange}
                    >
                        {this.trial_status.map((sta, key) => (
                            <MenuItem key = {sta.value} value={sta.label}>{sta.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div>
           
                {this.state.history.map((items, index) => {
                    // console.log("this is items", items)
                    return (
                        <ul key={index}>
                        {Object.keys(items).map((key) => {
                            // console.log("this is key", key)
                            // console.log("this is items", items)
                            return (
                                <div className="panel panel-default post-body"> 
                                    <div className="panel-body" key={key + index}>{items[key]}</div>
                                </div>
                            )
                        })}
                        </ul>
                    )
                })}
                <PostEditor addPost={this.addPost}></PostEditor>  
                </div>
            </div>
        )
    }
}

export default PostDisplay;