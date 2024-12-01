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

                    <CaptionP variant="body1">
                        wherever you go, no matter what the weather, <br/>
                        always bring your own sunshine!
                    </CaptionP>
                </Box>
            
                <Box
                    sx={{
                        width: '100%',      // Make it full width of the container
                        height: '500px',    // Set the height of the image
                        marginBottom: 2,    // Add space below the image
                    }}
                    >
                    <img 
                        src={bwSunImage} 
                        alt="Sunshine" 
                        style={{ 
                        width: '80%', 
                        height: '100%',   // Make sure the image fills the height of the container
                        objectFit: 'cover' // Ensure the image scales properly without stretching
                        }} 
                    />
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
