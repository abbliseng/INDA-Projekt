import React, { useState } from 'react';

const Header = ()=>{

    const [showMenu, SetShowMenu] = useState(false);

    const menuItems = (classname)=>{
        return (
            <div className={classname}>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <div />
                    <li>
                        <a href="/events">Events</a>
                    </li>
                    <div />
                    <li>
                        <a href="/stella">Stella</a>
                    </li>
                    <div />
                    <li>
                        <a href="/worm">Worm🪱</a>
                    </li>
                </ul>
            </div>
        )
    }

    return(
        <>
            <div className="header">
                <div className="logo">
                    <a href="/"><img src="/logo.png" alt="dkm-logo" /></a>
                </div>
                {/* Only shows for mobile view */}
                <div className="menuDropdown"> 
                    <img src={showMenu?"/vit-x.png":"/vit-meny.png"} alt="menu" onClick={()=>SetShowMenu(!showMenu)}/>
                    {
                        showMenu ? 
                        menuItems("menuInner"):
                        null
                    }
                </div>
                {/* Only shows for larger than mobile view :) */}
                {menuItems("menu")}
            </div>
        </>
    )
}

const Footer = ()=>{

    return(
        <>
            <div className="footer">
                <div className="logo">
                    <img src="/logo.png" alt="DKM logo" />
                    <span>Datasektionens Klubbmästeri</span>
                </div>
                <div className="links">
                    <ul>
                        <li>
                            <img className="instagram" src="/instagram-logo.png" alt="Instagram logo" />
                        </li>
                        <li>
                            <img className="facebook" src="/facebook-logo.png" alt="Facebook logo" />
                        </li>
                    </ul>
                </div>
                <div className="contacts">
                    <ul>
                        <li>
                            <span>hejsan@dkm.datasektionen.se</span>
                        </li>
                        <li>
                            <span>svejsan@dkm.datasektionen.se</span>
                        </li>
                        <li>
                            <span>hejsvej@dkm.datasektionen.se</span>
                        </li>
                        <li>
                            <span>sansan@dkm.datasektionen.se</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout;
