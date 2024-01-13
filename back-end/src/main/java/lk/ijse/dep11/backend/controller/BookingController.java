package lk.ijse.dep11.backend.controller;

import lk.ijse.dep11.backend.exception.InvalidBookingRequestException;
import lk.ijse.dep11.backend.exception.ResourceNotFoundException;
import lk.ijse.dep11.backend.model.BookedRoom;
import lk.ijse.dep11.backend.model.Room;
import lk.ijse.dep11.backend.response.BookingResponse;
import lk.ijse.dep11.backend.response.RoomResponse;
import lk.ijse.dep11.backend.service.IBookingService;
import lk.ijse.dep11.backend.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final IBookingService BOOKING_SERVICE;
    private final IRoomService ROOM_SERVICE;

    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookingResponse>> getAllBooking(){
        List<BookedRoom> bookings = BOOKING_SERVICE.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }



    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode){
        try{
            BookedRoom booking = BOOKING_SERVICE.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        }
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId,@RequestBody BookedRoom bookingRequest){
        try{
            String confirmationCode = BOOKING_SERVICE.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok("Room booked successfully!, Your booking confirmation code is: " + confirmationCode);

        }catch (InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }

    @GetMapping("/user/{email}/bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email){
            List<BookedRoom> bookings = BOOKING_SERVICE.getBookingsByUserEmail(email);
            List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId){
        BOOKING_SERVICE.cancelBooking(bookingId);
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room theRoom = ROOM_SERVICE.getRoomById(booking.getRoom().getId()).get();
        RoomResponse room = new RoomResponse(theRoom.getId(), theRoom.getRoomType(),theRoom.getRoomPrice());
        return new BookingResponse(booking.getBookingId(),
                booking.getCheckInDate(),booking.getCheckOutDate(),
                booking.getGuestFullName(), booking.getGuestEmail(),
                booking.getNumOfAdults(), booking.getNumOfChildren(),
                booking.getTotalNumOfGuest(), booking.getBookingConfirmationCode(), room);
    }
}
