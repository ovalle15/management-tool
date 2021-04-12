import React from 'react';
import './css/display.css'

const Post = (props) => ( 
    <div className="panel panel-default post-body">
        <div className="panel-body">
            { props.postBody }
       
        </div>
    </div>
);
export default Post; 