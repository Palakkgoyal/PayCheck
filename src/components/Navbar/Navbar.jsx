import "./Navbar.css"
import { useAuth0 } from "@auth0/auth0-react";
import Loader from '../Loader/Loader';
import { logo_with_bg } from '../../assets';
import { Link } from "react-router-dom";
import CTA from "../CTA/CTA";
import { ImHome } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";


const Navbar = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

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
                <Link to="/" className="para nav_menu_item">
                    <ImHome />
                </Link>
                <Link to="/profile" className="para nav_menu_item">
                    <FaUserCircle />
                </Link>
                <CTA text="Add Wage" target="/add-wage-form" />
            </nav>
        </header>
    )
}

export default Navbar
