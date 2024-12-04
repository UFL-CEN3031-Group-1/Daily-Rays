import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import AnonymousProfile from './pages/AnonymousProfile';
import MindfulMinutes from './pages/MindfulMinutes';
import Affirmation from './pages/Affirmation';
import ErrorPage from './pages/ErrorPage';  
import Loading from './pages/Loading';
import SignUp from './pages/SignUp';
import { useLoading } from './contexts/LoadingContext';
import { UserProvider } from './contexts/UserContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Create a custom MUI theme with Special Elite font
const theme = createTheme({
  typography: {
    fontFamily: '"Special Elite", sans-serif', // Apply Special Elite font globally
  },
});

const App = () => {
  const { loading } = useLoading();

  return (
    <UserProvider>
      <ThemeProvider theme={theme}> {/* Wrap the whole app with the ThemeProvider */}
        <CssBaseline /> {/* This ensures that the global styles from the theme are applied */}
        <Router>
          <div className="App">
            <Header />
            {loading && <Loading />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/affirmation" element={<Affirmation />} />
              <Route path="/about" element={<About />} />
              <Route path="/mindfulminutes" element={<MindfulMinutes />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<ErrorPage message="Page not found" />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
