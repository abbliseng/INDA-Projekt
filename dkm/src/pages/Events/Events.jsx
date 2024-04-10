import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../../components/Card/Card";

const Event = ({ event }) => {
    return (
        <Card
            // when pressed redirect to facebook event with event.id
            // link={"https://www.facebook.com/events/" + event.id}
            title={event.name}
            description={event.description}
            picture={event.image}
            id={event.id}
        />
    );
};

const Events = () => {
    const backupImageUrl = "./logo.png";
    const [upcomingEvents, setUpcomingEvents] = useState([
        {
            id: 2,
            title: "PPP",
            text: "Det är VÅR och det har äntligen blivit dags för årets upplaga av PPP! DKM och CLW slår ihop sig och skapar en magisk kväll som du inte vill missa!",
            picture:
                "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/431487589_912232430907635_9194427698980121245_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=cKpnAPkiH8QAX-AVDDD&_nc_ht=scontent-arn2-1.xx&oh=00_AfBnV1gvDAc_VF3Q7quo_IdeDttFaIuOtqsALZg97iZDHg&oe=6604F48D",
        },
        {
            id: 1,
            title: "Beerpong pub",
            text: "This is the first slide",
            picture: "./logo.png",
        },
    ]);
    //   Load past events from ./past_events.json
    const [pastEvents, setPastEvents] = useState([]);
    useEffect(() => {
        fetch("./past_events.json")
            .then((response) => response.json())
            .then((data) => setPastEvents(data))
            .catch((err) => console.log(err));
    }, []);

    const fetchImage = (event) => {
        // Check if file, `./event_images/${event.id}.png`, exists
        if (event.id) {
            const img = "./event_images/" + event.id + ".png";
            return img;
        }
        return null;
    };

    return (
        <div class="capsule">
            <h1>Events</h1>
            <div class="carousel_section">
                <Carousel items={upcomingEvents} />
            </div>
            <h1>Past Events</h1>
            <div class="container">
                {pastEvents.map((event) => {
                    return (
                        <Event
                            event={{
                                name: event.event_name,
                                description: event.event_date,
                                image: fetchImage(event) || backupImageUrl,
                                id: event.id,
                            }}
                        />
                    );
                })}
                {/* <Event event={{
                name: "Blums Release PARTY!!!",
                description: "This is event 1",
                image: "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/421906417_755213529970478_7881443784304176731_n.jpg?stp=dst-jpg_p960x960&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YbMf76rPG4sAX_-51fN&_nc_ht=scontent-arn2-1.xx&oh=00_AfDU-P1o3XaW2wP2WpJ57lie3cd44_zNamiLRx3WFiUZPw&oe=6603DAB5"
            }}/> */}
            </div>
        </div>
    );
};

export default Events;
