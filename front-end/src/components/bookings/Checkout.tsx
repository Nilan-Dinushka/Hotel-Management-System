import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getRoomById} from "../utils/ApiFunctions.ts";

export function Checkout() {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })
    const {roomId} = useParams();

    useEffect(() => {
        setTimeout(() => {
            getRoomById(Number(roomId))
                .then((response) => {
                    setRoomInfo(response)
                    setIsLoading(false)
                })
                .catch((error) => {
                    setError(error)
                    setIsLoading(false)
                })
        }, 1000)
    }, [roomId]);

    return (
        <></>
    );
}