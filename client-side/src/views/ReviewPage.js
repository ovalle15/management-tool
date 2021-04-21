import React from 'react';
import PostDisplay from '../components/PostDisplay'
import '../components/css/display.css'

class ReviewPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: props.match.params.item
        }
        console.log("This props in review page", props)
    }
    render(){
        return (
            <div> 
                <PostDisplay> {this.state.item} </PostDisplay>
            </div>
        )
    }
}
export default ReviewPage;