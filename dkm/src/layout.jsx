


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
                <h1>Footer</h1>
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