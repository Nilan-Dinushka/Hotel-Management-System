import {MainHeader} from "../layout/MainHeader.tsx";
import {HotelService} from "../common/HotelService.tsx";
import {Parallax} from "../common/Parallax.tsx";

export function Home() {
    return (
        <section>
            <MainHeader />

            <section className={"container"}>
                <Parallax />
                <HotelService />
                <Parallax />
            </section>
        </section>
    );
}