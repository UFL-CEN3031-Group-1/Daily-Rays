import AffirmationBox from '../components/AffirmationBox';
import { useState } from 'react';
const ReceivedAffirmation = ({ affirmation }) => (
    <div>
        <h2>Your Received Affirmation</h2>
        <p>{affirmation}</p>
    </div>
);

const Affirmation = () => {
    const [affirmation, setAffirmation] = useState('');
    const [currentPage, setCurrentPage] = useState('enter'); // 'enter', 'confirm', 'receive'. Can probably be done a bit better
    const [receivedAffirmation, setReceivedAffirmation] = useState('');

    const fetchMockAffirmation = async () => {
        return new Promise((resolve) =>
            setTimeout(() => resolve('Yippeeee!'), 1000)
        );
    };

    const handleNextToConfirm = () => {
        if (affirmation.trim()) {
            setCurrentPage('confirm');
        } else {
            alert('Please enter a valid affirmation.');
        }
    };

    const handleConfirmAffirmation = async () => {
        const fetchedAffirmation = await fetchMockAffirmation();
        setReceivedAffirmation(fetchedAffirmation);
        setCurrentPage('receive');
    };

    const handleBackToEnter = () => {
        setAffirmation('');
        setCurrentPage('enter');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'enter':
                return (
                    <div>
                        <h1>Enter Your Affirmation</h1>
                        {/* <AffirmationBox affirmation={affirmation} /> */}
                        <textarea
                            value={affirmation}
                            onChange={(e) => setAffirmation(e.target.value)}
                            placeholder="Write your affirmation here..."
                        />
                        <button onClick={handleNextToConfirm}>Next</button>
                    </div>
                );
            case 'confirm':
                return (
                    <div>
                        <h1>Affirmation sent! Want to recieve an affirmation?</h1>
                        <button onClick={handleConfirmAffirmation}>Confirm</button>
                        <button onClick={() => handleBackToEnter()}>Back</button>
                    </div>
                );
            case 'receive':
                return (
                    <div>
                        <h1>Receive an Affirmation</h1>
                        <ReceivedAffirmation affirmation={receivedAffirmation} />
                        <button onClick={() => handleBackToEnter()}>Back</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div className="affirmation">{renderPage()}</div>;
};

export default Affirmation;