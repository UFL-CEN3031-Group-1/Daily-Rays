  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Header from './components/Header';
  import Home from './components/Home';
  import About from './components/About';
  import UserOwnProfile from './components/UserOwnProfile';
  import UserDirectory from './components/UserDirectory';
  import UserPage from './components/UserPage';
  import SignIn from './components/SignIn';

  import ErrorPage from './components/ErrorPage';
  import Loading from './components/Loading';
  import { useLoading } from './contexts/LoadingContext';

  import './styles/App.css';
  import './styles/global.css'

  const App = () => {
    const { loading } = useLoading();

    return (
      <Router>
        <div className="App">
          <Header />
          {loading && <Loading />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<UserOwnProfile />} />
            <Route path='/directory' element={<UserDirectory />} />

            <Route path="/users/:username" element={<UserPage />} />
            <Route path="/signin" element={<SignIn />} />

            <Route path="*" element={<ErrorPage message="Page not found" />} />
          </Routes>
        </div>
      </Router>
    );
  };

  export default App;