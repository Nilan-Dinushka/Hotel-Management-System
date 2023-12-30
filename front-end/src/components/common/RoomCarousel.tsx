import {useEffect, useState} from "react";
import {getAllRooms} from "../utils/ApiFunctions.ts";

export function RoomCarousel() {
    const [rooms, setRooms] = useState([]);
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms().then((data) => {
            setRooms(data)
            setIsLoading(false)
        })
    }, []);
    return (
        <></>
    );
}