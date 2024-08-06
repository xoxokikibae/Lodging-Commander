import './App.css';
import {Route, Routes} from "react-router-dom";
import Booking from "./booking/Booking";
import ShowRoomList from "./room/ShowRoomList";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/roomList" element={<ShowRoomList/>}/>
                <Route path="/booking" element={<Booking/>}/>
            </Routes>
        </div>
    );
}

export default App;
