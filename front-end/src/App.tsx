import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {AddRoom} from "./components/room/AddRoom.tsx";
import {ExistingRooms} from "./components/room/ExistingRooms.tsx";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./components/home/Home.tsx";
import {EditRoom} from "./components/room/EditRoom.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <main>
            <Router>
                <Routes>
                    <Route path={"/"} element={<Home />}/>
                    <Route path={"/edit-room/:roomId"} element={<EditRoom />}/>
                    <Route path={"/existing-rooms"} element={<ExistingRooms />}/>
                </Routes>
            </Router>
        </main>
    </>
  )
}

export default App
