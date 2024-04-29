import React, {useEffect} from 'react';
import './main.scss';
import BackgroundCarousel from '../../components/Carousel/BackgroundCarousel';

const Main = () => {
    return (
        <div class="con">
            <BackgroundCarousel 
                items = {[{}]}
                page_specific = {"main"}
            />
            <div class="buttons">
                <img src="./dkm-logo-white.png" alt="" />
                <button
                    onClick={() => {
                        window.location.href = "/events";
                    }}
                >EVENTS</button>
                <button
                    onClick={() => {
                        window.location.href = "/about";
                    }}
                >ABOUT</button>
            </div>
        </div>
    );
    }
export default Main;