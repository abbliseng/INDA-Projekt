import React, { useState } from "react";
import "./card.scss";

const Card = ({ title, description, picture = "https://via.placeholder.com/150", fullsize = false}) => {
  return (
    <div class="card"
        style={{
            backgroundImage: `url(${picture})`,
            maxHeight: fullsize ? "100%" : "300px"
        }}
    >
        <div class="content">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </div>
  );
};

export default Card;
