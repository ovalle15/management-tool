import React , { Component } from 'react';
import PostDisplay from '../components/PostDisplay'
import '../components/css/display.css'
import Dropdown from '../components/Dropdown';

class ReviewPage extends React.Component {
    render(){
        return (
            <div> 
                <Dropdown></Dropdown>
                <PostDisplay></PostDisplay>
                
            </div>
            
            
        )
    }
}
export default ReviewPage;