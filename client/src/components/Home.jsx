import React from 'react';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import '@fontsource/roboto/400.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid2 } from '@mui/material';

const Home = () => {
    return (
        <div>
            <Box textAlign="center" padding={2}>
                <Box display="flex" justifyContent="center" marginBottom={1} paddingTop={8}>
                    <WbSunnyTwoToneIcon fontSize="medium" sx={{ margin: 1 }} />
                    <WbSunnyTwoToneIcon fontSize="medium" sx={{ margin: 1 }} />
                    <WbSunnyTwoToneIcon fontSize="medium" sx={{ margin: 1 }} />
                </Box>
                <Typography variant="h2" gutterBottom >
                    <strong>Welcome to Daily Rays</strong>
                </Typography>
                <Typography variant="body1" paddingBottom={8}>
                    Wherever you go, no matter what the weather,<br />
                    always bring your own sunshine. -some guy
                </Typography>
            </Box>

            <Grid2 container spacing={4} justifyContent="center" padding={2}>
                <Grid2 size={4}>
                    <Card sx={{ width: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Start your day out right
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Blah blah
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={4}>
                    <Card sx={{ width: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Mindful Minutes
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Blah blah
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={4}>
                    <Card sx={{ width: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Keep Track
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Blah blah
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </div>
    );
};

export default Home;
