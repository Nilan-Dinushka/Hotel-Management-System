import {Link} from "react-router-dom";

export function Admin() {
    return (
        <section className={"container mt-5"}>
            <h2>Welcome to Admin Panel</h2>
            <hr/>
            <Link to={"/add-room"}>
                Manage Rooms
            </Link><br/>
            <Link to={"/existing-bookings"}>Manage Bookings</Link>
        </section>
    );
}