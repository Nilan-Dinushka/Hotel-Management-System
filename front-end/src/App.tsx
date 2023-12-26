import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {AddRoom} from "./components/room/AddRoom.tsx";
import {ExistingRooms} from "./components/room/ExistingRooms.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <AddRoom />
        <ExistingRooms />
    </>
  )
}

export default App
