import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';

//Import "User-related"
import Auth from "./user/Auth";
import Register from "./user/Register";
import AuthFail from "./user/AuthFail";
import Info from "./user/Info";
import Update from "./user/Update";
import Home from "./user/Home";

//Import "Hotel-related"
import Details from "./hotel/Details";

//Import "Cart-related"
import Cart from "./cart/Cart";

//Import "Home-related"
import StartPage from "./home/StartPage";
import Header from "./home/component/Header";
import Footer from "./home/component/Footer";

//Import "FAQ-related"
import FaqMain from './faqBoard/faqMain';
import Write from './faqBoard/faqDetails/Write';
import Modified from './faqBoard/faqDetails/Modified'
import ShowOne from './faqBoard/faqDetails/ShowOne';
import ShowList from './faqBoard/faqDetails/ShowList';
import Delete from './faqBoard/faqDetails/Delete';

function App() {
  return (
          <div className="App">
              <Header/>
              <Routes>
                  //from main branch
                  <Route path="/" element={
                      <div>
                          <StartPage />
                      </div>
                  }/>

                  <Route path="/user/register" element={<Register/>}/>
                  <Route path="/user/update" element={<Update/>}/>
                  <Route path="/user/info" element={<Info/>}/>
                  <Route path="/user/authSuccess" element={<Home/>}/>
                  <Route path="/user/authFail" element={<AuthFail/>}/>
                  <Route path="/Auth" element={<Auth/>}/>

                  <Route path="/hotel/details/:id" element={<Details/>}/>
                  <Route path="/cart" element={<Cart/>}/>

                  //from jeongyeon branch
                  <Route path="/faqBoard/faqMain" element={<FaqMain/>}/>

                  <Route path="/faqBoard/faqDetails/ShowList/:pageNo" element={<ShowList/>}/>
                  <Route path="/faqBoard/faqDetails/Write" element={<Write/>}/>
                  <Route path="/faqBoard/faqDetails/Modified/:id" element={<Modified/>}/>
                  <Route path="/faqBoard/faqDetails/ShowOne/:id" element={<ShowOne/>}/>
                  <Route path="/faqBoard/faqDetails/Delete/:id" element={<Delete/>}/>

                  // Redirect for FAQ Main
                  <Route path="/faqMain" element={<Navigate to="/faqBoard/faqMain" replace/>}/>
              </Routes>
              <Footer />
          </div>
  );
}

export default App;