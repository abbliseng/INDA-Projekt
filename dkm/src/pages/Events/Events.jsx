import React, { useState } from "react";
import Carousel from '../../components/Carousel/Carousel';
import Card from "../../components/Card/Card";

const Event = ({event})=>{
    return (
        <Card title={event.name} description={event.description} picture={event.image}/>
    )
}

const Events = ()=>{
    const [items, setItems] = useState([
        {
          id: 1,
          title: "First Slide",
          text: "This is the first slide",
          picture: "https://picsum.photos/200/300"
        },
        {
          id: 2,
          title: "Second Slide",
          text: "This is the Second slide",
          picture: "https://picsum.photos/400/300"
        }
    
      ]);

    return (
        <div class="capsule">
            <h1>Events</h1>
            <div class="carousel_section">
                <Carousel items={items}/>
            </div>
            <h1>Past Events</h1>
            <div class="container">
            <Event event={{
                name: "Event 1",
                description: "This is event 1",
                image: "https://picsum.photos/400/300"
            }}/>
            <Event event={{
                name: "Event 2",
                description: "This is event 2",
                image: "https://picsum.photos/400/300"
            }}/>
            <Event event={{
                name: "Event 3",
                description: "This is event 3",
                image: "https://picsum.photos/400/300"
            }}/>
            <Event event={{
                name: "Event 4",
                description: "This is event 4",
                image: "https://picsum.photos/400/300"
            }}/>
            <Event event={{
                name: "Event 5",
                description: "This is event 5",
                image: "https://picsum.photos/400/300"
            }}/>
        </div>
        </div>
    )
}

export default Events;