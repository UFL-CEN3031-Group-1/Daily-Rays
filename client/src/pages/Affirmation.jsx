import AffirmationBox from '../components/AffirmationBox';
import AffirmationBoxWithValidation from '../components/AffirmationBoxWithValidation';
import { useState } from 'react';
import axios from 'axios';
import AddCommentIcon from '@mui/icons-material/AddComment';

const ReceivedAffirmation = ({ affirmation }) => (
    <div>
        <h2>Your Received Affirmation</h2>
        <p>{affirmation}</p>
    </div>
);

const Affirmation = () => {
    const [affirmation, setAffirmation] = useState('');
    const [positiveAffirmation, setPositiveAffirmation] = useState(false);
    const [currentPage, setCurrentPage] = useState('enter'); // 'enter', 'confirm', 'receive'
    const [receivedAffirmation, setReceivedAffirmation] = useState('');

    const fetchAffirmation = async () => {
        const response = await axios.get('http://127.0.0.1:5050/api/receive');
        return response.data;
    };

    const handleNextToConfirm = () => {
        if (positiveAffirmation) {
            setCurrentPage('confirm');
        } else {
            alert('Please enter a positive affirmation to proceed.');
        }
    };

    const handleConfirmAffirmation = async () => {
        const fetchedAffirmation = await fetchAffirmation();
        setReceivedAffirmation(fetchedAffirmation.affirmation || fetchAffirmation.error);
        setCurrentPage('receive');
    };

    const handleBackToEnter = () => {
        setAffirmation('');
        setReceivedAffirmation('')
        setPositiveAffirmation(false);
        setCurrentPage('enter');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'enter':
                return (
                    <div>
                        <div>
                            <br></br>
                            <AddCommentIcon fontSize="medium" sx={{ margin: 1 }} />
                            <AddCommentIcon fontSize="medium" sx={{ margin: 1 }} />
                            <AddCommentIcon fontSize="medium" sx={{ margin: 1 }} />
                            <h1>Enter Your Affirmation</h1>
                            <AffirmationBoxWithValidation
                                affirmation={affirmation}
                                setPositiveAffirmation={setPositiveAffirmation}
                            />
                            <textarea
                                value={affirmation}
                                onChange={(e) => setAffirmation(e.target.value)}
                                placeholder="Write your affirmation here..."
                                style={{
                                    width: '50%',     // Takes up full width of the container
                                    height: '100',   // Makes the height larger
                                    fontSize: '16px',  // Increases the text size
                                    padding: '10px',   // Adds padding inside the textarea
                                    borderRadius: '5px' // Optional: Adds rounded corners for a smoother look
                                }}
                            />
                        </div>
                        <div>
                            <button onClick={handleNextToConfirm}>Next</button>
                        </div>
                    </div>
                );
            case 'confirm':
                return (
                    <div>
                        <h1>Affirmation sent! Want to receive an affirmation?</h1>
                        <button onClick={handleConfirmAffirmation}>Confirm</button>
                        <button onClick={handleBackToEnter}>Back</button>
                    </div>
                );
            case 'receive':
                return (
                    <div>
                        <h1>Receive an Affirmation</h1>
                        <ReceivedAffirmation affirmation={receivedAffirmation} />
                        <button onClick={handleBackToEnter}>Back</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div className="affirmation">{renderPage()}</div>;
};

export default Affirmation;
