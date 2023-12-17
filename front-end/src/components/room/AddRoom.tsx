import {ChangeEvent, FormEvent, useState} from "react";
import {addRoom} from "../utils/ApiFunctions.ts";
import {RoomTypeSelector} from "../common/RoomTypeSelector.tsx";

export function AddRoom() {
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRoomInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === "roomPrice") {
            if (!isNaN(Number(value))) {
                value = String(parseInt(value, 10));
            } else {
                value = "";
            }
        } else {
            value = "";
        }
        setNewRoom({...newRoom,[name]:value})
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files![0];
        let value  = e.target.value;
        // @ts-ignore
        setNewRoom({...newRoom,photo: selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage));
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
           const success = await addRoom(newRoom.photo!,newRoom.roomType, newRoom.roomPrice);
           if (success !== undefined){
               setSuccessMessage("A new room added to the database");
               setNewRoom({photo: null, roomType: "",roomPrice: ""})
               setErrorMessage("");
               setImagePreview("")
           }else {
               setErrorMessage("Error adding room");
           }
        }catch (err: any){
            setErrorMessage(err.message)
        }
    }
    return (
        <>
        <section className={"container mt-5 mb-5"}>
            <div className={"row justify-content-center"}>
                <div className={"col-md-8 col-lg-6"}>
                    <h2 className={"mt-5 mb-2"}>Add a New Room</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={"mb-3"}>
                            <label htmlFor={"roomType"} className={"form-label"}>
                                Room Type
                            </label>
                            <div>
                                <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>
                            </div>
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor={"roomPrice"} className={"form-label"}>
                                Room Price
                            </label>
                            <input type={"number"} className={"form-control"} required={true} id={"roomPrice"} name={"roomPrice"}
                                   value={newRoom.roomPrice} onChange={handleRoomInputChange}/>
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor={"photo"} className={"form-label"}>
                                Room Photo
                            </label>
                            <input id={"photo"} name={"photo"} type={"file"} className={"form-control"} onChange={handleImageChange}/>
                            {imagePreview && (
                                <img src={imagePreview} alt="image" style={{maxWidth: "400px", maxHeight: "400px"}} className={"mb-3"}/>
                            )}
                        </div>
                        <div className={"d-grid d-md-flex mt-2 "}>
                            <button className={"btn btn-outline-primary ml-5"}>Save Room</button>
                        </div>
                    </form>

                </div>
            </div>
        </section>
        </>
    );
}