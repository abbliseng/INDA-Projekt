import React, { useState } from "react";
import "./card.scss";

const Card = ({ title, description, picture = "https://via.placeholder.com/150", fullsize = false, id}) => {
    const [hover, setHover] = useState(false);

return (
    <div>
        <div class={`card ${fullsize ? "fullsize" : ""}`}
            style={{
                backgroundImage: `url(${picture})`,
            }}
            onClick={() => {
                if (id != 1) {
                    window.open("https://www.facebook.com/events/" + id);
                } else {
                    window.open("http://localhost:3000/stella");
                }
            }}
        >
            {/* <div class="content"
                onMouseEnter={(e)=>{
                    setHover(true);
                }}
                onMouseLeave={(e)=>{
                    setHover(false);
                }}
            >
            <p class="desc">{description}</p>
        </div> */}
        </div>
        <h2>{title}</h2>
        <h3>{description}</h3>
    </div>
  );
};

export default Card;
