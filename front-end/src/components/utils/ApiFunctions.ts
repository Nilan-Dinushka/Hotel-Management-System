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

/* This function update a room */
export async function updateRoom(roomId:number, roomData:any){
    const formData = new FormData();
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`,formData)
    return response;

}

/* This is function get a room by the id*/
export async function getRoomById(roomId:number){
    try{
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data;
    }catch (error:any){
        throw new Error(`Error fetching room ${error.message}`)
    }
}

/* This function saves a new booking to the database*/
export async function bookRoom(roomId:number, booking: any){
    try{
        const response = await api.post(`/bookings/room/${roomId}/booking`,booking);
        return response.data;
    }catch (error:any){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else {
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}

/* This function gets all bookings from the database*/
export async function getAllBookings(){
    try{
        const result  = await api.get("/bookings/all-bookings")
        return result.data
    }catch (error:any){
        throw new Error(`Error fetching bookings : ${error.message}`)
    }
}

/* This function gets booking by confirmation code */
export async function getBookingByConfirmationCode(confirmationCode: any){
    try{
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
        return result.data
    }catch (error:any){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else {
            throw new Error(`Error find booking : ${error.message}`)
        }

    }
}

/* This function cancels booking */
export async function cancelBooking(bookingId:number){
    try{
        const result = await api.delete(`/bookings/${bookingId}/delete`);
        return result.data;
    }catch (error:any){
        throw new Error(`Error cancelling booking : ${error.message}`)

    }
}