import React, {useState} from 'react';
import './about.scss';

const About = () => {
    const [images, setImages] = useState({
        "work": [
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/jobb.jpeg",
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/jobb2.jpeg",
            // "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/jobb3.jpeg",
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/jobb4.jpeg",
            // "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/jobb5.jpeg",
        ],
        "intern": [
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/albinmarcus.jpeg",
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/elinfabian.jpeg",
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/knaspwin.jpeg",
        ],
        "others": [
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/knaspall.jpeg",
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/knasp.jpeg",
        ],
        "events": [
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/reclaim.JPG",
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/reclaim2.JPG",
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/PPP1.jpg",
        ]
    });

    console.log(images);

    return (
        <div class="c">
            <div class="d">
                <h1>Vad gör DKM?</h1>
                <div class="break"></div>
                <h2>Pubar</h2>
                <p>
                    Varje onsdag anordnar vi pubar för alla på data- och mediasektionen i META!
                    Detta är ett jätteroligt tillfälle att träffa folk på sektionen och bara mingla och dansa!
                    <br/>
                    Du som söker DKM behöver inte ha någon erfarenhet av att stå i bar tidigare. Under ditt första år kommer du som knatte få lära dig allt som behövs av oss mästare. Det viktigaste är att vi har kul tillsammans!
                </p>
                <div class="images">
                    {
                        images.work.map((image, index) => {
                            return (
                                <img src={image} alt="jobb" key={index} />
                            );
                        })
                    }
                </div>
                <div class="break"></div>
                <h2>Sittningar</h2>
                <p>
                    Sittningar och gasquer är något vi tycker är väldigt kul! Utöver att vi i klubbmästeriet går på massa roliga gasquer varje år så anordnar vi även minst en egen sittning för datasektionen varje termin.
                    Så om du tycker det verkar roligt att anordna gasquer och sittningar för sektionen är DKM helt för dig!
                </p>
                <div class="images">
                    {
                        images.events.map((image, index) => {
                            return (
                                <img src={image} alt="jobb" key={index} />
                            );
                        })
                    }
                </div>
                <div class="break"></div>
                <h2>Interna event</h2>
                <p>
                    Att vara medlem i DKM innebär inte endast att hänga i META och fixa pubar och sittningar, något av det roligaste med att vara med i DKM är våra interna events och den starka gemenskapen som skapas under åren!!
                    På våra internevent får man en chans att lära känna varandra ännu bättre och många event har vi också ed vår fina cliff (äldre DKMare) som är grymma på att festa och sapa fantastiska minnen! Vi åker även på en resa varje år med hela DKM!
                </p>
                <div class="images">
                    {
                        images.intern.map((image, index) => {
                            return (
                                <img src={image} alt="jobb" key={index} />
                            );
                        })
                    }
                </div>
                <div class="break"></div>
                <h2>Andra sektioner & klubbmästerier</h2>
                <p>
                    Utöver allt roligt som vi gör med sektionen har vi även samarbeten med andra sektioners klubbmästerier! Detta är ett perfekt sett att lära känna fler människor på KTH.
                    Vi har framförallt mycket sammarbeten med MKM och CLW där vi bland annat anordnar en gemensam gasque varje år! Utöver det har vi föera interna event med dessa klubbmästerier.
                </p>
                <div class="images">
                    {
                        images.others.map((image, index) => {
                            return (
                                <img src={image} alt="jobb" key={index} />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default About;