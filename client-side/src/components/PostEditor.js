
import React, { Component } from 'react';
import './css/display.css';
import Button from '@material-ui/core/Button';

class PostEditor extends Component {
  constructor(props) {
      super(props);
      this.state ={
          newPostBody : '',
      };
        this.handlePostEditorInput = this.handlePostEditorInput.bind(this);
        this.createPost = this.createPost.bind(this) 
    }
   handlePostEditorInput(e) {
        this.setState({
            newPostBody: e.target.value
        }) 
    }
    createPost(){
        this.props.addPost(this.state.newPostBody);
        this.setState({
            newPostBody: '',
        }) ;

    }
  render() {
    return (
        <div className="panel panel-default post-editor">
            <div className="panel-body">
                <textarea 
                    className="form-control post-editor-input" 
                    value={this.state.newPostBody} 
                    onChange={this.handlePostEditorInput} />
                <Button 
                    variant="contained"
                    color="secondary"
                    style={{"marginTop": "1em"}}
                    className=" btn-success post-editor-button" onClick={this.createPost}
                    > 
                    Post
                 </Button>
            </div>
        </div> 
    )
  }
}
export default PostEditor;