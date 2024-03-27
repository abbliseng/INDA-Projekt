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
          id: 2,
          title: "PPP",
          text: "Det är VÅR och det har äntligen blivit dags för årets upplaga av PPP! DKM och CLW slår ihop sig och skapar en magisk kväll som du inte vill missa!",
          picture: "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/431487589_912232430907635_9194427698980121245_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=cKpnAPkiH8QAX-AVDDD&_nc_ht=scontent-arn2-1.xx&oh=00_AfBnV1gvDAc_VF3Q7quo_IdeDttFaIuOtqsALZg97iZDHg&oe=6604F48D"
        },
        {
          id: 1,
          title: "Beerpong pub",
          text: "This is the first slide",
          picture: "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/431562608_789062959918868_5112187908495052763_n.jpg?stp=dst-jpg_p960x960&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=mOorzEuXc1gAX-mo28R&_nc_oc=AdiDomKZ5STIPYcRJeZAdhHYzr5BJHHprrY5pNkpZ6APjAtTKVIMDHk4YPKjvRFvFOE&_nc_ht=scontent-arn2-1.xx&oh=00_AfCo4DNAKPxuzcTEe1uINSyG6Uynv2GsyHIHSCk7c3KHrQ&oe=66087970"
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
                name: "Blums Release PARTY!!!",
                description: "This is event 1",
                image: "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/421906417_755213529970478_7881443784304176731_n.jpg?stp=dst-jpg_p960x960&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YbMf76rPG4sAX_-51fN&_nc_ht=scontent-arn2-1.xx&oh=00_AfDU-P1o3XaW2wP2WpJ57lie3cd44_zNamiLRx3WFiUZPw&oe=6603DAB5"
            }}/>
            <Event event={{
                name: "GAMLINGPUB!!",
                description: "This is event 2",
                image: "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/417527842_771259761699188_7109903889033957802_n.jpg?stp=dst-jpg_p960x960&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ABl1GPdX_XgAX-1qDka&_nc_ht=scontent-arn2-1.xx&oh=00_AfDVkyAdanr1zW1cxBEwWKINGq_-nqx529TNfI5ou_fWYg&oe=66046617"
            }}/>
            <Event event={{
                name: "Biljättsläppspub ft. Vårbalen!!",
                description: "[Cred till Krollson för ai-bild❤]",
                image: "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/421224992_759015696256928_6200248355325592656_n.jpg?stp=dst-jpg_p960x960&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=vrsGo5Ur11gAX-wOcsF&_nc_ht=scontent-arn2-1.xx&oh=00_AfDrWUo6SIrxldpMcXakBCNZNdu7EIzzQn27C7UE3aiPaQ&oe=66034BB8"
            }}/>
            <Event event={{
                name: "KNATTEPUB",
                description: "Det är dags för knattarna att visa framfötterna! Kom och häng med oss på puben med exklusiva knattedrinkar och god mat.",
                image: "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/398284298_705049054986926_562435805364878436_n.jpg?stp=dst-jpg_p960x960&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uQdmQegmHc8AX_E3U9M&_nc_ht=scontent-arn2-1.xx&oh=00_AfAnm7hTm45yvqFvcZbJluvPHH_pbggW8xh1w5_KCSakmg&oe=6604D803"
            }}/>
            <Event event={{
                name: "FREDAGSKLUBB",
                description: "This is event 5",
                image: "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/399751746_708444607980704_2789137819949275066_n.jpg?stp=dst-jpg_p960x960&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=IoDprKC5M9wAX80GBzh&_nc_ht=scontent-arn2-1.xx&oh=00_AfDaaNeWlFZ1KPXAcniRI9RKYgtrosh3eKQvNzMFA_p5pQ&oe=66034DE0"
            }}/>
        </div>
        </div>
    )
}

export default Events;