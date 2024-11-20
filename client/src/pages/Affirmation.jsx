import AffirmationBox from '../components/AffirmationBox';
import { useState } from 'react';

const Affirmation = () => {
    const [affirmation, setAffirmation] = useState('');

    const getAffirmation = async () => {
        console.log("hi");
        // const response = await fetch('https://www.affirmations.dev/');
        // const data = await response.json();
        // setAffirmation(data.affirmation);
    }

    return (
        <div className="affirmation">
            <h1>Affirmation</h1>
            <AffirmationBox affirmation={affirmation} />
            <button onClick={getAffirmation}>Get Affirmation</button>
        </div>
    );
}

export default Affirmation