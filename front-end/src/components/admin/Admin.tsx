import {Link} from "react-router-dom";

export function Admin() {
    return (
        <div>
            <h2>Welcome to Admin Panel</h2>
            <hr/>
            <Link to={"/add-room"}>
                Manage Rooms
            </Link>
        </div>
    );
}