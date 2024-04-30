import React, { useState, useEffect, useRef } from "react";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import BackgroundCarousel from "../../components/Carousel/BackgroundCarousel";
import SlidingCarousel from "../../components/Carousel/SlidingCarousel";

const Event = ({ event }) => {
  return (
    <Card
      title={event.name}
      description={event.description}
      picture={event.image}
      id={event.id}
    />
  );
};

const Events = () => {
  const backupImageUrl = "/logo.png";
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const url = "https://fk63b9q0l6.execute-api.eu-west-2.amazonaws.com/events";
  const [pastEvents, setPastEvents] = useState([]);
  const [loadingPastEvents, setLoadingPastEvents] = useState(true);

  useEffect(() => {
    // Reformat the events
    const upcoming = upcomingEvents.map((event) => {
      return {
        name: event[0].event_name,
        description: event[0].event_date.toDateString(),
        image: fetchImage(event) || backupImageUrl,
        id: event[0].id,
      };
    });
    setUpcomingEvents(upcoming);
  }, [pastEvents]);

  // Fetch with GET
  const fetchData = async () => {
    setLoadingPastEvents(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "mode": "no-cors",
        },
      });
      const data = await response.json();

      // Parse date, sort by date
      data.forEach(event => {
        event[0].event_date = new Date(event[0].event_date);
      });
      data.sort((a, b) => a[0].event_date - b[0].event_date);

      // Group by year
      const years = {};
      // const currentDate = new Date("2024-04-15");
      const currentDate = new Date();
      currentDate.setHours(23, 59, 59, 999);

      // NOTE: Temporarily set current date to first of January 2024 to show all events
      // currentDate = new Date("2024-01-01");

      const upcomingEvents = [];
      
      data.forEach(event => {
        const eventDate = event[0].event_date;
        if (eventDate >= currentDate) { // FIXME: Events that occur later the same day are not shown
          upcomingEvents.push(event);
        } else {
          const year = eventDate.getFullYear();
          if (!isNaN(year)) {
            years[year] = years[year] || [];
            years[year].push(event);
          }
        }
      });

      // Sort events within each year
      Object.values(years).forEach(eventsInYear => {
        eventsInYear.sort((a, b) => b[0].event_date - a[0].event_date);
      });

      setUpcomingEvents(upcomingEvents);
      setPastEvents(years);
      setLoadingPastEvents(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  

  const fetchImage = (event) => {
    if (event[0].img) {
      const imageType = event[0].event_date < new Date("2024-04-24") ? ".png" : ".jpg";
      return `https://dkmstorage.s3.eu-north-1.amazonaws.com/event_images/${event[0].id}${imageType}`;
    }
    return false;
  };

  // NOTE: Scroll on button press stuff
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    console.log(ref.current.scrollLeft);
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div class="c">
      <div class="page">
          {loadingPastEvents ? <div className="loader"><Loader /></div> : <>
          {upcomingEvents.length > 0 ?
              <BackgroundCarousel
                  items={upcomingEvents}
              />
              : <div class="no-upcoming">
              <img src="/dkm-logo-white.png" alt="logo" />
              <h1
                  style={{
                      textAlign: "center",
                      fontSize: "24px",
                      marginBottom: "50px",
                  }}
              > Currently there are no upcoming events, stay tuned! </h1>
          </div>
          }
          <div class="past">
          {
            Object.keys(pastEvents).reverse().map((year) => {
              return (
                <>
                  <h1>{year}</h1>
                  <div class="scroll"
                    ref={ref}
                  >
                    <div class="spacer"
                      onClick={() => scroll(100)}
                    ></div>
                    {pastEvents[year].map((event) => {
                      return (
                        <Event event={{
                          name: event[0].event_name,
                          description: event[0].event_date.toDateString(),
                          image: fetchImage(event) || backupImageUrl,
                          id: event[0].id,
                        }} />
                      );
                    })}
                    <div class="spacer"></div>
                  </div>
                </>
              )
            })
          }
          </div>
          </>}
      </div>
    </div>
  );
};

export default Events;
