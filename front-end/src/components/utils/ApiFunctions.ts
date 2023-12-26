import axios from "axios";

export const api = axios.create({
    baseURL :"http://localhost:9192"
});

// This function add a new room to database
export async function addRoom(photo: Blob, roomType:string, roomPrice:string){
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/rooms/add/new-room",formData);
    return response.status === 201;
}

// This function get all room types from database
export async function getRoomTypes(){
    try{
        const response = await api.get("/rooms/room/types");
        return response.data;
    }catch (err){
        throw new Error("Error getting room types");

    }
}

/* This function gets all; rooms from the database */
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/all-rooms");
        return result.data;
    }catch (error){
        throw new Error("Error fetching rooms");

    }
}

/* This function deletes a room by the Id */
export async function deleteRoom(roomId:number){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`);
        return result.data
    }catch (error:any){
        throw new Error(`Error deleting room ${error.message}`)

    }
}