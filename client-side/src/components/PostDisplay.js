import React, {Component} from 'react';
import PostEditor from './PostEditor';
import Post from './Post';
import './css/display.css';


class PostDisplay extends Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        
        this.state = {
            posts:[
            ]
        }
    }
    addPost(newPostBody) {
        const newState = Object.assign({}, this.state);
        newState.posts.push(newPostBody);
        this.setState(newState)

    }
   
    render(){
        return (
            <div>
                {this.state.posts.map( (postBody , idx) => {
                    return (
                    <Post key={idx} postBody={postBody}/>
                    )
                })
            }
            <PostEditor addPost={this.addPost}></PostEditor>  
            
            </div>
        )
    }
 
}

export default PostDisplay;