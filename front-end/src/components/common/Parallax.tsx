import {Container} from "react-bootstrap";

export function Parallax() {
    return (
        <div className={"parallax mb-5"}>
            <Container className={"text-center px-5 py-5 justify-content-center"}>
                <div className={"animated-texts bounceIn"}>
                    <h1>Welcome to <span className={"hotel-color"}>Lakeside Hotel</span></h1>
                    <h3>We offer the best service for all your needs</h3>
                </div>
            </Container>
        </div>
    );
}