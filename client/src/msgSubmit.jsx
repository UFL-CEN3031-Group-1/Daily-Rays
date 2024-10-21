import React from 'react';
import {db} from "../firebase";


function MyComponent() {

    const [message, setMessage] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()

        //add message to db
        db.collection('affirmations')
            .add({
                message: message
            })
            .then(() => {
                message=("") //reset
            })
    };

    return (
        <div>
            <form class="affirm-form" onSubmit={handleSubmit}>
                <div> Please Input Affirmation</div>
                <textarea 
                    placeholder="message"
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button class="submitBtn" type="submit">Send Affirmation</button>
            </form>
        </div>

    )
  }
  
  export default MessageSubmit;