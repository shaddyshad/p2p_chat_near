import React from 'react' 
import EmptyDetails from './EmptyDetails';

const ThreadDetails = ({threadName}) => {
    if(!threadName){
        return <EmptyDetails />
    }

    return (
        <div>
            Hey 
        </div>
    )
}

export default ThreadDetails;