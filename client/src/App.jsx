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

const App = () => {
  const { loading } = useLoading();

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header />
          {loading && <Loading />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/affirmation" element={<Affirmation />} />
            <Route path="/about" element={<About />} />
            <Route path='/mindfulminutes' element={<MindfulMinutes/>} />
            {/**<Route path="/profile/anonymous" element={<AnonymousProfile />} />**/}
            {/* <Route path="/profile/anonymous" element={<AnonymousProfile />} /> */}
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<ErrorPage message="Page not found" />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
