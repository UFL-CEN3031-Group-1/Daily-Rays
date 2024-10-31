import React from 'react';
import { useState } from 'react';
import '@fontsource/roboto/400.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import Divider from '@mui/material/Divider';
import { Grid2 } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button'; 

const MindfulMinutes = () => {
    const [relaxationTimes, setRelaxationTimes] = useState(["", ""]); // Initial state for relaxation times
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [notificationsEnabled, setNotificationsEnabled] = useState(false); // New state for notifications


    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/getmindful'); // Adjust the URL as needed
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data); // Log the data for debugging

            const formattedTimes = data.recommended_relaxation_slots.map(formatTime);
            setRelaxationTimes(formattedTimes || ["", ""]); // Update state
            setNotificationsEnabled(true);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div> 
            <Box textAlign="center" padding={0.5}>
                <Box display="flex" justifyContent="center" marginBottom={1} paddingTop={2}>
                    <MoreTimeIcon fontSize="medium" sx={{ margin: 1 }} />
                    <MoreTimeIcon fontSize="medium" sx={{ margin: 1 }} />
                    <MoreTimeIcon fontSize="medium" sx={{ margin: 1 }} />
                </Box>
                <Typography variant="h4" gutterBottom >
                    <strong>Mindful Minutes</strong>
                </Typography>
                <Typography variant="body1" paddingBottom={2}>
                    Finding it challenging to prioritize self-care amidst your busy life? <br />
                    We’ve got you covered!
                </Typography>
            </Box>
            {/* <Divider variant="middle" component="li" /> */}
            <Grid2 container spacing={2} justifyContent="center" padding={2}>
                <Grid2 size={4}>
                    <Typography variant="h6" gutterBottom >
                        <strong>{formattedDate}</strong>
                    </Typography>
                    {/* <Box display="flex" alignItems="center" justifyContent="center">
                        <Typography variant="body1" sx={{ marginRight: 1 }}> 
                            Enable Notifications:
                        </Typography>
                        <Switch {...label} color="warning" />
                    </Box>  */}
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Button
                            variant="contained"
                             color="warning"
                            onClick={handleClick}
                            sx={{ width: '50%' }} // Set button width to half
                        >
                            Get my Mindful Minutes
                        </Button>
                    </Box>   
                    {notificationsEnabled && ( 
                        <Box display="flex" alignItems="center" justifyContent="center" marginTop={2}>
                            <Typography variant="body1" sx={{ marginRight: 1 }}>
                                Enable Notifications:
                            </Typography>
                            <Switch {...label} color="warning" />
                        </Box>
                    )}
                                    

                </Grid2>
                <Grid2 size={8}>
                    <Card sx={{ width: '100%',  padding: 1 }}>
                        <CardContent>
                            <Typography variant="h7" component="div">
                                Task 1
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {relaxationTimes[0] || "Blah blah"}
                            </Typography>
                        </CardContent>
                    </Card>
                    <br></br>

                    <Card sx={{ width: '100%',  padding: 1 }}>
                        <CardContent>
                            <Typography variant="h7" component="div">
                                Task 2
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {relaxationTimes[1] || "Blah blah"}
                            </Typography>
                        </CardContent>
                    </Card>

                    <br></br>
                </Grid2>
            </Grid2>
        </div>
    );
};

export default MindfulMinutes;
