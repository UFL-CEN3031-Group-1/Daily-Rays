import React from 'react';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import '@fontsource/roboto/400.css';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid2 } from '@mui/material';
import '../styles/Home.css';
import bwSunImage from '../images/bw_sun.jpg';
import otherSunImage from '../images/cute_sunshine_pic.webp';



const CustomH2 = styled(Typography)({
    fontFamily: "'Playfair Display', serif", 
    fontSize: '90px',    
    fontWeight: '900',                
    fontWeight: 'bold',                  
    color: '#333',                       
    textAlign: 'center',                 
  });

  const CaptionP = styled(Typography)({
    fontFamily: "'Special Elite', serif", 
    fontSize: '20px',    
    fontWeight: '50', 
    fontWeight: 'thin',               
    color: '#333',                       
    textAlign: 'center',                 
  });

//   const LineBreakWithText = styled(Box)({
//     display: 'flex',
//     alignItems: 'center',
//     textAlign: 'center',
//     margin: '20px 0', // Adjusts the spacing above and below the lines
// });

//     const Line = styled(Box)({
//         flex: 1,
//         borderBottom: '2px solid black',
//         margin: '0 10px', // Spacing between the lines and the text
//     });

const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString(); // Format date as you like
  };
  
  const LineWithText = () => {
    return (
      <Box sx={{ width: '100%' }}>
        {/* Upper Line */}
        <Box sx={{ height: '1px', backgroundColor: 'black', marginBottom: '1px' }} />
  
        {/* Main Content */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem', // Add some space between elements
          }}
        >
          {/* Date */}
          <Typography sx={{ fontSize: '14px', fontFamily: "'Special Elite', serif", fontWeight: 'bold'}}>
            {getCurrentDate()}
          </Typography>
  
          {/* Web Sun Emojis */}
          <WbSunnyTwoToneIcon fontSize="small" sx={{ margin: 0.5 }} />
          
  
          {/* Carpe Diem */}
          <Typography sx={{ fontSize: '14px',  fontFamily: "'Special Elite', serif", fontWeight: 'bold' }}>
            Carpe Diem
          </Typography>
        </Box>
  
        {/* Lower Line */}
        <Box sx={{ height: '1px', backgroundColor: 'black', marginTop: '1px' }} />
        <Box sx={{ height: '3px', backgroundColor: 'black', marginTop: '1px' }} />
      </Box>
    );
  };

const Home = () => {
    return (
        <div className="Home">
                <Box textAlign="center" padding={2}>
                    <Box sx={{ height: '3px', backgroundColor: 'black', marginTop: '10px' }} />
                    <Box sx={{ height: '1px', backgroundColor: 'black', marginTop: '1px' }} />
                    <CustomH2 variant="h2" className="typewriter" >
                        <strong>WELCOME TO DAILY RAYS</strong>
                    </CustomH2>

                    <LineWithText variant="body1"/>
                </Box>
            
                <Grid2 container spacing={2} sx={{ height: '100vh' }}>
                    <Grid2 item xs={12} md={9}>
                        <Box
                        sx={{
                            width: '100%',
                            marginLeft: 2,
                        }}
                        >
                        <img
                            src={bwSunImage}
                            alt="Sunshine"
                            style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',  // Ensure the image scales properly without stretching
                            }}
                        />
                        </Box>
                        
                    </Grid2>

                    <Grid2 item xs={12} md={3}  sx={{ height: '100vh' }}>
                        <Grid2 container direction="column" spacing={2} sx={{ height: '100%' }}>
                        {/* Top half: Quote */}
                        <Grid2 item xs={6}>
                            <Box sx={{ height: '3px', backgroundColor: 'black', marginTop: '1px' }} />
                            <Box sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
                            <Typography variant="h6" sx={{ fontStyle: 'italic', color: '#333' }}>
                                "Wherever you go, no matter the weather, always bring your own sunshine!"
                            </Typography>
                            </Box>
                            <Box sx={{ height: '3px', backgroundColor: 'black', marginTop: '1px' }} />
                        </Grid2>

                        Bottom half: Another Image
                        <Grid2 item xs={6}>
                                <Box
                                sx={{
                                    width: '100%',
                                    marginLeft: 2,
                                }}
                                >
                                <img
                                    src={otherSunImage}
                                    alt="Sunshine"
                                    style={{ 
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',  // Ensure the image scales properly without stretching
                                    }}
                                />
                                </Box>
                        </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
  

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
