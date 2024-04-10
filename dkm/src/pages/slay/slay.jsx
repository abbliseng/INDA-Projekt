import React from 'react';
import "./slay.scss";

const Slay = () => {
    const rnd_drap = Math.floor(Math.random() * 100);

    return (
        <div class="slay">
            {
                rnd_drap === 58 ? <img src="./drap.png" alt="" /> : <img src="./slay.png" alt="" />
            }
        </div>
    );
    }

export default Slay;