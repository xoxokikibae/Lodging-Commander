import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import React from 'react';
import ProtectedRoute from './faqBoard/faqAdmin/ProtectedRoute';

//Import "User-related"
import Auth from "./user/Auth";
import Register from "./user/Register";
import AuthFail from "./user/AuthFail";

import Update from "./user/Update";

//Import "Hotel-related"
import Details from "./hotel/Details";

//Import "Cart-related"
import Cart from "./cart/Cart";

//Import "Home-related"
import StartPage from "./home/StartPage";
import Header from "./home/component/Header";
import Footer from "./home/component/Footer";

//Import "FAQ-related" by Jeongyeon
import FaqMain from './faqBoard/faqMain';
import FaqAdmin from "./faqBoard/faqAdmin";
import Write from './faqBoard/faqAdmin/Write';
import Modified from './faqBoard/faqAdmin/Modified'
import ShowOne from './faqBoard/faqAdmin/ShowOne';
import ShowList from './faqBoard/faqAdmin/ShowList';
import Delete from './faqBoard/faqAdmin/Delete';

//Import "HOTEL-related"
import AddressForm from "./addHotel/AddressForm";
import CategoryForm from "./addHotel/CategoryForm";
import FacilityForm from "./addHotel/FacilityForm";
import HotelForm from "./addHotel/HotelForm";
import RoomForm from "./addHotel/RoomForm";
import AddHotelSuccess from "./addHotel/AddHotelSuccess";
import AddressForm2 from "./addHotel/AddressForm2";

//Import "QNA-related" by Jeongyeon
import HotelQna from "./hotel/components/hotelQna/HotelQna";
import Booking from "./booking/Booking";
import BookingList from "./booking/BookingList";
import LikeList2 from "./likelist/LikeList2";
import Reviewlist from "./Reviewlist";
import ReviewInsert from "./reviewinsert";
import LocationList from "./hotel/LocationList";
import UserProfile from "./user/UserProfile";
import ModifyHotel from "./addHotel/ModifyHotel";


function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    //from main branch
                    <Route path="/" element={
                        <div>
                            <StartPage/>
                        </div>
                    }/>
                    <Route path="/user/register" element={<Register/>}/>
                    <Route path="/user/update" element={<Update/>}/>
                    <Route path="/user/userProfile/*" element={<UserProfile/>}/>
                    <Route path="/user/authSuccess" element={<StartPage/>}/>
                    <Route path="/user/authFail" element={<AuthFail/>}/>
                    <Route path="/hotel/details/:id" element={<Details/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/Auth" element={<Auth/>}/>

                    /from jeongyeon branch
                    <Route path="/hotel/details/:id" element={<Details/>}/>
                    <Route path="/hotel/hotel-qna" element={<HotelQna/>}/>

                    <Route path="/AddressForm" element={<AddressForm/>}/>
                    <Route path="/AddressForm2" element={<AddressForm2/>}/>
                    <Route path="/CategoryForm" element={<CategoryForm/>}/>
                    <Route path="/FacilityForm" element={<FacilityForm/>}/>
                    <Route path="/HotelForm" element={<HotelForm/>}/>
                    <Route path="/RoomForm" element={<RoomForm/>}/>
                    <Route path="/AddHotelSuccess" element={<AddHotelSuccess/>}/>
                    <Route path="/favorites" element={<LikeList2/>}/>
                    <Route path="/reviews" element={<Reviewlist/>}></Route>

                    <Route path="/cart" element={<Cart/>}/>

                    //from jeongyeon branch
                    <Route path="/faqBoard/faqMain" element={<FaqMain/>}/>

                    <Route path='/faqBoard/faqAdmin' element={
                        <ProtectedRoute> <FaqAdmin/> </ProtectedRoute>
                    }/>

                    <Route path="/faqBoard/faqAdmin/ShowList" element={<ShowList/>}/>
                    <Route path="/faqBoard/faqAdmin/Write" element={<Write/>}/>
                    <Route path="/faqBoard/faqAdmin/Modified/:id" element={<Modified/>}/>
                    <Route path="/faqBoard/faqAdmin/ShowOne/:id" element={<ShowOne/>}/>
                    <Route path="/faqBoard/faqAdmin/Delete/:id" element={<Delete/>}/>

                    // Hotel QNA by jeongyeon
                    <Route path="/hotel/components/hotelQna" element={<HotelQna/>}/> />

                    // Redirect for FAQ Main
                    <Route path="/faqMain" element={<Navigate to="/faqBoard/faqMain" replace="/faqBoard"/>}/>
                    <Route path="/faqAdmin" element={<Navigate to="/faqBoard/faqAdmin" replace="/faqBoard"/>}/>

                    //from Yujeong branch
                    <Route path="/AddressForm" element={<AddressForm/>}/>
                    <Route path="/AddressForm2" element={<AddressForm2/>}/>
                    <Route path="/CategoryForm" element={<CategoryForm/>}/>
                    <Route path="/FacilityForm" element={<FacilityForm/>}/>
                    <Route path="/HotelForm" element={<HotelForm/>}/>
                    <Route path="/RoomForm" element={<RoomForm/>}/>
                    <Route path="/ModifyHotel" element={<ModifyHotel/>}/>
                    <Route path="/AddHotelSuccess" element={<AddHotelSuccess/>}/>
                    <Route path="/favorites" element={<LikeList2/>}/>
                    <Route path="/reviews" element={<Reviewlist/>}></Route>
                    <Route path="/review/insert" element={<ReviewInsert/>}/>

                    {/*상민 컴포넌트*/}
                    <Route path="/booking/:id" element={<Booking/>}/>
                    <Route path="/bookingList" element={<BookingList/>}/>

                    <Route path="/hotel/list/:hotelLocation" element={<LocationList/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;