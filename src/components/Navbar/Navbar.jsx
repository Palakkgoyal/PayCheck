import "./Navbar.css"
import { useAuth0 } from "@auth0/auth0-react";
import Loader from '../Loader/Loader';
import { logo_with_bg } from '../../assets';
import { Link } from "react-router-dom";


const Navbar = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    // if (isLoading) {
    //     return <Loader />;
    // }

    return (
        <header className="header">
            <div>
                <img
                    src={logo_with_bg}
                    alt="Pay-Check Logo"
                    className="nav_logo"
                />
            </div>
            <nav className="nav_menu">
                <Link to="/">
                    Home
                </Link>
                <Link to="/user">
                    Profile
                </Link>
                <button>
                    Login
                </button>
            </nav>
        </header>
        // <div>
        //     <LoginButton />
        //     {isAuthenticated && (
        //       <div>
        //         <LogoutButton />
        //         {user.name} {" "}
        //         {user.email}
        //       </div>
        //     )}
        // </div>
    )
}

export default Navbar


const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};


const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
        </button>
    );
};