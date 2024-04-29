import React, { useState, useEffect } from "react";
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
  const [yearsToExpand, setYearsToExpand] = useState([
    new Date().getFullYear().toString(),
  ]);
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
      const currentDate = new Date();
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
  

  const toggleShowHide = (year) => {
    setYearsToExpand(
      yearsToExpand.includes(year) ? yearsToExpand.filter(item => item !== year) : [...yearsToExpand, year]
    );
  };
  

  const fetchImage = (event) => {
    if (event[0].img) {
      const imageType = event[0].event_date < new Date("2024-04-24") ? ".png" : ".jpg";
      return `https://dkmstorage.s3.eu-north-1.amazonaws.com/event_images/${event[0].id}${imageType}`;
    }
    return false;
  };

  return (
    <div class="page">
        {loadingPastEvents ? <div className="loader"><Loader /></div> : <>
            <BackgroundCarousel
                items={upcomingEvents}
            />
        </>}
        {/* <div class="past">
            <h1>Past Events</h1>
            {
                !loadingPastEvents ? Object.keys(pastEvents).reverse().map((year) => {
                    if (year === "Whoops") {
                        return <></>;
                    }
                    return (<div class="year">
                        <h1>{year}</h1>
                        <SlidingCarousel
                            items={pastEvents[year]}
                        />
                    </div>)
                }) : <></>
            }
        </div> */}
        <div class="capsule">
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
    </div>
  );
};

export default Events;
