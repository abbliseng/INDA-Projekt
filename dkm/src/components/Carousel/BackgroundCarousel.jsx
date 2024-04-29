import React, {useState} from "react";
import "./background_carousel.scss";
// import "./carousel.scss";

const BackgroundCarousel = ({items}) => {
    const [index, setIndex] = useState(0);
    const handlePrevious = () => {
      const newIndex = index - 1;
      setIndex(newIndex < 0 ? items.length - 1 : newIndex);
    };
  
    const handleNext = () => {
      const newIndex = index + 1;
      setIndex(newIndex >= items.length ? 0 : newIndex);
    };

    // If there are no items, return an empty div
    if (!items || items.length === 0) {
      return (
        <div
      class="main"
      style={{
        backgroundImage: `linear-gradient(to bottom, #1e1e1e00 60%, #1e1e1eff), url('dkm-logo-white.png')`,
      }}
    ></div>
      );
    }

  return (
    <div
      class="main"
      style={{
        backgroundImage: `linear-gradient(to bottom, #1e1e1e00 60%, #1e1e1eff), url('${items[index].image}')`,
      }}
    >
        <div class="content">
            <h1>{items[index].name}</h1>
            <p>{items[index].description}</p>
        </div>
        {
          items.length > 1 &&
          <>
            <div class="overlay">
                <button class="left" onClick={handlePrevious}>
                    <img src="./Icons/left-arrow.svg" alt="left"/>
                </button>
                <div class="section"
                    // FIXME: 
                    // onClick={() => window.location.href = `/events/${items[index].id}`}
                    onClick={() => window.location.href = `https://www.facebook.com/events/${items[index].id}`}
                ></div>
                <button class="right" onClick={handleNext}>
                    <img src="./Icons/right-arrow.svg" alt="right"/>
                </button>
            </div>
            <div class="dots">
                {items.map((item, i) => (
                    <button
                        class={i === index ? "active" : ""}
                        onClick={() => setIndex(i)}
                    ></button>
                ))}
            </div>
          </>
        }
    </div>
  );
};

export default BackgroundCarousel;
