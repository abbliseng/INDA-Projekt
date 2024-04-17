import React, { useState } from "react";
import "./card.scss";

const Card = ({ title, description, picture = "https://via.placeholder.com/150", fullsize = false, id}) => {
    const [hover, setHover] = useState(false);

return (
    <div class="card"
        style={{
            backgroundImage: `url(${picture})`,
            width: fullsize ? "100%" : "20vw",
        }}
        onClick={() => {
            if (id != 1) {
                window.open("https://www.facebook.com/events/" + id);
            } else {
                window.open("http://localhost:3000/stella");
            }
        }}
    >
        <div class="content"
            onMouseEnter={(e)=>{
                setHover(true);
            }}
            onMouseLeave={(e)=>{
                setHover(false);
            }}
        >
            <h2>{title}</h2>
            <p class="desc">{description}</p>
        </div>
    </div>
  );
};

export default Card;
