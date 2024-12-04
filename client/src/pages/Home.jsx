import React from 'react';
import WbSunny from '@mui/icons-material/WbSunny';
import '@fontsource/roboto/400.css';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid2 } from '@mui/material';
import '../styles/Home.css';
import bwSunImage from '../images/bw_sun.jpg';
import bwSunImage2 from '../images/bw_sun_3.jpg';

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
          <WbSunny fontSize="small" sx={{ margin: 0.5 }} />
          
  
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

                <Box
  sx={{
    display: 'flex',         // Align image and quote/picture horizontally
    alignItems: 'flex-start', // Align items to the top of the container
    justifyContent: 'flex-start',
    marginLeft: 2,
  }}
>
  {/* Left Image (Big Picture) */}
  <Box
    sx={{
      width: '150vh',
      marginRight: 2,  // Add space between the image and the quote
    }}
  >
    <img
      src={bwSunImage}
      alt="Sunshine"
      style={{
        width: '100%',
        height: '50%',
        objectFit: 'cover',
      }}
    />
  </Box>

  {/* Right Section (Quote + Image Below) */}
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
    <Box sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: '24px',
          fontFamily: "'Special Elite', serif",
          fontWeight: 'italics',
          marginTop: 8,     // Adds space above the text
          marginBottom: 8,  // Adds space below the text
          paddingLeft: 3,   // Adds space on the left side of the text
          paddingRight: 3,  // Adds space on the right side of the text
        }}
      >
        "Wherever you go, no matter the weather, always bring your own sunshine!"
      </Typography>
    </Box>
    
    {/* Separator line */}
    <Box sx={{ height: '3px', backgroundColor: 'black', marginTop: '1px' }} />

    {/* New Image Underneath the Quote */}
    <Box
      sx={{
        width: '100%',
        height: 'auto',  // Set height to 'auto' or a fixed value like '50%'
        maxHeight: '264px',  // Or set a max-height to limit the image's height
        display: 'flex',
        justifyContent: 'center',
        marginRight: 2
      }}
    >
      <img
        src={bwSunImage2}  // Replace with your second image source
        alt="New Image"
        style={{
          width: '100%',
          height: 'auto', // Maintain aspect ratio and scale height accordingly
          maxHeight: '264px',  // Adjust max-height to make the image shorter
          objectFit: 'cover',
        }}
      />
    </Box>
  </Box>
</Box>

<Box sx={{ height: '2px', backgroundColor: 'black', marginTop: '1px' }} />

            {/* Cards Section */}
            <Grid2
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
                sx={{ padding: 4, textAlign: 'center' }}
            >
                <Grid2 item xs={12} sm={4}>
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
                </Grid2>
                <Grid2 item xs={12} sm={4}>
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
                </Grid2>
                <Grid2 item xs={12} sm={4}>
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
                </Grid2>
            </Grid2>
        </div>
    );
};

export default Home;
