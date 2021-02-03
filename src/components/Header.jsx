import logo from './../logo.svg';

function Header() {

    return (
        <header className="header">
            <h1 className="logo-gallant">
                <img src="https://gallant.vc/wp-content/uploads/2018/12/logo.png" alt="" />
                <img src={logo} className="logo" alt="logo" />
            </h1>
        </header>
    )
}

export default Header