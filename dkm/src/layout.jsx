


const Header = ()=>{

    return(
        <>
            <h1>Header</h1>
        </>
    )
}

const Footer = ()=>{

    return(
        <>
            <h1>Footer</h1>
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