package lk.ijse.dep11.backend.service;

import lk.ijse.dep11.backend.exception.InvalidBookingRequestException;
import lk.ijse.dep11.backend.exception.ResourceNotFoundException;
import lk.ijse.dep11.backend.model.BookedRoom;
import lk.ijse.dep11.backend.model.Room;
import lk.ijse.dep11.backend.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements IBookingService{
    private final BookingRepository BOOKING_REPOSITORY;
    private final IRoomService ROOM_SERVICE;

    @Override
    public List<BookedRoom> getAllBookings() {
        return BOOKING_REPOSITORY.findAll();
    }


    @Override
    public List<BookedRoom> getBookingsByUserEmail(String email) {
        return null;
    }

    @Override
    public void cancelBooking(Long bookingId) {
        BOOKING_REPOSITORY.deleteById(bookingId);

    }

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return BOOKING_REPOSITORY.findByRoomId(roomId);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");
        }
        Room room = ROOM_SERVICE.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest,existingBookings);
        if(roomIsAvailable){
            room.addBooking(bookingRequest);
            BOOKING_REPOSITORY.save(bookingRequest);
        }else {
            throw new InvalidBookingRequestException("Sorry,This id not available for the selected dates");
        }
        return bookingRequest.getBookingConfirmationCode();
    }



    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return BOOKING_REPOSITORY.findByBookingConfirmationCode(confirmationCode).orElseThrow(() -> new ResourceNotFoundException("No booking found with booking code : " + confirmationCode));
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream().noneMatch(existingBooking ->
                bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                || bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                ||(bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))
                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))

                );
    }


}
