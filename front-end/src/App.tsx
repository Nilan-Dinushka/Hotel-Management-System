import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {AddRoom} from "./components/room/AddRoom.tsx";
import {ExistingRooms} from "./components/room/ExistingRooms.tsx";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./components/home/Home.tsx";
import {EditRoom} from "./components/room/EditRoom.tsx";
import {NavBar} from "./components/layout/NavBar.tsx";
import {Footer} from "./components/layout/Footer.tsx";
import {RoomListing} from "./components/room/RoomListing.tsx";
import {Admin} from "./components/admin/Admin.tsx";
import {Checkout} from "./components/bookings/Checkout.tsx";
import {BookingSuccess} from "./components/bookings/BookingSuccess.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <main>
            <Router>
                <NavBar />
                <Routes>
                    <Route path={"/"} element={<Home />}/>
                    <Route path={"/edit-room/:roomId"} element={<EditRoom />}/>
                    <Route path={"/existing-rooms"} element={<ExistingRooms />}/>
                    <Route path={"/add-room"} element={<AddRoom />}/>
                    <Route path={"/book-room/:roomId"} element={<Checkout />}/>
                    <Route path={"/browse-all-rooms"} element={<RoomListing />}/>
                    <Route path={"/admin"} element={<Admin />}/>
                    <Route path={"/booking-success"} element={<BookingSuccess />}/>
                </Routes>
            </Router>
            <Footer />
        </main>
    </>
  )
}

export default App
