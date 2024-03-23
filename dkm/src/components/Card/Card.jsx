import React, { useState } from "react";
import "./card.scss";

const Card = ({ title, description, picture = "https://via.placeholder.com/150" }) => {
  return (
    <div class="card"
        style={{
            backgroundImage: `url(${picture})`
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
