import React, {useState, useEffect} from 'react';
import './about.scss';

const About = () => {
    const [images, setImages] = useState({
        "work": [
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/jobb2.jpeg",
            // "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/jobb3.jpeg",
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/jobb4.jpeg",
            // "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/jobb5.jpeg",
            "https://dkmstorage.s3.eu-north-1.amazonaws.com/about_images/jobb.jpeg",
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

    const json_members_url = "https://dkmstorage.s3.eu-north-1.amazonaws.com/23_24/23_24.json";
    const members = require('./23_24.json'); // FIXME: Fetch from json_members_url instead, can't be bothered to do it right now because of CORS issues.
    console.log(members);
    // const [members, setMembers] = useState([]);
    // useEffect(() => {
    //     fetch(json_members_url, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "mode": "no-cors",
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setMembers(data);
    //         });
    //     console.log(members);
    // }, []);

    console.log(images);

    return (
        <div class="c">
            <div class="d">
                <img src="https://dkmstorage.s3.eu-north-1.amazonaws.com/group_pictures/2334.jpg" alt="" />
                <h1>Vilka är DKM?</h1>
                <p>
                DKM är Datas Klubbmästeri. Det är vi som ser till att ni dataloger har möjlighet att ha roligt under er tid här på teknis. Vi anordnar fester och pubar under hela året (förutom under mottagningen). Vill du komma i kontakt med oss, släng iväg ett mail till dkm@datasektionen.se!
                </p>
                <div class="break"></div>
                <h1>Vad gör DKM?</h1>
                <div class="break"></div>
                <h2>Pubar</h2>
                <p>
                Varje onsdag (typ) bjuder vi in alla på data- och mediesektionen till vår legendariska META-pub! Och som om det inte vore nog, hörde vi rykten om att fredagsklubbar är på väg att bli verklighet!
                    <br/><br/>
                    Det här är inte bara en chans att koppla av mitt i veckan, det är en fantastisk möjlighet att träffa nya människor från sektionen, skapa minnen och bara ha riktigt kul med skratt, mingel och dans!
                    <br/><br/>
                    Du som söker DKM behöver inte ha någon erfarenhet av att stå i bar tidigare. Under ditt första år kommer du som knatte få lära dig allt som behövs av oss mästare. Det viktigaste är att vi har kul tillsammans!
                </p>
                {/* <div class="images">
                    {
                        images.work.map((image, index) => {
                            return (
                                <img src={image} alt="jobb" key={index} />
                            );
                        })
                    }
                </div> */}
                <div class="break"></div>
                <h2>Sittningar</h2>
                <p>
                    Vi lever för gasquer och sittningar som tar festandet till nya höjder! Varje termin arrangerar vi minst en egen oförglömlig sittning. 
                    Och när vi inte håller i våra egna evenemang, går vi gärna på andra sektioners gasquer och sittningar för att sprida lite DKM-kärlek!
                    Det är här minnen skapas och vänskaper fördjupas. Hos oss är varje fest ett äventyr och varje kväll
                    är en chans att uppleva något unikt och fantastiskt.
                </p>
                <div class="break"></div>
                <h2>Interna event</h2>
                <p>
                    Att vara medlem i DKM innebär inte endast att hänga i META och fixa pubar och sittningar, något av det roligaste med att vara med i DKM är våra interna events och den starka gemenskapen som skapas under åren!!
                    På våra internevent får man en chans att lära känna varandra ännu bättre och många event har vi också ed vår fina cliff (äldre DKMare) som är grymma på att festa och sapa fantastiska minnen! Vi åker även på en resa varje år med hela DKM!
                </p>
                <div class="break"></div>
                <h2>Andra sektioner & klubbmästerier</h2>
                <p>
                    Utöver allt roligt som vi gör med sektionen har vi även samarbeten med andra sektioners klubbmästerier! Detta är ett perfekt sett att lära känna fler människor på KTH.
                    Vi har framförallt mycket sammarbeten med MKM och CLW där vi bland annat anordnar en gemensam gasque varje år! Utöver det har vi föera interna event med dessa klubbmästerier.
                </p>
                <div class="break"></div>
                <h2>Medlemmar 23/34</h2>
                <div class="members">
                    {
                        members.map((member, index) => {
                            return (
                                <div class="member" key={index}>
                                    <img src={member.img} alt="uhm" />
                                    <h3>{member.role}</h3>
                                    <p>{member.name}</p>
                                </div>
                            );
                        })
                    }
                </div>
                <div class="break"></div>
                <h2>Bild galleri</h2>
            </div>
            <div class="e">
                {
                    Object.keys(images).map((key, index) => {
                        return (
                            <>
                                {
                                    images[key].map((image, index) => {
                                        return (
                                            <img src={image} alt="jobb" key={index} />
                                        );
                                    })
                                }
                            </>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default About;