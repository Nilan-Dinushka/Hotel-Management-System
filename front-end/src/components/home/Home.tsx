import {MainHeader} from "../layout/MainHeader.tsx";
import {HotelService} from "../common/HotelService.tsx";
import {Parallax} from "../common/Parallax.tsx";
import {RoomCarousel} from "../common/RoomCarousel.tsx";

export function Home() {
    return (
        <section>
            <MainHeader />

            <section className={"container"}>
                <RoomCarousel />
                <Parallax />
                <RoomCarousel />
                <HotelService />
                <Parallax />
                <RoomCarousel />
            </section>
        </section>
    );
}