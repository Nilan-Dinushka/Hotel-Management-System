package lk.ijse.dep11.backend.controller;

import lk.ijse.dep11.backend.exception.PhotoRetrievalException;
import lk.ijse.dep11.backend.exception.ResourceNotFoundException;
import lk.ijse.dep11.backend.model.BookedRoom;
import lk.ijse.dep11.backend.model.Room;
import lk.ijse.dep11.backend.response.RoomResponse;
import lk.ijse.dep11.backend.service.BookingServiceImpl;
import lk.ijse.dep11.backend.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
@CrossOrigin
public class RoomController {
    private final IRoomService ROOM_SERVICE;
    private final BookingServiceImpl BOOKING_SERVICE;

    @PostMapping("/add/new-room")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
        Room savedRoom = ROOM_SERVICE.addNewRoom(photo, roomType, roomPrice);
        RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }


    @GetMapping("/room/types")
    public List<String> getRoomTypes(){
        return  ROOM_SERVICE.getAllRoomTypes();
    }



    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> rooms= ROOM_SERVICE.getAllRooms();
        ArrayList<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room :
                rooms) {
            byte[] photoBytes= ROOM_SERVICE.getRoomPhotoByRoomId(room.getId());
            if(photoBytes !=null && photoBytes.length>0){
                String base64Photo= Base64.encodeBase64String(photoBytes);
                RoomResponse roomResponse= getRoomResponse(room);
                roomResponse.setPhoto(base64Photo);
                roomResponses.add(roomResponse);
            }
        }
        return ResponseEntity.ok(roomResponses);

    }


    @DeleteMapping("/delete/room/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable("roomId") Long id){
        ROOM_SERVICE.deleteRoom(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{roomId}")
    public ResponseEntity<RoomResponse> updateRoom(
            @PathVariable Long roomId,
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) BigDecimal roomPrice,
            @RequestParam(required = false) MultipartFile photo) throws SQLException, IOException {

        byte[] photoBytes = photo != null && !photo.isEmpty() ? photo.getBytes() : ROOM_SERVICE.getRoomPhotoByRoomId(roomId);
        Blob photoBlob = photoBytes != null && photoBytes.length > 0 ? new SerialBlob(photoBytes) :  null;
        Room theRoom = ROOM_SERVICE.updateRoom(roomId, roomType, roomPrice, photoBytes);
        theRoom.setPhoto(photoBlob);
        RoomResponse roomResponse  = getRoomResponse(theRoom);
        return ResponseEntity.ok(roomResponse);

    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(
            @PathVariable Long roomId){
        Optional<Room> theRoom = ROOM_SERVICE.getRoomById(roomId);
        return theRoom.map(room -> {
            RoomResponse roomResponse = getRoomResponse(room);
            return ResponseEntity.ok(Optional.of(roomResponse));
        }).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }

    private RoomResponse getRoomResponse(Room room) {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());
//        List<BookingResponse> bookingInfo=bookings
//                .stream()
//                .map(booking -> new BookingResponse(booking.getBookingId(),booking.getCheckInDate(),booking.getCheckOutDate(),booking.getBookingConfirmationCode())).toList();
        byte[] photoBytes = null;
        Blob photoBlob= room.getPhoto();
        if(photoBlob != null){
            try {
                photoBytes = photoBlob.getBytes(1,(int) photoBlob.length());
            } catch (Exception e) {
                throw new PhotoRetrievalException("Error retrieving photo");
            }
        }
        return new RoomResponse(room.getId(),
                room.getRoomType(),room.getRoomPrice(),room.isBooked(),photoBytes);
    }

    private List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return BOOKING_SERVICE.getAllBookingsByRoomId(roomId)
;
    }
}
