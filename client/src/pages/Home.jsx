import React from 'react';
import WbSunny from '@mui/icons-material/WbSunny';
import '@fontsource/roboto/400.css';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import '../styles/Home.css';
import bwSunImage from '../images/bw_sun.jpg';
import otherSunImage from '../images/cute_sunshine_pic.webp';

const CustomH2 = styled(Typography)({
    fontFamily: "'Playfair Display', serif",
    fontSize: '90px',
    fontWeight: '900',
    color: '#333',
    textAlign: 'center',
});

const CaptionP = styled(Typography)({
    fontFamily: "'Special Elite', serif",
    fontSize: '20px',
    color: '#333',
    textAlign: 'center',
});

const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString();
};

const LineWithText = () => {
    return (
        <Box sx={{ width: '100%', marginBottom: '20px', padding: '16px' }}>
            <Box sx={{ height: '3px', backgroundColor: 'black', marginBottom: '5px' }} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '14px',
                        fontFamily: "'Special Elite', serif",
                        fontWeight: 'bold',
                    }}
                >
                    {getCurrentDate()}
                </Typography>
                <WbSunny fontSize="small" sx={{ color: '#fdd835' }} />
                <Typography
                    sx={{
                        fontSize: '14px',
                        fontFamily: "'Special Elite', serif",
                        fontWeight: 'bold',
                    }}
                >
                    Carpe Diem
                </Typography>
            </Box>
            <Box sx={{ height: '3px', backgroundColor: 'black', marginTop: '5px' }} />
        </Box>
    );
};

const Home = () => {
    return (
        <div className="Home">
            {/* Header Section */}
            <Box textAlign="center" padding={2}>
                <CustomH2 variant="h2">
                    <strong>WELCOME TO DAILY RAYS</strong>
                </CustomH2>
                <LineWithText />
            </Box>

            {/* Main Content */}
            <Grid container spacing={2} sx={{ height: '100vh' }}>
                <Grid item xs={12} md={9}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            padding: '16px',
                        }}
                    >
                        <img
                            src={bwSunImage}
                            alt="Sunshine"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} sx={{ height: '100%' }}>
                    <Grid
                        container
                        direction="column"
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ height: '100%' }}
                    >
                        {/* Quote Section */}
                        <Grid item xs={6}>
                            <Box sx={{ textAlign: 'center', padding: 2 }}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontStyle: 'italic', color: '#333' }}
                                >
                                    "Wherever you go, no matter the weather, always bring your own
                                    sunshine!"
                                </Typography>
                            </Box>
                        </Grid>
                        {/* Image Section */}
                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <img
                                    src={otherSunImage}
                                    alt="Sunshine"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Cards Section */}
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
                sx={{ padding: 4, textAlign: 'center' }}
            >
                <Grid item xs={12} sm={4}>
                    <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Start your day out right
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Blah blah
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Mindful Minutes
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Blah blah
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Keep Track
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Blah blah
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
