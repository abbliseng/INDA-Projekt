import React, { useState } from "react";
import "./carousel.scss";
import Card from "../Card/Card";

const Carousel = ({items}) => {
  const [index, setIndex] = useState(0);
  const handlePrevious = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? items.length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= items.length ? 0 : newIndex);
  };

  return (
    <div class="carousel">
      <div class="overlay">
        <div class="section" onClick={handlePrevious}></div>
        <div class="section"></div>
          <div class="section" onClick={handleNext}></div>
      </div>
      <div class="inner">
        <Card {...items[index]} />
      </div>
      <div class="dots">
        {items.map((item, i) => (
          <div
            key={item.id}
            class={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
