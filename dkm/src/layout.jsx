


const Header = ()=>{

    return(
        <>
            <div className="header">
                <div className="logo">
                    <img src="/logo.png" alt="dkm-logo" />
                </div>
                <div className="menu">
                    <ul>
                        <li>
                            <a>Home</a>
                        </li>
                        <div />
                        <li>
                            <a>Events</a>
                        </li>
                        <div />
                        <li>
                            <a>Blog</a>
                        </li>
                        <div />
                        <li>
                            <a>About</a>
                        </li>
                        <div />
                        <li>
                            <a>Contact</a>
                        </li>
                    </ul>
                </div>
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
                            <a>Instagram</a>
                        </li>
                        <li>
                            <a>Facebook</a>
                        </li>
                        <li>
                            <a>Sök</a>
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