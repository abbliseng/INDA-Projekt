import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

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
  const backupImageUrl = "/logo.png";
  const [upcomingEvents, setUpcomingEvents] = useState([
    // {
    //   id: 2,
    //   title: "PPP",
    //   text: "Det är VÅR och det har äntligen blivit dags för årets upplaga av PPP! DKM och CLW slår ihop sig och skapar en magisk kväll som du inte vill missa!",
    //   picture:
    //     "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/431487589_912232430907635_9194427698980121245_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=cKpnAPkiH8QAX-AVDDD&_nc_ht=scontent-arn2-1.xx&oh=00_AfBnV1gvDAc_VF3Q7quo_IdeDttFaIuOtqsALZg97iZDHg&oe=6604F48D",
    // },
    // {
    //   id: 3,
    //   title: "Beerpong pub",
    //   text: "This is the first slide",
    //   picture: "./logo.png",
    // },
  ]);


//   
const url = "https://fk63b9q0l6.execute-api.eu-west-2.amazonaws.com/events"
const [yearsToExpand, setYearsToExpand] = useState([
    new Date().getFullYear().toString(),
]);
const [pastEvents, setPastEvents] = useState([]);
const [loadingPastEvents, setLoadingPastEvents] = useState(true);

// Fetch with GET
useEffect(() => {
    setLoadingPastEvents(true);
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "mode": "no-cors",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            // Parse date
            data.forEach((event) => {
                event[0].event_date = new Date(event[0].event_date);
            });
            // Sort by date
            data.sort((a, b) => {
                return a[0].event_date - b[0].event_date;
            });

            // Group by year
            let years = {};
            data.forEach((event) => {
                const year = event[0].event_date.getFullYear();
                if (isNaN(year)) {
                    return;
                }

                if (!years[year]) {
                    years[year] = [];
                }
                years[year].push(event);
            });

            // For each year, sort by date, newest first
            Object.keys(years).forEach((year) => {
                years[year].sort((a, b) => {
                    return b[0].event_date - a[0].event_date;
                });
            });

            setPastEvents(years);
            setLoadingPastEvents(false);
        })
        .catch((err) => console.log(err));
}, []);

const toggleShowHide = (year) => {
    if (yearsToExpand.includes(year)) {
        setYearsToExpand(yearsToExpand.filter((item) => item !== year));
    } else {
        setYearsToExpand([...yearsToExpand, year]);
    }
}

const fetchImage = (event) => {
    if (event[0].img) {
        const img = "https://dkmstorage.s3.eu-north-1.amazonaws.com/event_images/" + event[0].id + ".png";
        return img;
    }
    return false;
};

  return (
    <div class="capsule">
        {
            upcomingEvents.length === 0 ? <>
                <img src="/dkm-logo-white.png" alt="logo" />
                <h1
                    style={{
                        textAlign: "center",
                        fontSize: "24px",
                        marginBottom: "50px",
                    }}
                > Currently there are no upcoming events, stay tuned! </h1>
            </> : <>
                <h1>Events</h1>
                <div class="carousel_section">
                    <Carousel items={upcomingEvents} />
                </div>
            </>
        }
      <h1>Past Events</h1>
      <div class="container">
        {!loadingPastEvents ? Object.keys(pastEvents).reverse().map((year) => {
            if (year === "Whoops") {
                // FIXME: This is a temporary fix for when we can't parse the year correctly, noticed this happened when viewing on mobile (using safari)
                return <></>;
            }
            return (
                <>
                <h1
                    onClick={() => toggleShowHide(year)}
                    style={{
                        fontWeight: yearsToExpand.includes(year) ? "bold" : "normal",
                    }}
                >  {yearsToExpand.includes(year) ? "< " + year + " >" : year} </h1>
                {
                    yearsToExpand.includes(year) &&
                    pastEvents[year].map((event) => {
                        return (
                            <Event
                            event={{
                                name: event[0].event_name,
                                description: event[0].event_date.toDateString(),
                                image: fetchImage(event) || backupImageUrl,
                                id: event[0].id,
                            }}
                            />
                        );
                    })
                }
                </>
            );
        }) : <div className="loader"><Loader /></div>}
      </div>
    </div>
  );
};

export default Events;
