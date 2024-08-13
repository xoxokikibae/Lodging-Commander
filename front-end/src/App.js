import './App.css';
import {Route, Routes} from "react-router-dom";
import RoomList from "./pages/RoomList";
import BookingList from "./pages/BookingList";
import Booking from "./pages/Booking";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/roomList" element={<RoomList/>}/>
                <Route path="/booking/:id" element={<Booking/>}/>
                <Route path="/bookingList" element={<BookingList/>}/>
            </Routes>
        </div>
    );
}

export default App;