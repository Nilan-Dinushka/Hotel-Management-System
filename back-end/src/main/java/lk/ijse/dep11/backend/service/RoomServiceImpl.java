package lk.ijse.dep11.backend.service;

import lk.ijse.dep11.backend.exception.InternalServerException;
import lk.ijse.dep11.backend.exception.ResourceNotFoundException;
import lk.ijse.dep11.backend.model.Room;
import lk.ijse.dep11.backend.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.reflect.InternalUseOnlyPointcutParser;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements IRoomService{
    private final RoomRepository ROOM_REPOSITORY;
    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) throws IOException, SQLException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if (!file.isEmpty()){
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        return ROOM_REPOSITORY.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return  ROOM_REPOSITORY.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return ROOM_REPOSITORY.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> theRoom = ROOM_REPOSITORY.findById(roomId);

        if(theRoom.isEmpty()){
            throw new ResourceNotFoundException("Sorry, Room not Found");
        }
        Blob photoBlob = theRoom.get().getPhoto();
        if(photoBlob != null){
            return  photoBlob.getBytes(1,(int)photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteRoom(Long id) {

        Optional<Room> theRoom = ROOM_REPOSITORY.findById(id);
        if(theRoom.isPresent()){
            ROOM_REPOSITORY.deleteById(id);
        }
    }

    @Override
    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes) {
        Room room = ROOM_REPOSITORY.findById(roomId).get();
        if (roomType != null) room.setRoomType(roomType);
        if (roomPrice != null) room.setRoomPrice(roomPrice);
        if (photoBytes != null && photoBytes.length > 0) {
            try {
                room.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException ex) {
                throw new InternalServerException("Fail updating room");
            }
        }
        return ROOM_REPOSITORY.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(ROOM_REPOSITORY.findById(roomId).get());
    }
}
