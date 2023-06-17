import React, { useState, useEffect } from 'react'; // import useState from 'react'
import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./component/About/About";
import Categories from "./component/Categories/Categories";
import Details from "./component/Details";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import Home from "./component/Home/Home";
import Instruments from "./component/Instruments/Instruments";
import Search from "./component/Search/Search";
import LoginView from './component/Home/LoginView'
import SignupForm from "./component/SignUp/SignupForm";
import Profile from "./component/Profile/Profile";


import UserContext from './UserContext'; // import UserContext

function App() {

  const [user, setUser] = useState(null); // add a piece of state for the user's data

  // When the app is first loaded, check if there's user data in local storage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // When the user data changes, store it in local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}> {/* provide the user's data and the setUser function as the value of the context */}
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />

          <Route path="/instruments" element={<Instruments />} />
          <Route path="/about" element={<About />} />
          <Route path="/searchArtist" element={<Search />} />
          <Route path="/details/:genrename" element={<Details />} />
          <Route path="/signin" element={<LoginView />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="*" element={<div> 404 page not found </div>} />
        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
