import {ChangeEvent, useEffect, useState} from "react";
import {getRoomTypes} from "../utils/ApiFunctions.ts";

// @ts-ignore
export function RoomTypeSelector({handleRoomInputChange, newRoom}) {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    }, []);

    const handleNewRoomTypeInputChange = (e:ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypeInput(false);
        }
    }

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select required={true} className={"form-select"} name="roomType" value={newRoom.roomType} onChange={(e) => {
                        if(e.target.value === "Add New"){
                            setShowNewRoomTypeInput(true)
                        }else {
                            handleRoomInputChange(e)
                        }
                    }}>
                        <option value={""}>select a room type</option>
                        <option value={"Add New"}>Add New</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                        </select>
                    {showNewRoomTypeInput && (
                        <div className="mt-2">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter New Room Type"
                                    value={newRoomType}
                                    onChange={handleNewRoomTypeInputChange}
                                />
                                <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
                                    Add
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

        </>
    );
}