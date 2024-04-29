import React from 'react';
import './sliding_carousel.scss';

const SlidingCarousel = ({ items }) => {
    console.log(items)

    const fetchImage = (event) => {
        if (event[0].img) {
            const imageType = event[0].event_date < new Date("2024-04-24") ? ".png" : ".jpg";
            return `https://dkmstorage.s3.eu-north-1.amazonaws.com/event_images/${event[0].id}${imageType}`;
        }
        return false;
    };

    return (
        <></>
    );
};

export default SlidingCarousel;