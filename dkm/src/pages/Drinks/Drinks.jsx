import React, {useEffect, useState} from 'react';
import '../../style/drinks.scss';

const Drinks = () => {

    const [drinksData, setDrinksData] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/api/drinks")
        .then(response => response.json())
        .then(data => {
            setDrinksData(data);
        });
    }
    , []);



    return (
        <div className="drinks">
            <h1>Drinks</h1>
            <p>{drinksData}</p>
        </div>
    );
    }
export default Drinks;